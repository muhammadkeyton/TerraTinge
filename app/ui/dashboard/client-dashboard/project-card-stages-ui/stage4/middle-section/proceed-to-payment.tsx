

'use client'

import { useState } from "react";
import useWindowWidth from "@/app/ui/dashboard/reuseable-components/hooks/detect-window-width";
import Button from '@mui/material/Button';
import { montserrat } from "@/app/ui/fonts";
// import StripePaymentComponent from "../../../stripe-payment/stripe-element";
import CircularProgress from '@mui/material/CircularProgress';

import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../../../../shadcn-components/dialog';
  
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "../../../../shadcn-components/sheet"
import { PaymentOption} from "@/app/lib/definitions";
import { useGenerateStripePaymentRoute } from "@/app/ui/reusable-components/generateStripePaymentRoute";


interface proceedToPaymentProps{
  appCostAndFee:number,
  projectId:string,
  appName:string,
  paymentAmount:number,
  promo?:string,
  discountedAppCostAndFee?:number
}
export default function ProceedToPayment({appCostAndFee,projectId,appName,paymentAmount,promo,discountedAppCostAndFee}:proceedToPaymentProps){
    const {isDesktop,windowWidth} = useWindowWidth();
    const noPromoBalance = ((appCostAndFee - paymentAmount)/100).toLocaleString();
    const promoBalance = ((discountedAppCostAndFee as number - paymentAmount)/100).toLocaleString();
    const [proceedToPayment, setProceedToPayment] = useState(false);

    useGenerateStripePaymentRoute({
      projectId:projectId,
      paymentOption:proceedToPayment? PaymentOption.full : null
    });


  

    if(isDesktop || windowWidth >= 768){
        return(
         
      
                       <Dialog>
                       <MuiServerProvider>
                        <DialogTrigger asChild>
                         
                        <Button onClick={()=> setProceedToPayment(true)}  variant='contained' className={`${montserrat.className} p-3 w-full rounded-full bg-black text-white dark:bg-violet-700`}>
                          pay balance
                        </Button>
                          
                        </DialogTrigger>
                        </MuiServerProvider>
                      <DialogContent className="max-w-lg h-[80vh] flex flex-col bg-white dark:bg-black">
                        <DialogHeader className='mb-4'>
                          <DialogTitle className='mb-2 text-center'>{appName}</DialogTitle>
                          <DialogDescription className='text-center' >
                           {promo?promoBalance:noPromoBalance} USD
                          </DialogDescription>
                        </DialogHeader>
      
      
                        <div className='overflow-y-auto flex-grow  p-4'>
                           
                           
                          
                               <MuiServerProvider>
                                   <div className='flex justify-center items-center my-12'>
                                   <CircularProgress className='text-indigo-700' size={60}/>
                                   </div>
                               </MuiServerProvider>
                          
                          
                         
                        
                        </div>
      
                        
                       
        
        
        
                         
        
                          
                        
                      
      
                       
                      </DialogContent>
                      </Dialog>
      
                     
                      
            
      
        )
      }
      
        return(
      
         
          <Sheet key='bottom'>
          <MuiServerProvider>
            <SheetTrigger asChild>
            <Button variant='contained' className={`${montserrat.className} p-3 w-full rounded-full bg-black text-white dark:bg-violet-700`}>
              pay balance
            </Button>
            </SheetTrigger>
          </MuiServerProvider>
            <SheetContent side='bottom' className='h-[80vh] flex flex-col bg-white dark:bg-black border-none  rounded-t-xl'>
              <SheetHeader className='mb-4 text-center'>
                <SheetTitle className='mb-2'>{appName}</SheetTitle>
                <SheetDescription>
                {promo?promoBalance:noPromoBalance} USD USD
                </SheetDescription>
              </SheetHeader>
      
              <div className='overflow-y-auto flex-grow  p-4'>
                        
                       
                          
                {/* <StripePaymentComponent paymentOption={PaymentOption.full} projectId={projectId}/> */}

                <h1>enable stripe</h1>
                          
                          
                        
                        
              </div>
              
            
            </SheetContent>
          </Sheet>
        
          
      
        )
}