
import HomeIcon from '@mui/icons-material/Home';

import SettingsIcon from '@mui/icons-material/Settings';
import { RiLogoutCircleLine } from "react-icons/ri";
import MuiServerProvider from '../../mui-providers/mui-server-provider';

import Divider from '@mui/material/Divider';
import { signOut } from '@/auth';
export default function SideNav(){


    return (
        <div className='flex flex-col rounded-xl bg-white md:px-4 py-4 h-full'>
            
            

            
            <h1 className='font-black text-lg text-center mb-4'>TerraTinge</h1>

            <Divider className='dark:bg-slate-300' />

            <div className='flex flex-grow flex-col justify-center  md:space-y-28'>

                <div className='bg-slate-100 bg-indigo-200 text-indigo-700 text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <MuiServerProvider>
                 <HomeIcon className='text-3xl'/>
                </MuiServerProvider>
                <h4 className='font-light'>Home</h4>
                </div>
                
                <div className='bg-slate-100 hover:bg-indigo-200 hover:text-indigo-700 p-3 text-sm rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <MuiServerProvider>
                <SettingsIcon className='text-3xl'/>
                </MuiServerProvider>
                <h4  className='font-light'>Settings</h4>
                </div>
                
                
            </div>
            <Divider className='dark:bg-slate-300' />

            <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
             <button className='w-full mt-4 bg-slate-100 hover:bg-indigo-200 hover:text-indigo-700 text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4'>
                <RiLogoutCircleLine className='text-3xl'/>
                <h4  className='font-light'>Log out</h4>
            </button>
          
        </form>
           
            
               

        </div>
    )
}