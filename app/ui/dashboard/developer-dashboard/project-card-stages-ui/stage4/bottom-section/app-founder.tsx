
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import Image from 'next/image';
import Divider from '@mui/material/Divider';

type AppFounderProps = {
    clientImage:string,
    clientEmail:string
}

export default function AppFounder({clientImage,clientEmail}:AppFounderProps){
    return(

        <>
            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>
        
            <div className='flex flex-row items-center gap-2'>
            <Image  className="rounded-full" src={clientImage} width={40} height={40} alt='user profile' />
    
            <div>
            <h3 className='text-xs font-light mb-2'>App Founder</h3>
            <p className='text-sm font-semibold'>{clientEmail}</p>
            </div>
        
            </div>
       </>
    )
}