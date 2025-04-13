'use client';


import { useEffect, useState } from "react";
import Link from 'next/link'
import confettiSideCannons from "@/app/ui/landing-page/magic-ui/confetti";
// import { useStripe} from "@stripe/react-stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import {loadStripe} from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";

import { montserrat } from '@/app/ui/fonts';
import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
// import { isProduction } from "@/app/lib/utils";
import Stripe from "stripe";


// if (!process.env.NEXT_PUBLIC_PRODUCTION_STRIPE_PUBLISHABLE_KEY) throw new Error('stripe public production key must be defined!');


// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PRODUCTION_STRIPE_PUBLISHABLE_KEY);




// export default function PaymentResult() {
//     return(
//         <Elements stripe={stripePromise} >
//             <PaymentDetails/>
//         </Elements>
//     )
// }


export default function PaymentResult({status,amount}:{status:string,amount:number}) {
    // const stripe = useStripe();
    // const router = useRouter();

   
   

    const [message, setMessage] = useState({
      error:false,
      message:''
    });

    // let clientSecret = new URLSearchParams(window.location.search).get(
    //     "payment_intent_client_secret"
    // );


    // (()=>{
    //   switch (status) {
    //     case "succeeded":
    //       setMessage({error:false,message:`🎊Your Payment of $${(amount/100).toFixed(2).toLocaleString()}USD was processed successfully🎊`});
    //       confettiSideCannons();
    //       break;
    //     case "processing":
    //       setMessage({error:false,message:`Your Payment of $${(amount/100).toFixed(2).toLocaleString()}USD is currently being processed!`});
    //       break;
    //     case "requires_payment_method":
    //       setMessage({error:true,message:"Your payment was not successful, please try again."});
    //       break;
    //     default:
    //       setMessage({error:true,message:"Something went wrong while trying to process your payment,please try again"});
    //       break;
    //   }
    // })


    useEffect(() => {
      switch (status) {
        case "succeeded":
          setMessage({
            error: false,
            message: `🎊Your Payment of $${(amount / 100).toFixed(2).toLocaleString()} USD was processed successfully🎊`
          });
          confettiSideCannons();
          break;
        case "processing":
          setMessage({
            error: false,
            message: `Your Payment of $${(amount / 100).toFixed(2).toLocaleString()} USD is currently being processed!`
          });
          break;
        case "requires_payment_method":
          setMessage({
            error: true,
            message: "Your payment was not successful, please try again."
          });
          break;
        default:
          setMessage({
            error: true,
            message: "Something went wrong while trying to process your payment, please try again."
          });
          break;
      }
    }, [status, amount]); // 👈 run this effect when status or amount changes
    
  
   
    // useEffect(() => {

    
    //     if (!stripe) {
    //       return;
    //     }
    
    //     clientSecret = new URLSearchParams(window.location.search).get(
    //       "payment_intent_client_secret"
    //     );
    
    //     if (!clientSecret) {
        
    //       return router.push('/dashboard/client');
    //     }
    
    //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //       switch (paymentIntent?.status) {
    //         case "succeeded":
    //           setMessage({error:false,message:`🎊Your Payment of $${(paymentIntent?.amount/100).toFixed(2).toLocaleString()}USD was processed successfully🎊`});
    //           confettiSideCannons();
    //           break;
    //         case "processing":
    //           setMessage({error:false,message:`Your Payment of $${(paymentIntent?.amount/100).toFixed(2).toLocaleString()}USD is currently being processed!`});
    //           break;
    //         case "requires_payment_method":
    //           setMessage({error:true,message:"Your payment was not successful, please try again."});
    //           break;
    //         default:
    //           setMessage({error:true,message:"Something went wrong while trying to process your payment,please try again"});
    //           break;
    //       }
    //     });
    //   }, [stripe]);
    
   
   
   
 
    return (





         

        <div className="flex flex-col items-center justify-center h-full">


         {/* {
            clientSecret && */}
         
        <div
          
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
        >
          <h5 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
            Your Payment Result
          </h5>
          <div className={`font-normal mb-6 ${message.error?'text-red-600':'text-green-600'} dark:text-green-500`}>
            {message.message}
          </div>
       
          <Link href='/dashboard/client' tabIndex={-1} className='bg-red-500 w-36 h-10 rounded-full'>
            <MuiServerProvider>
            <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-36 h-10 rounded-full normal-case`}>
                Go To Project
            </Button>
            </MuiServerProvider>
          </Link>

        </div>

         {/* } */}

       
      
      </div>
   

      
    )





  }