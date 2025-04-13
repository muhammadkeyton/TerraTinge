import CheckoutForm from '@/app/ui/dashboard/client-dashboard/stripe-payment/stripeCheckoutForm';
import { PaymentOption } from '@/app/lib/definitions';
import { stripe } from '@/app/lib/stripe';
import {getProjectPaymentAmount } from '@/app/server-actions/in-app/client/payments'
import { redirect } from 'next/navigation'
interface StripePaymentIntentPageProps {
  projectId:string;
  paymentOption:PaymentOption

}
export default async function StripePaymentIntentPage({projectId,paymentOption}:StripePaymentIntentPageProps) {
  

  const result = await getProjectPaymentAmount(projectId,paymentOption);

  if(!result) redirect('/dashboard/client');
  
  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    customer:result?.customerId,
    amount: result?.amountToCharge as number,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata:{
      projectId:projectId
      
    }
  })

  return (
    <div className="flex  justify-center items-center w-full   h-full    mx-2">
    
    <CheckoutForm cost={`${(result!.amountToCharge/100).toFixed(2).toLocaleString()} USD`} projectName={result?.projectName}    clientSecret={clientSecret as string | undefined} />
  </div>
  )
}