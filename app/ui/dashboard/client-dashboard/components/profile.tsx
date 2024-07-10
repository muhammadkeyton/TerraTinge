

import Image from "next/image"

import { auth} from '@/auth';

import MuiServerProvider from '../../../mui-providers/mui-server-provider';
import Button from '@mui/material/Button';
import { montserrat } from "@/app/ui/fonts";

export default async function UserProfile(){
    const session = await auth();
    const user = session?.user;
    return (
        <div className='h-full flex flex-col justify-center gap-6 items-center '>
            <h1 className='font-bold text-2xl'>TerraTinge Profile</h1>
           <div className='p-6 rounded-lg bg-slate-200 dark:bg-gray-900'>
              

              <div className='flex flex-row items-center gap-6 mx-4'>
              <Image  className="rounded-full" src={user?.image ?? `https://avatar.vercel.sh/${user?.email}`} width={50} height={50} alt='user profile' />


              
              <div>
                <h3 className='text-sm font-light mb-2'>App Founder</h3>
                <p className='font-semibold'>{user?.name ?? user?.email?.split('@')[0]}</p>
              </div>
            


              </div>

              
         
              
           </div>

           
        </div>
    )
}