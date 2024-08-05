
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string,
    appCost:number,
    feePercentage:number
}

export default function AppNameImageDateFeedBackText({appName,createdAt,appCost,feePercentage}:AppNameImageDateFeedBackTextProps){
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>
                <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">Project Cost: {(appCost/100).toLocaleString()} USD</code>
                <p className='text-sm my-4 font-medium'>Fee Charged: {Math.round(((feePercentage-1)*100))}%</p>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}