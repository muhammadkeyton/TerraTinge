
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    paymentDate:string,
    createdAt:string,
    projectLink:string | null
}

export default function AppNameImageDateFeedBackText({appName,paymentDate,projectLink,createdAt}:AppNameImageDateFeedBackTextProps){
  
    
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Submission Date: {createdAt} </p>
                <p className='text-sm my-4 font-medium'>Start Date: {paymentDate}</p>

                <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src='/project-started.gif' width={250} height={200} alt='project' />
                {
                    projectLink?
                    <a className='text-sm underline italic text-blue-600 dark:text-blue-400' href={projectLink} target='_blank'>View WebApp</a>

                    :

                    <code className="text-xs bg-green-600 text-white p-1 rounded-sm">
                    &apos;👩🏿‍💻inProgress🧑‍💻&apos;
                    </code>
                    
                 }

                <p className='text-sm max-w-xs mt-4'>Thank you for your payment. We&apos;re now diligently working on your project, striving for excellence. You can expect weekly progress updates via email, and we&apos;ll be seeking your approval at each feature milestone. Stay tuned!</p>
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}