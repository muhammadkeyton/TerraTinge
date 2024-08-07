
import { NextRequest,NextResponse } from "next/server";

import { Project,PaymentOption, ProjectVersions, VersionStage, VersionStage1 } from "@/app/lib/definitions";

import { doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { auth } from "@/auth";



// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



/**
 * This function calculates the appropriate cost to charge the client
 * @param {string} projectId  - The projectId,this can be used to look up the cost of that project and calculate the appropriate amount.
 * @param {PaymentOption} paymentOption  - the option our client chose to pay with,whether full payment or a third of the total cost
 
 */



type customerIdAndAmountToCharge = {
  amountToCharge:number;
  customerId:string;
}


//in version stage 1 we dont't have an appcost so we use this type guard to let typescript know that we are not in version1
const isVersionStage1 = (version:ProjectVersions): version is VersionStage1 =>{
    return version.versionStage === VersionStage.stage1;
}


const getProjectPaymentAmount = async(projectId:string,paymentOption:PaymentOption):Promise<customerIdAndAmountToCharge|null> => {

   
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
                    return latestVersion.projectInfo.appCostAndFee - latestVersion.projectInfo.paymentAmount;
                }


                return 0;
                
            }


            case PaymentOption.third:{

                if(!isVersionStage1(latestVersion)){
                    return Math.round(latestVersion.projectInfo.appCostAndFee / 3);
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
      amountToCharge
    }
    

   }catch(e){
    console.log(e)
   }


   return null;
   
  
};

export async function POST(req:NextRequest) {

  const session = await auth();

  if(!session?.user) return NextResponse.json({message:`Denied!,unauthenticated requests are prohibited!`},{status:401});

  const { projectId,paymentOption } = await req.json();

  

  

try{
  
  
  const result = await getProjectPaymentAmount(projectId,paymentOption);

  if (!result) return NextResponse.json({message:`bad request,terratinge server returned null for stripe payment amount and customerId`},{status:400});;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer:result?.customerId,
    amount: result?.amountToCharge,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      projectId:projectId
      
    }
  });


  

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  },
  {status:200});

}catch(error){
    console.error('Internal Error:',error)
    return NextResponse.json({message:`internal server error:${error}`},{status:500});
  

}





}