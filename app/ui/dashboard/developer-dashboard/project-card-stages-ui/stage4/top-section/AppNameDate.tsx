'use client';



import {useState,useEffect} from 'react';


import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import { calculateDiscountedCostWithoutFee } from '@/app/lib/utils';
import { ProjectPayment } from '@/app/lib/definitions';

import EditPartnerPaymentInfo from './edit-partner-payment-info';
type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string,
    appCost:number,
    feePercentage:number,
    appCostAndFee:number,
    paymentAmount:number,
    paymentDate:string,
    completionDate:string,
    maintainanceEndDate:Date,
    projectLink:string | null,
    promo?:string,
    discountedAppCostAndFee?:number,
    partnerInfo?:{
      email:string,
      paymentStatus:ProjectPayment,
      amountPaid?:number
      paymentDate?: string
    },
    projectId:string
}









export default function AppNameImageDateFeedBackText({appName,createdAt,appCost,feePercentage,appCostAndFee,paymentAmount,paymentDate,projectLink,completionDate,maintainanceEndDate,promo,discountedAppCostAndFee,partnerInfo,projectId}:AppNameImageDateFeedBackTextProps){
    const [remainingTime, setRemainingTime] = useState<string>('');

    let discountedAppCostAndFeeString = '';
    if(discountedAppCostAndFee) discountedAppCostAndFeeString = (discountedAppCostAndFee/100).toLocaleString();

    useEffect(() => {
        const endDate = maintainanceEndDate;

        const updateCountdown = () => {
            const remainingTime = calculateRemainingTime(endDate);
            setRemainingTime(remainingTime);
        };

        const timerInterval = setInterval(updateCountdown, 1000);

        return () => clearInterval(timerInterval);
    }, [maintainanceEndDate]);


    const calculateRemainingTime = (endDate: Date) => {
        const now = new Date();
        const timeDifference = endDate.getTime() - now.getTime();
    
        if (timeDifference <= 0) {
            return 'Maintenance Duration Ended';
        }
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    return(
        <>
            <div>
            <h2 className='text-xl font-bold '>
                {promo?
                <>

                {appName}<span className='text-xs ml-2 text-green-500'>PROMO✅</span>
                </>


                :

                <>
                {appName} <span className='text-xs ml-2 text-green-500'>NO-PROMO✨</span>
                </>

                

                }
            </h2>

            <p className='text-sm my-4 font-medium'>Active Maintainance: 
                <span className='ml-2'><code className="text-lg bg-green-600 text-white p-1 rounded-sm">{remainingTime}</code></span>  
                </p>

                <p className='text-sm my-4 font-medium'>Submission Date: {createdAt}</p>
                <p className='text-sm my-4 font-medium'>Start Date: {paymentDate}</p>
                <p className='text-sm my-4 font-medium'>Completion Date: {completionDate}</p>


                


                
                <p className='text-sm my-4 font-medium'>
                 Total including Fees: <span><code className="text-lg bg-indigo-700  text-white p-1 rounded-sm">{promo?`${discountedAppCostAndFeeString}`:(appCostAndFee/100).toLocaleString()} USD</code></span>
                </p>

                <p className='text-sm my-4 font-medium'>Payment Processing Fee: {feePercentage}%</p>
                <p className='text-sm my-4 font-medium'>
                 Total excluding Fees:  {promo?(calculateDiscountedCostWithoutFee(appCost)/100).toLocaleString() :(appCost/100).toLocaleString() } USD
                </p>

                <p className='text-sm my-4 font-medium'>Payment Amount: {(paymentAmount/100).toLocaleString()} USD</p>
                



                

                
                {
                    projectLink?
                    <a className='text-sm underline italic text-blue-600 dark:text-blue-400 inline-block' href={projectLink} target='_blank'>View WebApp</a>

                    :

                    <code className="text-xs bg-green-600 text-white p-1 rounded-sm">
                    &apos;👩🏿‍💻inProgress🧑‍💻&apos;
                    </code>
                    
                 }




                 {promo && <EditPartnerPaymentInfo email={partnerInfo?.email as string} paymentStatus={partnerInfo?.paymentStatus as ProjectPayment} projectId={projectId} amountPaid={`${partnerInfo?.amountPaid}`} paymentDate={partnerInfo?.paymentDate} />}

                
                 

                
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}