

import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { PaymentOption } from "@/app/lib/definitions";
import StripePaymentIntentPage from "@/app/ui/dashboard/client-dashboard/stripe-payment/stripePaymentIntent";
//helper type guard function to check if the value is a valid payment option
function isValidPaymentOption(value: string): value is PaymentOption {
    return Object.values(PaymentOption).includes(value as PaymentOption);
}

export default async function Page({
    params,
    searchParams
  }: {
    params: { projectId: string };
    searchParams?: { paymentOption?: string };
  }){

    const session = await auth();
    if(session?.user?.role !== Role.client) redirect('/dashboard');

    const  paymentOption  = searchParams?.paymentOption;
    const projectId  = params.projectId;

    

    if(!projectId || !paymentOption || !isValidPaymentOption(paymentOption)) redirect('/dashboard/client');

    return(
        <div className='flex justify-center items-center h-full  py-4 md:rounded-xl'>
             
            <StripePaymentIntentPage projectId={projectId} paymentOption={paymentOption}/>
        </div>
    )
}