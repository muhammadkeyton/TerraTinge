
'use client';


import { useState } from "react";

import { partnerPromoCodesType } from "@/app/lib/definitions";
import PartnerTabs from "./partner-tabs";
import MuiServerProvider from '../../mui-providers/mui-server-provider';

import Button from '@mui/material/Button';

import { useRouter } from "next/navigation";

import { generateUniquePromoCode } from "@/app/server-actions/in-app/partner/promo-codes";
import confettiSideCannons from "../../landing-page/magic-ui/confetti";
import { montserrat } from "../../fonts";


import { CircularProgress } from '@mui/material';

export default function PartnerCodes({promoCodes}:{promoCodes:partnerPromoCodesType | null}){
    const router = useRouter();
    const [loading,setLoading] = useState(false);

    return(

        <>

        {
            !promoCodes?

            (


                !loading ?

                                        
                <div className='h-full flex flex-col items-center justify-center'>
                <h1 className='font-semibold text-md text-center mb-6'>Welcome to TerraTinge! Start earning now, generate and share your promo code!</h1>
                    
                    <MuiServerProvider>
                        <Button onClick={
                            async()=>{



                                if(!navigator.onLine){
                                    alert('Hello partner,please connect your device to the internet,we are unable to generate promocodes without internet connection!')
                                    return;
                                }

                                
                                setLoading(true)
                                const result = await generateUniquePromoCode();


                                

                                if(result){
                              
                                    setLoading(false)
                                    confettiSideCannons()

                                    router.push('/dashboard/partner');

                                }else{
                                    alert('hey partner,something went wrong while trying to generate your promocode please try again and if this issue persists please email us,thank you for your patience');
                                    setLoading(false)
                                }
                            }
                        } 
                        
                        variant='contained' className={`${montserrat.className} p-3 text-white rounded-full bg-indigo-600 dark:bg-indigo-500`}>
                        Generate PromoCode
                        </Button>
                    </MuiServerProvider>
                </div>
                :
                <MuiServerProvider>
                    <div className='h-full flex flex-col justify-center items-center my-12'>
                    
                    <CircularProgress className='text-indigo-700' size={60}/>
                    <p className='text-xs font-medium my-4'>🪄Generating your unique PromoCode🪄</p>

                    </div>
                </MuiServerProvider>



            )

            :

            <PartnerTabs promoCodes={promoCodes}/>
        }
        
        </>
    )
}