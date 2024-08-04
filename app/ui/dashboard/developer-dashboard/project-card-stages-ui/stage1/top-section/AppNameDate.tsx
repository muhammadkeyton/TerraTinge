
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string
}

export default function AppNameImageDateFeedBackText({appName,createdAt}:AppNameImageDateFeedBackTextProps){
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>
                <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">Awaiting Review</code>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}