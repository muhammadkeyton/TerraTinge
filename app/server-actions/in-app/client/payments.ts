'use server';

import { Resend } from 'resend';
import { Project, ProjectPayment,PaymentOption, ProjectState, ProjectVersions, VersionStage, VersionStage1, VersionStage2, VersionStage3 } from "@/app/lib/definitions";
import { doc,getDoc,Timestamp,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/clientFirebase";
import { stripe } from '@/app/lib/stripe';


import PaymentSuccessEmail from '@/emails/payment-receipt';
import PaymentProcessingEmail from '@/emails/payment-processing-email';
import PaymentFailedEmail from '@/emails/payment-failed';


const resend = new Resend(process.env.AUTH_RESEND_KEY);



const isVersionStage1 = (version:ProjectVersions): version is VersionStage1 =>{
  return version.versionStage === VersionStage.stage1;
}


const isVersionStage2 = (version:ProjectVersions): version is VersionStage2 =>{
  return version.versionStage === VersionStage.stage2;
}


const isVersionStage4 = (version:ProjectVersions): version is VersionStage3 =>{
  return version.versionStage === VersionStage.stage4;
}


type customerIdAndAmountToCharge = {
  amountToCharge:number;
  customerId:string;
  projectName:string;
}
/**
 * This function calculates the appropriate cost to charge the client
 * @param {string} projectId  - The projectId,this can be used to look up the cost of that project and calculate the appropriate amount.
 * @param {PaymentOption} paymentOption  - the option our client chose to pay with,whether full payment or a third of the total cost
 
 */
export const getProjectPaymentAmount = async(projectId:string,paymentOption:PaymentOption):Promise<customerIdAndAmountToCharge|null> => {

   
   const projectDocumentRef = doc(db, "projects", projectId);

   let amountToCharge:number;
   let customerId:string;


   
   
   try{
    const docSnap = await getDoc(projectDocumentRef);
    if (!docSnap.exists()) return null;
    
    const project = docSnap.data() as Project;

    let latestVersion = project.versions[project.versions.length - 1];

   



    

    amountToCharge = (()=>{

        switch (paymentOption) {
            case PaymentOption.full:{
               
                
                if(!isVersionStage1(latestVersion)){
                  let fullCostNoPromo = Math.round(latestVersion.projectInfo.appCostAndFee - latestVersion.projectInfo.paymentAmount);
                  let fullCostWithPromo:number;

                  if('discountedAppCostAndFee' in latestVersion.projectInfo){
                    fullCostWithPromo = Math.round(latestVersion.projectInfo.discountedAppCostAndFee as number - latestVersion.projectInfo.paymentAmount)

                    return fullCostWithPromo;
                  }

                  return fullCostNoPromo;
                }


                return 0;
                
            }


            case PaymentOption.third:{
                  
                if(!isVersionStage1(latestVersion)){
                  let thirdCostNoPromo = Math.round(latestVersion.projectInfo.appCostAndFee / 3);
                  let thirdCostWithPromo:number;

                  if('discountedAppCostAndFee' in latestVersion.projectInfo){
                    thirdCostWithPromo = Math.round(latestVersion.projectInfo.discountedAppCostAndFee as number /3)

                    return thirdCostWithPromo;
                  }

                  return thirdCostNoPromo;
                }

                return 0;
                
            }
            
        }

    })();

    const terraTingeUserRef = doc(db, "users", project.clientInfo.clientId);
    const userdocSnap = await getDoc(terraTingeUserRef);

    //if user doesn't exist return null
    if (!userdocSnap.exists()) return null;
    const user = userdocSnap.data();
    const stripeCustomerId = user?.stripeCustomerId;
    
    //if user doesn't have a stripe customer id,create a new stripe customer
    if(!stripeCustomerId){

      const stripeCustomer = await stripe.customers.create({
        name: user?.name ?? user?.email?.split('@')[0],
        email: user?.email
      });

      await updateDoc(terraTingeUserRef,{stripeCustomerId:stripeCustomer.id});

      customerId = stripeCustomer.id;
    }else{
      customerId = stripeCustomerId;
    }

    

    
    return <customerIdAndAmountToCharge>{
      customerId,
      amountToCharge,
      projectName:project.appName
    }
    

   }catch(e){
    console.log(e)
   }


   return null;
   
  
};



export async function handlePaymentSuccess({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{
  console.log('this is handle success function')


    const projectDocumentRef = doc(db, "projects", projectId);
  
    try{
      const docSnap = await getDoc(projectDocumentRef);
      
  
      if (docSnap.exists()) {
        const project = docSnap.data() as Project;
        let latestVersion = project.versions[project.versions.length - 1];

        let remainingBalance:number;
        

        
        

        if(isVersionStage1(latestVersion)) return;

       

        if('discountedAppCostAndFee' in latestVersion.projectInfo){
          remainingBalance = latestVersion.projectInfo.discountedAppCostAndFee as number  - paymentAmount;
        }else{
          remainingBalance = latestVersion.projectInfo.appCostAndFee - paymentAmount;
        }



        let firstpaymentAmount = latestVersion.projectInfo.paymentAmount;

        let secondPayment = paymentAmount;


        if(isVersionStage2(latestVersion)){

          

          latestVersion.projectInfo = {
            ...latestVersion.projectInfo,
            paymentAmount:secondPayment+firstpaymentAmount,
            paymentStatus: remainingBalance === 0? ProjectPayment.paid:ProjectPayment.initial,
            projectState: ProjectState.inProgress,
            paymentDate:Timestamp.fromDate(new Date())
            
  
          }
  
          latestVersion.versionStage = VersionStage.stage3;
  
          project.versions[project.versions.length - 1] = latestVersion;
  
          try {
            await updateDoc(projectDocumentRef,{
              ...project,
              projectState:ProjectState.inProgress
            });
          } catch (error) {
              console.error("Error updating project document after success payment: ", error);
          }


        }
        
        if (isVersionStage4(latestVersion)){
          latestVersion.projectInfo = {
            ...latestVersion.projectInfo,
            paymentAmount:firstpaymentAmount + secondPayment,
            paymentStatus: ProjectPayment.paid,
      
          }
  
          
  
          project.versions[project.versions.length - 1] = latestVersion;
  
          try {
            await updateDoc(projectDocumentRef,project);
          } catch (error) {
              console.error("Error updating project document after success payment: ", error);
          }
          
        }

        

        
        const clientRef = doc(db, "users", project.clientInfo.clientId);
        
        const user = (await getDoc(clientRef)).data();


        let clientName = user?.name ?? user?.email?.split('@')[0];
        let clientEmail = user?.email;



        let balance:string;
        let paymentStatus:string;
        let totalCost:string

        

        if('discountedAppCostAndFee' in latestVersion.projectInfo){
          balance = (latestVersion.projectInfo.discountedAppCostAndFee as number - (secondPayment+firstpaymentAmount)) === 0?'No Balance':`$${((latestVersion.projectInfo.discountedAppCostAndFee as number - paymentAmount)/100).toLocaleString()}USD`;
          paymentStatus = (latestVersion.projectInfo.discountedAppCostAndFee as number - (secondPayment+firstpaymentAmount)) === 0?'Fully Paid!':'Initial Payment';
  
  
  
          totalCost = `$${((latestVersion.projectInfo.discountedAppCostAndFee as number)/100).toLocaleString()}USD`;
          
        }else{
          balance = (latestVersion.projectInfo.appCostAndFee - (secondPayment+firstpaymentAmount)) === 0?'No Balance':`$${((latestVersion.projectInfo.appCostAndFee - paymentAmount)/100).toLocaleString()}USD`;
          paymentStatus = (latestVersion.projectInfo.appCostAndFee - (secondPayment+firstpaymentAmount)) === 0?'Fully Paid!':'Initial Payment';
  
  
  
          totalCost = `$${((latestVersion.projectInfo.appCostAndFee)/100).toLocaleString()}USD`;
        }
      
       
        let projectName = project.appName;
        let appId = projectId;
        let amountPaid = `$${(paymentAmount/100).toLocaleString()}USD`;
        
        //payment date
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const { data, error } = await resend.emails.send({
          from: 'payments@terratinge.com',
          to: clientEmail,
          subject: `TerraTinge Payment Notification`,
          react: PaymentSuccessEmail(
            {clientName:clientName,
             clientEmail:clientEmail,
             balance:balance,
             date:formattedDate,
             paymentAmount:amountPaid,
             paymentStatus:paymentStatus,
             projectId:appId,
             projectName:projectName,
             totalCost:totalCost,
             versionId:latestVersion.versionId
            
            }
          )
        });

        if(data?.id){
          console.log(`payment receipt has been sent for projectId${appId}`)
        }else{
          console.log(`payment receipt not sent due to this error:${error}`)
        }


        
     
        console.log(`updated project payment success for id:${projectId} successfully`)
        
    } else {
        return;
    }
  
    }catch(e){
      console.error(e)
    }
}




export async function handlePaymentProcessing({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{
  
 console.log('this is handle processing function for amount:',paymentAmount);

  const projectDocumentRef = doc(db, "projects", projectId);
  
  try{
    const docSnap = await getDoc(projectDocumentRef);
    

    if (docSnap.exists()) {
      const project = docSnap.data() as Project;
      const latestVersion = project.versions[project.versions.length - 1];
      

      if(isVersionStage1(latestVersion)) return;

      latestVersion.projectInfo = {
        ...latestVersion.projectInfo,
        paymentStatus: ProjectPayment.processing,
        

      }

     

      project.versions[project.versions.length - 1] = latestVersion;

      try {
        await updateDoc(projectDocumentRef,project);
    } catch (error) {
        console.error("Error updating project document after success payment: ", error);
    }
    
      const clientRef = doc(db, "users", project.clientInfo.clientId);
      
      const user = (await getDoc(clientRef)).data();

      let totalCost:string;


      if('discountedAppCostAndFee' in latestVersion.projectInfo){
        totalCost = `$${((latestVersion.projectInfo.discountedAppCostAndFee as number)/100).toLocaleString()}USD`;
      }else{
        totalCost = `$${((latestVersion.projectInfo.appCostAndFee)/100).toLocaleString()}USD`;
      }


      let clientName = user?.name ?? user?.email?.split('@')[0];
      let clientEmail = user?.email;
      let paymentStatus = ProjectPayment.processing;
      let projectName = project.appName;
      let appId = projectId;
      let amountPaid = `$${(paymentAmount/100).toLocaleString()}USD`;
      
      //payment date
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
      };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const { data, error } = await resend.emails.send({
        from: 'payments@terratinge.com',
        to: clientEmail,
        subject: `TerraTinge Payment Notification`,
        react: PaymentProcessingEmail(
          {clientName:clientName,
           clientEmail:clientEmail,
           date:formattedDate,
           paymentAmount:amountPaid,
           paymentStatus:paymentStatus,
           projectId:appId,
           projectName:projectName,
           totalCost:totalCost,
           versionId:latestVersion.versionId
          
          }
        )
      });

      if(data?.id){
        console.log(`payment processing has been sent for projectId${appId}`)
      }else{
        console.log(`payment processing not sent due to this error:${error}`)
      }


     
   
      console.log(`updated project payment processing for id:${projectId} successfully`)
      //send confirmation email to client,email should contain project name,client name,and payment amount
  } else {
      return;
  }

  }catch(e){
    console.error(e)
  }


  
}



export async function handlePaymentFailed({projectId,paymentAmount,message}:{projectId:string,paymentAmount:number,message:string}):Promise<void>{
  const projectDocumentRef = doc(db, "projects", projectId);
  
  try{
    const docSnap = await getDoc(projectDocumentRef);
    

    if (docSnap.exists()) {
      const project = docSnap.data() as Project;
      const latestVersion = project.versions[project.versions.length - 1];
      
      if(isVersionStage1(latestVersion)) return;
     

    
      const clientRef = doc(db, "users", project.clientInfo.clientId);

      let dynamicPaymentStatus = (()=>{

        if('discountedAppCostAndFee' in latestVersion.projectInfo){
          if((latestVersion.projectInfo.discountedAppCostAndFee as number - latestVersion.projectInfo.paymentAmount) === 0){
            return ProjectPayment.paid
        }else if ((latestVersion.projectInfo.discountedAppCostAndFee as number - latestVersion.projectInfo.paymentAmount) === latestVersion.projectInfo.discountedAppCostAndFee as number){
            return ProjectPayment.pending;
        }else{
            return ProjectPayment.initial;
        }

        }else{
          if((latestVersion.projectInfo.appCostAndFee - latestVersion.projectInfo.paymentAmount) === 0){
            return ProjectPayment.paid
        }else if ((latestVersion.projectInfo.appCostAndFee - latestVersion.projectInfo.paymentAmount) === latestVersion.projectInfo.appCostAndFee){
            return ProjectPayment.pending;
        }else{
            return ProjectPayment.initial;
        }
        }
        
      })();

      latestVersion.projectInfo.paymentStatus = dynamicPaymentStatus;

      project.versions[project.versions.length - 1] = latestVersion;


      try {
        await updateDoc(projectDocumentRef,project);
    } catch (error) {
        console.error("Error updating project document after success payment: ", error);
    }
      
      const user = (await getDoc(clientRef)).data();

      


      let clientName = user?.name ?? user?.email?.split('@')[0];
      let clientEmail = user?.email; 
      let projectName = project.appName;
      let appId = projectId;
      let amountPaid = `$${(paymentAmount/100).toLocaleString()}USD`;
      
      
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
          day: '2-digit', 
          month: 'short', 
          year: 'numeric' 
      };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const { data, error } = await resend.emails.send({
        from: 'payments@terratinge.com',
        to: clientEmail,
        subject: `TerraTinge Payment Notification`,
        react: PaymentFailedEmail(
          {clientName:clientName,
           clientEmail:clientEmail,
           date:formattedDate,
           paymentAmount:amountPaid,
           paymentStatus:dynamicPaymentStatus,
           projectId:appId,
           projectName:projectName,
           versionId:latestVersion.versionId,
           message
          
          }
        )
      });

      if(data?.id){
        console.log(`payment failed has been sent for projectId${appId}`)
      }else{
        console.log(`payment failed not sent due to this error:${error}`)
      }


      
   
      console.log(`updated project payment failed for id:${projectId} successfully`)
      //send confirmation email to client,email should contain project name,client name,and payment amount
  } else {
      return;
  }

  }catch(e){
    console.error(e)
  }
}