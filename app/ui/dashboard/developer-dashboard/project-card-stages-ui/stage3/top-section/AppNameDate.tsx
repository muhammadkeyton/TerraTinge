


import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';

import { calculateDiscountedCostWithoutFee } from '@/app/lib/utils';

type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string,
    appCost:number,
    feePercentage:number,
    appCostAndFee:number,
    paymentAmount:number,
    paymentDate:string,
    projectLink:string | null,
    promo?:string,
    discountedAppCostAndFee?:number
}

export default function AppNameImageDateFeedBackText({appName,createdAt,appCost,feePercentage,appCostAndFee,paymentAmount,paymentDate,projectLink,promo,discountedAppCostAndFee}:AppNameImageDateFeedBackTextProps){
    
    let discountedAppCostAndFeeString = '';
    if(discountedAppCostAndFee) discountedAppCostAndFeeString = (discountedAppCostAndFee/100).toLocaleString();
    
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


                <p className='text-sm my-4 font-medium'>Submission Date: {createdAt}</p>
                <p className='text-sm my-4 font-medium'>Start Date: {paymentDate}</p>

                
                <p className='text-sm my-4 font-medium'>
                 Total including Fees: <span><code className="text-lg bg-indigo-700  text-white p-1 rounded-sm">{promo?`${discountedAppCostAndFeeString}`:(appCostAndFee/100).toLocaleString()} USD</code></span>
                </p>

                <p className='text-sm my-4 font-medium'>Payment Processing Fee: {feePercentage}%</p>
                <p className='text-sm my-4 font-medium'>
                 Total excluding Fees: {promo?(calculateDiscountedCostWithoutFee(appCost)/100).toLocaleString() :(appCost/100).toLocaleString() } USD
                </p>

                <p className='text-sm my-4 font-medium'>Payment Amount: {(paymentAmount/100).toLocaleString()} USD</p>

                {
                    projectLink?
                    <a className='text-sm underline italic text-blue-600 dark:text-blue-400' href={projectLink} target='_blank'>View WebApp</a>

                    :

                    <code className="text-xs bg-green-600 text-white p-1 rounded-sm">
                    &apos;👩🏿‍💻inProgress🧑‍💻&apos;
                    </code>
                    
                 }

                
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}