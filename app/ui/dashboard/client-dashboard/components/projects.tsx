'use client';

import Button from '@mui/material/Button';

import { montserrat } from '@/app/ui/fonts';

import MuiServerProvider from '../../../mui-providers/mui-server-provider';



export default function Projects(){

    return(
        
    
               <>
              
                <h1 className='font-semibold text-lg'>we are so excited to work with you</h1>
                
                
                <MuiServerProvider>
                    <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3 h-10 font-app rounded-xl normal-case`}>
                      Create A Project
                    </Button>
                </MuiServerProvider>

                </>
                
               
                


                
                
                
          







        
    )
}