
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string
    appCostAndFee:number,
    promo?:string
    discountedAppCost?:number
}

export default function AppNameImageDateFeedBackText({appName,createdAt,appCostAndFee,promo,discountedAppCost}:AppNameImageDateFeedBackTextProps){
    
    

    let discountedCostString = '';
    


    if(discountedAppCost) discountedCostString = (discountedAppCost/100).toFixed(2).toLocaleString()
   
    
    
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>

                <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src='/secure-payment.gif' width={250} height={200} alt='project' />

                

                <div className='flex flex-row space-x-4'>
                <code className={`text-xs ${promo?'line-through decoration-2 decoration-red-500':'bg-slate-100 dark:bg-gray-600'} p-1 rounded-sm`}>{(appCostAndFee/100).toLocaleString()} USD</code>

                {promo  &&  <code className='text-xs bg-slate-100 dark:bg-gray-600 p-1 rounded-sm'>{discountedCostString} USD</code>}
                </div>
               

                <p className='text-sm max-w-xs mt-4'>we&apos;re ready to start your project once we receive payment. Excited to blend your ideas with our expertise for stellar results. Let&apos;s innovate together!</p>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}