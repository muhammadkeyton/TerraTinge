'use client';


import Diversity1Icon from '@mui/icons-material/Diversity1';







import NavBar from '@/app/ui/reusable-components/navbar';
import { PageWrapper } from '@/app/ui/page-animater';

import AuthView from '@/app/ui/reusable-components/login'

export default function PartnershipLoginPage (){
    

    return (
        <>
         <NavBar/>
         <PageWrapper>

        

         <div className='mx-2 flex flex-col lg:flex-row lg:space-x-12 items-center mt-28 '>
           
            <div className='relative  lg:w-[50%] h-[75%] flex justify-center items-start'>
          
                <div className='rounded-lg  pt-20 md:max-w-[80%]  w-full bg-violet-950 dark:bg-violet-950/50  text-white  text-center p-6 lg:p-20'>
                <Diversity1Icon sx={{fontSize:'4rem'}} className='mr-4 mb-8'/>
                      <h1 className='mb-6 text-3xl sm:text-xl md:text-4xl'>Ultrawave partnership</h1>
                        <p className='md:ml-8 mb-5 font-medium'>
                          
                        Become an Ultrawave Partner, Unlock New Earnings, and Shape the Future of Technology
                        </p>
                    </div> 
                <div className='absolute mb-4 flex flex-col gap-3 items-center  -top-10  sm:left:0  md:bottom-0'>
                    <div className='w-0.5 h-0.5 bg-gray-300 animate-pulse duration-75  rounded-full'></div>
                    <div className='w-1 h-1 bg-gray-400/50 rounded-full animate-bounce duration-100'></div>
                    <div className='w-1.5 h-1.5 bg-gray-500/50 rounded-full animate-pulse duration-150'></div>
                    <div className='w-2 h-2 bg-gray-600/50 rounded-full animate-pulse duration-50'></div>
                    <div className='w-3 h-3 bg-gray-700/50 rounded-full animate-bounce duration-700'></div>
                    <div className='w-4 h-4 bg-gray-800/50 blur-xs rounded-full animate-pulse duration-300 shadow-md shadow-indigo-500'></div>
                </div>
                    
                
               </div>
        
           


                <div className="my-10 lg:mt-0 max-w-md ">

                     
                    <h1 className='font-extrabold text-2xl mb-5'>
                        Want to Partner with us?
                    </h1>

                    <p>Login with one of the options below and after you&apos;re Logged in, choose the   <code className="text-xs bg-slate-100 dark:text-black p-1 rounded-sm">Ultrawave Partner</code> option.</p>
                   
                    
                     <AuthView/>


                        
                
                           
                            
                </div>



      </div>
      
        </PageWrapper>
      </>
    )
    
}