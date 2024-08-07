
import { useState } from "react";

import useWindowWidth from "@/app/ui/dashboard/reuseable-components/hooks/detect-window-width";
import Button from '@mui/material/Button';
import { montserrat } from "@/app/ui/fonts";
import StripePaymentComponent from "../../../stripe-payment/stripe-element";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
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
import { PaymentOption } from "@/app/lib/definitions";




export default function ProceedToPayment({appCostAndFee,projectId,appName}:{appCostAndFee:number,projectId:string,appName:string}){
    const {isDesktop,windowWidth} = useWindowWidth();
    const cost = (appCostAndFee/100).toLocaleString();
    const thirdCost = (Math.round((appCostAndFee / 100)/3)).toLocaleString();

    const [selectedPaymentOption,setOption] = useState<PaymentOption | null>(null);


    const descriptionTextCost = (()=>{
      switch(selectedPaymentOption){
        case PaymentOption.third:{
          return `${thirdCost} USD`;
        }

        case PaymentOption.full:{
          return `${cost} USD`;
        }

        default:
          return 'choose plan'
      }
    })()

    if(isDesktop || windowWidth >= 768){
        return(
         
      
                       <Dialog>
                       <MuiServerProvider>
                        <DialogTrigger asChild>
                         
                        <Button variant='contained' className={`${montserrat.className} p-3 w-full rounded-full bg-black text-white dark:bg-violet-700`}>
                          proceed to payment
                        </Button>
                          
                        </DialogTrigger>
                        </MuiServerProvider>
                      <DialogContent className="max-w-lg h-[80vh] flex flex-col bg-white dark:bg-black">
                        <DialogHeader className='mb-4'>
                          <DialogTitle className='mb-2 text-center'>{appName}</DialogTitle>
                          <DialogDescription className='text-center' >
                           {descriptionTextCost}
                          </DialogDescription>
                        </DialogHeader>
      
      
                        <div className='overflow-y-auto flex-grow  p-4'>
                           
                           {
                            selectedPaymentOption?
                          
                          <StripePaymentComponent paymentOption={selectedPaymentOption} projectId={projectId}/>
                          
                          :

                          <div className='h-full flex flex-col items-center justify-center space-y-6'>
                             <h2 className='font-semibold text-large'>Select Your Payment Plan</h2>
                             
                            <MuiServerProvider>
                            <div className='flex flex-row space-x-6'>

                             <Button 

                              onClick={()=>{
                                setOption(PaymentOption.full);
                              }}
                
                              variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col p-4 md:p-6 `}>
                                <StarIcon className='mb-4 text-3xl sm:text-4xl '/>
                                <p className='font-semibold mb-4'>Full Payment</p>
                                <p className="text-sm bg-green-500 text-white  p-1 rounded-sm">{cost} USD</p>
                              
                              </Button>


                              <Button 

                              onClick={()=>{
                                setOption(PaymentOption.third);
                              }}
                
                              variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col  p-4 md:p-6 `}>
                                <StarHalfIcon className='mb-4 text-3xl sm:text-4xl '/>
                                <p className='font-semibold mb-4'>Third payment</p>
                                <p className="text-sm bg-green-500 text-white  p-1 rounded-sm">{(Math.round((appCostAndFee / 100)/3)).toLocaleString()} USD</p>
                              
                              </Button>


                             </div>
                             </MuiServerProvider>
                          </div>

                          }
                        
                        
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
              proceed to payment
            </Button>
            </SheetTrigger>
          </MuiServerProvider>
            <SheetContent side='bottom' className='h-[80vh] flex flex-col bg-white dark:bg-black border-none  rounded-t-xl'>
              <SheetHeader className='mb-4 text-center'>
                <SheetTitle className='mb-2'>{appName}</SheetTitle>
                <SheetDescription>
                {cost} USD
                </SheetDescription>
              </SheetHeader>
      
              <div className='overflow-y-auto flex-grow  p-4'>
                        
                         {
                            selectedPaymentOption?
                          
                          <StripePaymentComponent paymentOption={selectedPaymentOption} projectId={projectId}/>
                          
                          :

                          <div className='h-full flex flex-col items-center justify-center space-y-6'>
                             <h2 className='font-semibold text-large'>Select Your Payment Plan</h2>
                             
                            <MuiServerProvider>
                            <div className='flex flex-row space-x-6'>

                             <Button 

                              onClick={()=>{
                                setOption(PaymentOption.full);
                              }}
                
                              variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col p-4 md:p-6 `}>
                                <StarIcon className='mb-4 text-3xl sm:text-4xl '/>
                                <p className='font-semibold mb-4'>Full Payment</p>
                                <p className="text-sm bg-green-500 text-white  p-1 rounded-sm">{cost} USD</p>
                              
                              </Button>


                              <Button 

                              onClick={()=>{
                                setOption(PaymentOption.third);
                              }}
                
                              variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col  p-4 md:p-6 `}>
                                <StarHalfIcon className='mb-4 text-3xl sm:text-4xl '/>
                                <p className='font-semibold mb-4'>Third payment</p>
                                <p className="text-sm bg-green-500 text-white  p-1 rounded-sm">{(Math.round((appCostAndFee / 100)/3)).toLocaleString()} USD</p>
                              
                              </Button>


                             </div>
                             </MuiServerProvider>
                          </div>

                          }
                        
                        
              </div>
              
            
            </SheetContent>
          </Sheet>
        
          
      
        )
}