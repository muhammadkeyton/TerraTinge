


import { RiLogoutCircleLine } from "react-icons/ri";
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";

import Divider from '@mui/material/Divider';
import { signOut,auth} from '@/auth';

import ThemeSwitch from '@/app/ui/landing-page/mui-components/theme-switch';

import NavLinks  from './navlinks';
import { Role } from "@/app/lib/definitions";
import { ClientLinks, PartnerLinks,DeveloperLinks } from "./utils";





export default async function SideNav(){
   const session = await auth();

   const links = (()=>{

    switch(session?.user?.role){
        case Role.client:{
            return ClientLinks
        }

        case Role.partner:{
            return PartnerLinks;
        }

        case Role.developer:{
            return DeveloperLinks;
        }

        default:{
            return null
        }

        
    }

   })();
   
   
   
  
  
   

    return (
        <div className='h-20 md:h-full flex flex-col md:bg-white bg-inherit md:shadow-md dark:bg-inherit dark:border-2 dark:border-slate-500    shadow-inner backdrop-blur-md  rounded-t-xl md:rounded-xl p-4'>
            
            

            <div className='hidden md:flex flex-row justify-between mb-4 items-center'>
                <h1 className='font-black text-lg'>TerraTinge</h1>

                <MuiServerProvider>
                 <ThemeSwitch/>
                </MuiServerProvider>
               

            </div>
            

            <Divider className='dark:bg-slate-300 hidden md:block' />

            <div className='flex md:flex-grow flex-row md:flex-col justify-around md:justify-center   md:space-y-28'>
                
           {links !== null && <NavLinks links={links}/>}

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