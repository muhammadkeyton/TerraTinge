'use client';

import {useEffect,useState} from "react";
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from 'next-themes';
import CheckoutForm from "./checkout-form";
import { PaymentOption } from "@/app/lib/definitions";

import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import CircularProgress from '@mui/material/CircularProgress';
import { isProduction } from "@/app/lib/utils";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.

let stripePublicKey;






stripePublicKey = isProduction ? process.env.NEXT_PUBLIC_PRODUCTION_STRIPE_PUBLISHABLE_KEY : process.env.NEXT_PUBLIC_LOCAL_STRIPE_PUBLISHABLE_KEY;

if(!stripePublicKey) throw new Error('stripe public key must be defined! in both development and production');

const stripePromise = loadStripe(stripePublicKey);

export default function StripePaymentComponent({projectId,paymentOption}:{projectId:string,paymentOption:PaymentOption}) {
  const [clientSecret, setClientSecret] = useState("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/stripe/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({projectId:projectId,paymentOption:paymentOption}),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));

   


  }, []);
  
 
  
  const appearance:Appearance = {
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

 
  const options:StripeElementsOptions = {
    clientSecret,
    appearance,
  
  };

  return (
    <div className="">
      {clientSecret?
      
    
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>


       :

       <MuiServerProvider>
          <div className='h-[200px] flex justify-center items-center my-12'>
          <CircularProgress className='text-indigo-700' size={60}/>
          </div>
       </MuiServerProvider>

  
      
      
      }
    </div>
  );
}