'use client';


import {ChangeEvent, useState} from 'react';

import { PartnerPaymentAmountSchema } from '@/app/lib/data-validation';

import { updatePartnerPayment  } from '@/app/server-actions/in-app/developer/all-work';

import { useRouter } from 'next/navigation';


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "../../../../shadcn-components/sheet"
  
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from '../../../../shadcn-components/dialog';


import useWindowWidth from '../../../../reuseable-components/hooks/detect-window-width';
import { ProjectPayment } from '@/app/lib/definitions';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import Button from '@mui/material/Button';
import { montserrat } from '@/app/ui/fonts';
import TerraTextField from '@/app/ui/reusable-components/terra-textfield';
import { Checkbox } from '@/app/ui/dashboard/shadcn-components/checkbox';
import clsx from 'clsx';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import CircularProgress from '@mui/material/CircularProgress';

interface EditPartnerPaymentInfoProps{
  projectId:string,
  email:string,
  paymentStatus:ProjectPayment,
  amountPaid?:string,
  paymentDate?:string,
  promoId:string
}


export default function EditPartnerPaymentInfo({projectId,email,paymentStatus,amountPaid,paymentDate,promoId}:EditPartnerPaymentInfoProps){
   
    const router = useRouter();
    
    const {isDesktop,windowWidth} = useWindowWidth()
  
  
    const [loading,setLoading] = useState(false);
   
    const [appData,setData] = useState({
        amount:{
            text:amountPaid ?? '',
            error:false,
            helperText:''
        },
       

       

        paid: paymentStatus === ProjectPayment.paid        
        
    });
  
  
    //used by the submit button if no appdata is available button is disabled
    const emptyField =appData.amount.text.length < 1;
  
    function trackAppData(event:ChangeEvent<HTMLInputElement>){
        const {value} = event.target;
  
      
        const {data,success,error} = PartnerPaymentAmountSchema.safeParse({amount:value});

        if(success){
            setData({
                ...appData,
                amount:{
                    error:false,
                    text:data.amount,
                    helperText:''

                }
            });
        }else{
            setData({
                ...appData,
                amount:{
                    text:value,
                    error:true,
                    helperText:error.errors[0].message

                }
            });

        }
            
        
  
    }
  
  
    const validateAppData = (data:any):boolean=>{
        
        const amountResult = PartnerPaymentAmountSchema.safeParse({amount:appData.amount.text});
  
        
       if(amountResult.success){
         return true;
       }else{
            setData({
                ...data,
                amount:{
                    ...data.appName,
                    error:!amountResult.success,
                    helperText: amountResult.success?'':amountResult.error.errors[0].message
                }
  
            })
  
            
        }
        return false
    }
  
  
    if(isDesktop || windowWidth >= 768){
      return (
             
  
  
             
             <Dialog>
                  <MuiServerProvider>
                  <DialogTrigger asChild>
                   
                      <Button variant='text' className={`${montserrat.className} block text-base text-indigo-600 my-4 p-1   rounded-xl normal-case`}>
                        View & Edit Partner Payment
                      </Button>
                    
                  </DialogTrigger>
                  </MuiServerProvider>
                <DialogContent className="max-w-lg bg-white dark:bg-black">
                  <DialogHeader className='mb-4'>
                    <DialogTitle className='mb-2'>{email}</DialogTitle>
                    <DialogDescription >
                     View & Edit Partner Payment
                    </DialogDescription>
                  </DialogHeader>
                   
                   {
                    !loading?
                  
                   <form onSubmit={ async(event)=>{
                    event.preventDefault();
  
                    const appDataOk = validateAppData(appData);
  
                     console.log(appData.paid);
   
                      if(appDataOk){
                           setLoading(true);
                           const responseOk = await updatePartnerPayment({paymentAmount:Number(appData.amount.text),projectId:projectId,promoId:promoId,paid:appData.paid});
   
                           
   
                           if(!responseOk){
                               setLoading(false);
                               validateAppData(appData);
                               alert('something went wrong while trying to update the partner payment,try again')
                           }else{
                               setLoading(false);
                               router.push('/dashboard/developer');
                           }
                      }
                   
                   }}>

                    <div className='mb-6'>

                    
                        <div className='flex flex-row mb-2 space-x-4 items-center'>
                            <p>payment status:</p>

                            {(()=>{

                              switch ( paymentStatus) {
                                case ProjectPayment.pending:{
                                  return ( <code className="text-md bg-orange-600  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                

                                case ProjectPayment.paid:{
                                  return ( <code className="text-md bg-green-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                          
                                
                              }

                            })()
                            
                            }
                            

                          </div>
                    
                    {paymentStatus === ProjectPayment.paid && (
                      
                      
                      <>
                       <p className='text-sm mb-2'>payment Amount: {amountPaid}</p>
                       <p className='text-sm'>payment Date: {paymentDate}</p>
                      </>
                      
                      
                      
                      
                      )}
                  </div>

                   
                          
  
                   
                    <TerraTextField
                    label='Amount Paid to Partner'
                    type='text'
                    autoFocus={true}
                    name='amount'
                    onChange={trackAppData}
                    error={appData.amount.error}
                    helperText={appData.amount.helperText}
                    value={appData.amount.text}
                    inputProps={
                        {
                            maxLength:20
                        }
                     }
                    
                    />
  
                  
                   

                   <div className='flex flex-row items-center space-x-4'>
                    <Checkbox checked={appData.paid} onCheckedChange={()=>{
                      setData({
                        ...appData,
                        paid:!appData.paid
                      })
                    }} />
                    <h4 className='text-sm font-semibold'>check when partner is paid</h4>
                   </div>
                   
  
  
  
                   
  
                    
                  
                
                  <DialogFooter>
                    <MuiServerProvider>
  
                    <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full p-3   rounded-xl  text-base text-center normal-case`,
                            {
                                'bg-indigo-700 hover:bg-indigo-500 text-white':!emptyField,
                                'bg-inherit': emptyField
                            }
                        )
                   
                    }
                    >Save Changes
                     </Button>
                      
                    </MuiServerProvider>
                  </DialogFooter>
                  </form>
  
                  :
  
                  <MuiServerProvider>
                    <div className='flex justify-center items-center my-12'>
                    <CircularProgress className='text-indigo-700' size={60}/>
                    </div>
                  </MuiServerProvider>
  
  
  
                  }
  
                
                 
                </DialogContent>
              </Dialog>
      )
    }
  
    return(
        <Sheet key='bottom'>
        <MuiServerProvider>
          <SheetTrigger asChild>
              <Button variant='text' className={`${montserrat.className} block text-base text-indigo-600 my-4 p-1   rounded-xl normal-case`}>
                View & Edit Partner Payment
              </Button>
          </SheetTrigger>
        </MuiServerProvider>
          <SheetContent side='bottom' className='bg-white dark:bg-black border-none rounded-t-xl'>
            <SheetHeader className='mb-4'>
              <SheetTitle className='mb-2'>{email}</SheetTitle>
              <SheetDescription>
              View & Edit Partner Payment
              </SheetDescription>
            </SheetHeader>
  
         
            {!loading ?
            <form onSubmit={async(event)=>{
              event.preventDefault();
  
              const appDataOk = validateAppData(appData);
  
              if(appDataOk){
                setLoading(true);
                const responseOk = await updatePartnerPayment({paymentAmount:Number(appData.amount.text),projectId:projectId,promoId:promoId,paid:appData.paid});

                console.log(appDataOk)

                if(!responseOk){
                    setLoading(false);
                    validateAppData(appData);
                    alert('something went wrong while trying to update partner payment,try again')
                }else{
                    router.push('/dashboard/developer');
                }
            }
          }}>




          <div className='mb-6'>

                              
          <div className='flex flex-row mb-2 space-x-4 items-center'>
              <p>payment status:</p>

              {(()=>{

                switch ( paymentStatus) {
                  case ProjectPayment.pending:{
                    return ( <code className="text-md bg-orange-600  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                  }

                  

                  case ProjectPayment.paid:{
                    return ( <code className="text-md bg-green-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                  }

            
                  
                }

              })()
              
              }
              

            </div>

          {paymentStatus === ProjectPayment.paid && (


          <>
          <p className='text-sm mb-2'>payment Amount: {amountPaid}</p>
          <p className='text-sm'>payment Date: {paymentDate}</p>
          </>




          )}
          </div>
            
            <TerraTextField
                    label='Amount Paid to Partner'
                    type='text'
                    autoFocus={true}
                    name='amount'
                    onChange={trackAppData}
                    error={appData.amount.error}
                    helperText={appData.amount.helperText}
                    value={appData.amount.text}
                    inputProps={
                        {
                            maxLength:20
                        }
                     }
                    
                    />
  
                  
                   

                   <div className='flex flex-row items-center space-x-4'>
                    <Checkbox checked={appData.paid} onCheckedChange={()=>{
                      setData({
                        ...appData,
                        paid:!appData.paid
                      })
                    }} />
                    <h4 className='text-sm font-semibold'>check when partner is paid</h4>
                   </div>
  
            <SheetFooter>
         
                  <MuiServerProvider>
                  <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full p-3   rounded-xl  text-base text-center normal-case`,
                            {
                                'bg-indigo-700 hover:bg-indigo-500 text-white':!emptyField,
                                'bg-inherit': emptyField
                            }
                        )
                   
                    }
                    >Save Changes
                     </Button>
                  </MuiServerProvider>
            
            </SheetFooter>
            </form>
  
            :
  
  
            <MuiServerProvider>
                <div className='flex justify-center items-center my-12'>
                <CircularProgress className='text-indigo-700' size={60}/>
                </div>
            </MuiServerProvider>
  
  
           }
             
      
          </SheetContent>
        </Sheet>
    )
  
  
  }
  