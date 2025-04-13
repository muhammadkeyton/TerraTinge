import { Role } from "@/app/lib/definitions";
import PaymentResult from "@/app/ui/dashboard/client-dashboard/stripe-payment/payment-result";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

import { stripe } from '@/app/lib/stripe';


export default async function successfulpayment({searchParams}:{
    searchParams:  Promise<{
        payment_intent?: string;
    }>,
    
}) {

    const session = await auth();

    

    if(session?.user?.role !== Role.client) redirect('/dashboard');
    

   
    const { payment_intent:paymentIntentId } = await searchParams;
    if(!paymentIntentId)redirect('/dashboard');
    

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if(!paymentIntent) redirect('/dashboard');

    const { status } = paymentIntent;


    
   
    return (

        <>
           {
            paymentIntent && <PaymentResult status={status as string} amount={paymentIntent.amount as number}/>
           }
        </>
     

     
    )





  }