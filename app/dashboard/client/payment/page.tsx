import { Role } from "@/app/lib/definitions";
import PaymentResult from "@/app/ui/dashboard/client-dashboard/stripe-payment/payment-result";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


export default async function successfulpayment() {

    const session = await auth();
    if(session?.user?.role !== Role.client){
        return redirect('/dashboard');
    }

   
   
   
    return (
     <PaymentResult/>
    )





  }