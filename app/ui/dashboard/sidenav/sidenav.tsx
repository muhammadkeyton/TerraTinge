
import HomeIcon from '@mui/icons-material/Home';

import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { RiLogoutCircleLine } from "react-icons/ri";
import MuiServerProvider from '../../mui-providers/mui-server-provider';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { signOut,auth } from '@/auth';

import ThemeSwitch from '@/app/ui/landing-page/mui-components/theme-switch';

export default async function SideNav(){
    const session = await auth();

    return (
        <div className='flex flex-col md:bg-white bg-inherit md:shadow-md dark:bg-inherit dark:border-2 dark:border-slate-500    shadow-inner backdrop-blur-md  rounded-t-xl p-4 h-full'>
            
            

            <div className='hidden md:flex flex-row justify-between mb-4 items-center'>
                <h1 className='font-black text-lg'>TerraTinge</h1>

                <MuiServerProvider>
                 <ThemeSwitch/>
                </MuiServerProvider>
               

            </div>
            

            <Divider className='dark:bg-slate-300 hidden md:block' />

            <div className='flex flex-grow flex-row  md:flex-col justify-around md:justify-center   md:space-y-28'>
                
                <div className='bg-slate-100  hover:bg-indigo-400 hover:text-white dark:bg-gray-950  text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <MuiServerProvider>
                 <HomeIcon className='text-3xl'/>
                </MuiServerProvider>
                <h4 className='font-light hidden md:block'>Home</h4>
                </div>
                
                {/* <div className='bg-slate-100 dark:bg-inherit hover:bg-indigo-200 hover:text-indigo-700 p-3 text-sm rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <MuiServerProvider>
                <SettingsIcon className='text-3xl'/>
                </MuiServerProvider>
                <h4  className='font-light hidden md:block'>Settings</h4>
                </div> */}

                <div className='bg-slate-100   hover:bg-indigo-400 hover:text-white dark:bg-gray-950  p-3 text-sm rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                
                 
                <Image src={session?.user?.image ? session?.user?.image :`https://avatar.vercel.sh/${session?.user?.email}`} className='rounded-full' width={30} height={30} alt={`image`} />
                <h4  className='font-light hidden md:block'>{session?.user?.name}</h4>
                
           
                </div>

                <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
             <button className='w-full bg-slate-100  hover:bg-indigo-400 hover:text-white dark:bg-gray-950 text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <RiLogoutCircleLine className='text-3xl'/>
                <h4  className='font-light hidden md:block'>Log out</h4>
            </button>
          
        </form>
                
                
            </div>
           

            
           
            
               

        </div>
    )
}