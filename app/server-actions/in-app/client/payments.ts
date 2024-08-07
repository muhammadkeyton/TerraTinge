'use server';

import { Resend } from 'resend';
import { Project, ProjectPayment, ProjectState, ProjectVersions, VersionStage, VersionStage1 } from "@/app/lib/definitions";
import { doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";



import PaymentSuccessEmail from '@/emails/payment-receipt';
import PaymentProcessingEmail from '@/emails/payment-processing-email';
import PaymentFailedEmail from '@/emails/payment-failed';

import { revalidatePath } from 'next/cache';
const resend = new Resend(process.env.AUTH_RESEND_KEY);



const isVersionStage1 = (version:ProjectVersions): version is VersionStage1 =>{
  return version.versionStage === VersionStage.stage1;
}
export async function handlePaymentSuccess({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{
  console.log('this is handle success function')


    const projectDocumentRef = doc(db, "projects", projectId);
  
    try{
      const docSnap = await getDoc(projectDocumentRef);
      
  
      if (docSnap.exists()) {
        const project = docSnap.data() as Project;
        const latestVersion = project.versions[project.versions.length - 1];
        

        if(isVersionStage1(latestVersion)) return;

        latestVersion.projectInfo = {
          ...latestVersion.projectInfo,
          paymentAmount:paymentAmount,
          paymentStatus: ProjectPayment.paid,
          projectState: ProjectState.inProgress,
          

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
      
        const clientRef = doc(db, "users", project.clientInfo.clientId);
        
        const user = (await getDoc(clientRef)).data();


        let clientName = user?.name ?? user?.email?.split('@')[0];
        let clientEmail = user?.email;
        let balance = (latestVersion.projectInfo.appCostAndFee - paymentAmount) === 0?'No Balance':`$${((latestVersion.projectInfo.appCostAndFee - paymentAmount)/100).toLocaleString()}USD`;
        let paymentStatus = (latestVersion.projectInfo.appCostAndFee - paymentAmount) === 0?'Fully Paid!':'Initial Payment';
        let totalCost = `$${((latestVersion.projectInfo.appCostAndFee)/100).toLocaleString()}USD`;
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
          from: 'onboarding@resend.dev',
          to: 'muhammadkeyton@gmail.com',
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


        revalidatePath('/dashboard/client');
     
        console.log(`updated project payment success for id:${projectId} successfully`)
        //send confirmation email to client,email should contain project name,client name,and payment amount
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


      let clientName = user?.name ?? user?.email?.split('@')[0];
      let clientEmail = user?.email;
      let paymentStatus = ProjectPayment.processing;
      let totalCost = `$${((latestVersion.projectInfo.appCostAndFee)/100).toLocaleString()}USD`;
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
        from: 'onboarding@resend.dev',
        to: 'muhammadkeyton@gmail.com',
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


      revalidatePath('/dashboard/client');
   
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
      

     

    
      const clientRef = doc(db, "users", project.clientInfo.clientId);
      
      const user = (await getDoc(clientRef)).data();


      let clientName = user?.name ?? user?.email?.split('@')[0];
      let clientEmail = user?.email;
      let paymentStatus = ProjectPayment.pending;
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
        from: 'onboarding@resend.dev',
        to: 'muhammadkeyton@gmail.com',
        subject: `TerraTinge Payment Notification`,
        react: PaymentFailedEmail(
          {clientName:clientName,
           clientEmail:clientEmail,
           date:formattedDate,
           paymentAmount:amountPaid,
           paymentStatus:paymentStatus,
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


      revalidatePath('/dashboard/client');
   
      console.log(`updated project payment failed for id:${projectId} successfully`)
      //send confirmation email to client,email should contain project name,client name,and payment amount
  } else {
      return;
  }

  }catch(e){
    console.error(e)
  }
}