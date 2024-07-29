import { NextRequest,NextResponse } from 'next/server';
import { headers } from 'next/headers'

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


//this secret verifies if the request is really from stripe,only stripe knows about this secret key
const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

export async function POST(req: NextRequest) {
  const rawBody = await req.text(); // Get raw body as string
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
    console.log(event.type);

  // Return a 200 response to acknowledge receipt of the event
  return  NextResponse.json({message:'Request successfully received'},{status:200});





}