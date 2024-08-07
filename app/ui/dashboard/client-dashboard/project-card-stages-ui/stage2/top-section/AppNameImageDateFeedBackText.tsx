
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string
    appCostAndFee:number,
}

export default function AppNameImageDateFeedBackText({appName,createdAt,appCostAndFee}:AppNameImageDateFeedBackTextProps){
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>

                <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src='/secure-payment.gif' width={250} height={200} alt='project' />
                <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">{(appCostAndFee/100).toLocaleString()} USD</code>

                <p className='text-sm max-w-xs mt-4'>we&apos;re ready to start your project once we receive payment. Excited to blend your ideas with our expertise for stellar results. Let&apos;s innovate together!</p>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}