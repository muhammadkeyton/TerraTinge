
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string,
    appCost:number,
    feePercentage:number,
    appCostAndFee:number
}

export default function AppNameImageDateFeedBackText({appName,createdAt,appCost,feePercentage,appCostAndFee}:AppNameImageDateFeedBackTextProps){
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>

                
                <p className='text-sm my-4 font-medium'>
                 Total including Fees: <span><code className="text-lg bg-indigo-700  text-white p-1 rounded-sm">{(appCostAndFee/100).toLocaleString()} USD</code></span>
                </p>

                <p className='text-sm my-4 font-medium'>Payment Processing Fee: {Math.round(((feePercentage-1)*100))}%</p>
                <p className='text-sm my-4 font-medium'>
                 Total excluding Fees: {(appCost/100).toLocaleString()} USD
                </p>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}