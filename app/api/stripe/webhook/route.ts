import { NextRequest,NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { ProjectPayment } from "@/app/lib/definitions";

import { doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


//this secret verifies if the request is really from stripe,only stripe knows about this secret key
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;


async function handlePaymentSuccess({projectId,paymentAmount}:{projectId:string,paymentAmount:number}){



  const projectDocumentRef = doc(db, "projects", projectId);

  try{
    const docSnap = await getDoc(projectDocumentRef);

    if (docSnap.exists()) {
      await updateDoc(projectDocumentRef,{paymentAmount:paymentAmount,paymentStatus:ProjectPayment.paid});

      //send confirmation email to client,email should contain project name,client name,and payment amount
  } else {
      return;
  }

  }catch(e){
    console.error(e)
  }
}

async function handlePaymentProcessing({projectId,paymentAmount}:{projectId:string,paymentAmount:number}){


  const projectDocumentRef = doc(db, "projects", projectId);


  try{
    const docSnap = await getDoc(projectDocumentRef);

    if (docSnap.exists()) {
      await updateDoc(projectDocumentRef,{paymentStatus:ProjectPayment.processing});

      //send confirmation email to client,email should contain project name,client name,and payment amount
  } else {
      return;
  }

  }catch(e){
    console.error(e)
  }

}

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // Get raw body as string stripe requires the raw body data
  let event;


    if(endpointSecret){
        // Get the signature sent by Stripe
        const headersList = headers()
        const signature = headersList.get('stripe-signature');

       


        try {
            event = stripe.webhooks.constructEvent(
              rawBody,
              signature,
              endpointSecret
            );
        } catch (err:any) {
         console.log(`⚠️ Webhook signature verification failed.`, err.message);
         return NextResponse.json({error:'⚠️ Webhook signature verification failed.'},{status:400});
        }
         
    
    }
    // Handle the event
    switch(event.type){
      case 'payment_intent.succeeded':{
        const paymentIntent = event.data.object;

        const amountCharged = paymentIntent.amount;
        const projectId = paymentIntent.metadata.projectId;


        handlePaymentSuccess({projectId:projectId,paymentAmount:amountCharged});

        console.log(`PaymentIntent for ${paymentIntent.amount} and project id ${projectId} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;

      }
        

      case 'payment_intent.processing':{
        const paymentIntent = event.data.object;

        const amountCharged = paymentIntent.amount;
        const projectId = paymentIntent.metadata.projectId;

        handlePaymentProcessing({projectId:projectId,paymentAmount:amountCharged});
        console.log(`PaymentIntent for ${paymentIntent.amount} is currently processing!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      }


      case 'payment_intent.payment_failed':{
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} failed`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
        

  
    }

  // Return a 200 response to acknowledge receipt of the event
  return  NextResponse.json({message:'Request successfully received'},{status:200});





}