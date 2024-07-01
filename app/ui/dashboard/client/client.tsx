'use client';

import Button from '@mui/material/Button';

import { montserrat } from '@/app/ui/fonts';

import MuiServerProvider from '../../mui-providers/mui-server-provider';

import { useNavigationState } from '../hook';

export default function Client(){
    const {currentLink} = useNavigationState();

    return(
        
    
            <div className='h-full bg-white md:shadow-md dark:bg-black dark:md:border-2 dark:md:border-slate-500  overflow-y-auto flex flex-col flex-grow md:rounded-xl justify-center gap-12 items-center '>
                <h1 className='font-semibold text-lg'>we are so excited to work with you</h1>
                
                
                <MuiServerProvider>
                    <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3 h-10 font-app rounded-xl normal-case`}>
                      Create A Project
                    </Button>
                </MuiServerProvider>
               
                


                
                
                
            </div>







        
    )
}