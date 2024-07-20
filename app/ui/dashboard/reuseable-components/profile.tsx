import Image from "next/image"

import { auth} from '@/auth';
import { Role } from "@/app/lib/definitions";


export default async function Profile(){
    const session = await auth();
    const user = session?.user;

    const textRole = (()=>{

        switch(user?.role){
            case Role.client:{
                return 'App Founder'
            }

            case Role.partner:{
                return 'Partner'
            }

            case Role.developer:{
                return 'Developer'
            }
        }

    })();


    return (
        <div className='h-full overflow-y-auto flex flex-col justify-center gap-6 items-center '>
            <h1 className='font-bold text-2xl'>TerraTinge Profile</h1>
           <div className='p-6 rounded-lg bg-slate-200 dark:bg-gray-900'>
              

              <div className='flex flex-row items-center gap-6 mx-4'>
              <Image  className="rounded-full" src={user?.image ?? `https://avatar.vercel.sh/${user?.email}`} width={50} height={50} alt='user profile' />


              
              <div>
                <h3 className='text-sm font-light mb-2'>{textRole}</h3>
                <p className='font-semibold'>{user?.name ?? user?.email?.split('@')[0]}</p>
              </div>
            


              </div>

              
         
              
           </div>

           
        </div>
    )
}