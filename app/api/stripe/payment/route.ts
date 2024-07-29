
import { NextRequest,NextResponse } from "next/server";

import { Project,PaymentOption } from "@/app/lib/definitions";

import { doc,getDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";


// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



/**
 * This function calculates the appropriate cost to charge the client
 * @param {string} projectId  - The projectId,this can be used to look up the cost of that project and calculate the appropriate amount.
 * @param {PaymentOption} paymentOption  - the option our client chose to pay with,whether full payment or a third of the total cost
 
 */
const getProjectPaymentAmount = async(projectId:string,paymentOption:PaymentOption):Promise<number|null> => {

   console.log('database query');
   const projectDocumentRef = doc(db, "projects", projectId);

   let amountToCharge:number;
   
   try{
    const docSnap = await getDoc(projectDocumentRef);
    if (!docSnap.exists()) return null;
    
    const project = docSnap.data() as Project;

    amountToCharge = (()=>{

        switch (paymentOption) {
            case PaymentOption.full:{
                return project.appCost - project.paymentAmount;
            }


            case PaymentOption.third:{
                return project.appCost/3;
            }
            
        }

    })();

    return amountToCharge;
    

   }catch(e){
    console.log(e)
   }


   return null;
   
  
};

export async function POST(req:NextRequest) {
  const { projectId,paymentOption } = await req.json();

  

  

try{
  

  const amountToCharge = await getProjectPaymentAmount(projectId,paymentOption);


  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountToCharge,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
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