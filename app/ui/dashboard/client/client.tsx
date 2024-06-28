
import Image from 'next/image';
import Button from '@mui/material/Button';

import { montserrat } from '@/app/ui/fonts';
import { auth } from "@/auth";
import MuiServerProvider from '../../mui-providers/mui-server-provider';

export default async function Client(){
    const session = await auth();

    return(
        <div className='flex flex-col gap-6   h-full'>

            <div className='flex justify-center bg-white p-2 items-center gap-4 rounded-xl'>
                 
                <Image src={session?.user?.image ? session?.user?.image :`https://avatar.vercel.sh/${session?.user?.email}`} className='rounded-full' width={40} height={40} alt={`image`} />
                <p>{session?.user?.name}</p>
            </div>

            <div className='flex flex-col bg-white flex-grow rounded-xl justify-center gap-12 items-center '>
                <h1 className='font-semibold text-lg'>Welcome!,we are so excited to work with you</h1>
                
                <MuiServerProvider>
                    <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3 h-10 font-app rounded-xl normal-case`}>
                      Create A Project
                    </Button>
                </MuiServerProvider>
            </div>







        </div>
    )
}