
'use client';


import { FormEvent, useEffect,useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { Button } from "@mui/material";
import { montserrat } from "@/app/ui/fonts";
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();


  const [message, setMessage] = useState({
    error:false,
    message:''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage({error:false,message:"Payment succeeded!"});
          break;
        case "processing":
          setMessage({error:false,message:"Your payment is processing."});
          break;
        case "requires_payment_method":
          setMessage({error:true,message:"Your payment was not successful, please try again."});
          break;
        default:
          setMessage({error:true,message:"Something went wrong."});
          break;
      }
    });
  }, [stripe]);

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
        return_url: "https://terra-tinge.vercel.app/dashboard/client",
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
      setMessage({error:true,message:"An unexpected error occurred."});
    }

    setIsLoading(false);
  };

  const paymentElementOptions:StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      {/* Show any error or success messages */}
      {message && 
        <div id="payment-message">
          <p className={` text-center mb-4 font-medium ${message.error?'text-red-500':'text-green-500'}`}>{message.message}</p>
          
        </div>
      }

      <PaymentElement id="payment-element" options={paymentElementOptions} />
       
       <MuiServerProvider>
        <Button type='submit' disabled={isLoading || !stripe || !elements} id="submit" variant='contained' className={`${montserrat.className} mt-4 p-3 w-full rounded-full bg-black text-white dark:bg-violet-700`}>
        {isLoading ? 'processing payment...' : "Pay now"}
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