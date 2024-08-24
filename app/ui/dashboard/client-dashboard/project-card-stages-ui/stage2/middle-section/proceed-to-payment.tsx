
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import useWindowWidth from "@/app/ui/dashboard/reuseable-components/hooks/detect-window-width";
import Button from '@mui/material/Button';
import { montserrat } from "@/app/ui/fonts";
import StripePaymentComponent from "../../../stripe-payment/stripe-element";
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import CircularProgress from '@mui/material/CircularProgress';


import { useRouter } from "next/navigation";
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
import TerraTextField from "@/app/ui/reusable-components/terra-textfield";
import { updateClientProjectPromoCode } from "@/app/server-actions/in-app/client/project";
import confettiSideCannons from "@/app/ui/landing-page/magic-ui/confetti";




type selectPlanProps = {
  setOption:Dispatch<SetStateAction<PaymentOption | null>>,
  cost:string,
  thirdCost:string,
  promo:string|undefined,
  discountedThirdCostString:string,
  discountedCostString:string
}

const SelectPlan = ({setOption,cost,thirdCost,promo,discountedCostString,discountedThirdCostString}:selectPlanProps) =>{
  
 
  
  
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-6'>

    <h2 className='font-semibold text-large'>Select Your Payment Plan</h2>


    
    {promo && <p className='text-sm font-semibold text-green-700 my-4'>your promocode earned you 5% credit on your project cost!</p>}
   <MuiServerProvider>
   <div className='flex flex-row space-x-6'>

    <Button 

     onClick={()=>{
       setOption(PaymentOption.full);
     }}

     variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col p-4 md:p-6 `}>
       <StarIcon className='mb-4 text-3xl text-green-600 sm:text-4xl '/>
       <p className='font-semibold  mb-4'>Full Payment</p>
       <p className={`text-sm ${promo?'line-through decoration-2 decoration-red-500':'bg-slate-200 dark:bg-gray-600'}  p-1 rounded-sm`}>{cost} USD</p>
       
       {promo && <p className="mt-2 text-sm bg-slate-200 dark:bg-gray-600  p-1 rounded-sm">{discountedCostString} USD</p>}
     
     </Button>


     <Button 

     onClick={()=>{
       setOption(PaymentOption.third);
     }}

     variant="contained" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col  p-4 md:p-6 `}>
       <StarHalfIcon className='mb-4 text-3xl text-indigo-600 sm:text-4xl '/>
       <p className='font-semibold mb-4'>Third payment</p>
       <p className={`text-sm ${promo?'line-through decoration-2 decoration-red-500':'bg-slate-200 dark:bg-gray-600'}  p-1 rounded-sm`}>{thirdCost} USD</p>
       
       {promo && <p className="mt-2 text-sm bg-slate-200 dark:bg-gray-600  p-1 rounded-sm">{discountedThirdCostString} USD</p>}
     
     </Button>


    </div>
    </MuiServerProvider>
 </div>
  )
}

interface EnterPromoCodeProps {
  promoCode: {
    code: string;
    error: boolean;
    helperText: string;
  };
  trackPromoEntered: (event: ChangeEvent<HTMLInputElement>) => void;
  setSkipPromo: Dispatch<SetStateAction<boolean>>;
  setPromo:Dispatch<SetStateAction<{
    code: string;
    error: boolean;
    helperText: string;
  }>>;

  setVerifiedPromo:Dispatch<SetStateAction<string | undefined>>

  projectId:string;
}

const EnterPromoCode = ({promoCode,trackPromoEntered,setSkipPromo,projectId,setPromo,setVerifiedPromo}:EnterPromoCodeProps)=>{
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-6'>
      <h2 className='font-semibold text-sm'>Have a promo code? Enter it below to save 5% on your project cost</h2>


      {
        !loading? 

        <>
       
      <TerraTextField
      label="PromoCode"
      name="PromoCode"
      type="text"
      onChange={trackPromoEntered}
      value={promoCode.code}
      error={promoCode.error}
      helperText={promoCode.helperText}
    

      />



      {
        promoCode.code.length > 0?

        <Button onClick={
          async()=>{

            if(!navigator.onLine) return alert('hey there,we cannot look up promocodes in our records,you have no internet connection,please connect your device to the internet.')

            setLoading(true)
            let promoResult = await updateClientProjectPromoCode({projectId:projectId,promoCode:promoCode.code.trim()});

            if(!promoResult.error){
              setPromo(
                {
                  code:promoResult.promoCodeId as string,
                  error:promoResult.error,
                  helperText:promoResult.message

                }
              )

              setVerifiedPromo(promoResult.promoCodeId)

              router.push('/dashboard/client');

              confettiSideCannons();

              
            }else{
              setPromo(
                {
                  ...promoCode,
                  error:promoResult.error,
                  helperText:promoResult.message
                }
              )
            }

            setLoading(false)

          }
        } 
        
        className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500  p-3   rounded-xl normal-case`}>
       continue with promocode
      </Button>

        :

        <Button onClick={()=> setSkipPromo(true)} variant="text" className={`${montserrat.className} text-base text-black dark:text-white  p-3  rounded-xl normal-case`}>
         continue without promocode
        </Button>

      }


      </>
      

      : 
      <MuiServerProvider>
          <div className='flex justify-center items-center my-12'>
          <CircularProgress className='text-indigo-700' size={60}/>
          </div>
      </MuiServerProvider>

      }

   

    </div>
  )

}


interface proceedToPaymentProps{
  appCostAndFee:number,
  projectId:string,
  appName:string,
  promo?:string,
  discountedAppCostAndFee?:number
}
export default function ProceedToPayment({appCostAndFee,projectId,appName,promo,discountedAppCostAndFee}:proceedToPaymentProps){
    const {isDesktop,windowWidth} = useWindowWidth();
    const cost = (appCostAndFee/100).toLocaleString();
    const thirdCost = ((appCostAndFee / 100)/3).toFixed(2).toLocaleString();


    let discountedCostString = '';
    let discountedThirdCostString = '';


    if(discountedAppCostAndFee){
      discountedCostString = (discountedAppCostAndFee/100).toLocaleString()
      discountedThirdCostString = ((discountedAppCostAndFee / 100)/3).toFixed(2).toLocaleString();
    } 
   



    

    

    const [verifiedPromo,setVerifiedPromo] = useState<string|undefined>(promo);

    const [selectedPaymentOption,setOption] = useState<PaymentOption | null>(null);

    const [promoCode,setPromoCode] = useState({
      code:'',
      error:false,
      helperText:''
    });

    const [skipPromo,setSkipPromo] = useState<boolean>(false);


    const trackPromoEntered = (event:ChangeEvent<HTMLInputElement>)=>{
      setPromoCode({
        ...promoCode,
        code:event.target.value
      });
      
    }

    const descriptionTextCost = (()=>{
      switch(selectedPaymentOption){
        case PaymentOption.third:{
          if(verifiedPromo) return `${discountedThirdCostString} USD`
          return `${thirdCost} USD`;
        }

        case PaymentOption.full:{

          if(verifiedPromo) return `${discountedCostString} USD`
          return `${cost} USD`;
        }

        default:
          return (skipPromo || verifiedPromo)?'choose plan':'enter promocode'
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


                          (
                            skipPromo || verifiedPromo?
                            <SelectPlan setOption={setOption} cost={cost} thirdCost={thirdCost} promo={verifiedPromo} discountedCostString={discountedCostString} discountedThirdCostString={discountedThirdCostString}/>
                            :
                            <EnterPromoCode promoCode={promoCode} trackPromoEntered={trackPromoEntered} setSkipPromo={setSkipPromo} projectId={projectId} setPromo={setPromoCode} setVerifiedPromo={setVerifiedPromo}/>
                          )

                          

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
                {descriptionTextCost}
                </SheetDescription>
              </SheetHeader>
      
              <div className='overflow-y-auto flex-grow  p-4'>
                        
                        {
                            selectedPaymentOption?
                          
                          <StripePaymentComponent paymentOption={selectedPaymentOption} projectId={projectId}/>
                          
                          :


                          (
                            skipPromo || verifiedPromo?
                            <SelectPlan setOption={setOption} cost={cost} thirdCost={thirdCost} promo={verifiedPromo} discountedCostString={discountedCostString} discountedThirdCostString={discountedThirdCostString}/>
                            :
                            <EnterPromoCode promoCode={promoCode} trackPromoEntered={trackPromoEntered} setSkipPromo={setSkipPromo} projectId={projectId} setPromo={setPromoCode} setVerifiedPromo={setVerifiedPromo}/>
                          )

                          

                          }
                        
              </div>
              
            
            </SheetContent>
          </Sheet>
        
          
      
        )
}