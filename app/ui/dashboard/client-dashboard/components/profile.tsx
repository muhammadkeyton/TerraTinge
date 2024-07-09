

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
            <h1 className='font-bold text-2xl'>Profile</h1>
           <div className='p-6 rounded-lg bg-slate-200 dark:bg-gray-900'>
              

              <div className='flex flex-row items-center gap-6'>
              <Image  className="rounded-full" src={user?.image ?? `{https://avatar.vercel.sh/${user?.email}}`} width={100} height={100} alt='user profile' />


              
              <p className='font-semibold'>{user?.name ?? user?.email}</p>
            


              </div>

              
         
              
           </div>

           <MuiServerProvider>
          
                    <Button variant='text' className={`${montserrat.className} text-base  text-red-500  w-46 p-3  font-app rounded-xl normal-case`}>
                      Delete Account
                    </Button>
          </MuiServerProvider>
        </div>
    )
}