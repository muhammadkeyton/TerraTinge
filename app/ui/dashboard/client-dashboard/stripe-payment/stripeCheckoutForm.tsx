"use client";

import { FormEvent, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'
import { Appearance, loadStripe, StripeElementsOptions, StripePaymentElementOptions } from '@stripe/stripe-js'
import { Button } from "@mui/material";
import { montserrat } from "@/app/ui/fonts";
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { isProduction } from "@/app/lib/utils";
import { useTheme } from 'next-themes';
if (!process.env.NEXT_PUBLIC_PRODUCTION_STRIPE_PUBLISHABLE_KEY) throw new Error('stripe public production key must be defined!');
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PRODUCTION_STRIPE_PUBLISHABLE_KEY)

function PaymentForm({projectName,cost}:{projectName:string | undefined,cost:string}) {
  const stripe = useStripe();
  const elements = useElements();
  

  const [message, setMessage] = useState({
    error:false,
    message:''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: isProduction? "https://terratinge.com/dashboard/client/paymentresult" :'http://localhost:3000/dashboard/client/paymentresult',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    if (error.type === "card_error") {
        setMessage({error:true,message:error.message as string});
    } else if(error.type !== "validation_error"){
        setMessage({error:true,message:"something went wrong! please try again"});
    }
    

    setIsLoading(false);
  };



  

   

  const paymentElementOptions:StripePaymentElementOptions = {
    layout: "tabs",
    
  };

  return (
    <form className='h-full overflow-y-auto w-full px-4 md:w-3/4 lg:w-1/2   py-4' id="payment-form" onSubmit={handleSubmit}>

      <h1 className='text-xl text-center mb-2 font-bold italic'>{projectName}</h1>
      <div className="text-center">
        <code className="text-sm bg-slate-100 dark:bg-gray-600 p-1 rounded-sm">
          {cost}
        </code>
      </div>
      

      <PaymentElement  id="payment-element" options={paymentElementOptions} />


      {/* Show any error or success messages */}
      {message && 
        <div id="payment-message">
          <p className={` text-center my-4 font-medium ${message.error?'text-red-500':'text-green-500'}`}>{message.message}</p>
          
        </div>
      }
       
       <MuiServerProvider>
        <Button type='submit' disabled={isLoading || !stripe || !elements} id="submit" variant='contained' className={`${montserrat.className} mt-4 p-3 w-full rounded-full bg-black text-white dark:bg-violet-700`}>
        {isLoading ?
        
      
          <div className='flex flex-col gap-2 justify-center items-center'>
            <p>Processing Payment</p>
            <CircularProgress  className='text-white' size={25}/>
          </div>
      
        
        : "Pay now"
        
        }
        </Button>
      </MuiServerProvider>

      
      

      <MuiServerProvider>
        <Divider className='dark:bg-slate-300 my-6'/>
      </MuiServerProvider>

      <div className='text-center'>
        <p className='text-gray-400'>TerraTinge Secure Payment</p>
      </div>
     
      
    </form>
  );
}




export default function CheckoutForm({ clientSecret,projectName,cost }:{ clientSecret:string | undefined,projectName:string | undefined,cost:string }) {
  const { resolvedTheme } = useTheme();
  const appearance:Appearance  = {
    theme: resolvedTheme === 'light'? 'stripe':'night',
      variables:{
        fontFamily:'Montserrat, sans-serif',
        colorPrimary: resolvedTheme === 'light'? '#030712':'#f1f5f9',
      },
      rules:{
        '.Input': {
        border: '0px',
        backgroundColor:resolvedTheme === 'light' ?'#f1f5f9':'#334155'
      },
      '.Input:hover, .Input:focus':{
        border: '1px solid var(--colorPrimary)',
        boxShadow: '0px'
        
      }
  
      }
  };
  return (
    <Elements stripe={stripePromise} options={{ appearance, clientSecret}}>
      <PaymentForm projectName={projectName} cost={cost}/>
    </Elements>
  )
}