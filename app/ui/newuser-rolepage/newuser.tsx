'use client';

import { Role } from "@/app/lib/definitions";

import CircularProgress from '@mui/material/CircularProgress';
import { useEffect,useState } from "react";
import Button from '@mui/material/Button';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MuiServerProvider from "../mui-providers/mui-server-provider";

import { montserrat } from '@/app/ui/fonts';

import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import { logout } from "@/app/server-actions/authentication/logout";


export default function NewUser(){


    return (
            <SelectRole/>
    )
}



function SelectRole(){
    const router = useRouter();
    const [loading,setLoading] = useState(true);
    const { data, update } = useSession();
    

    useEffect(()=>{
      if(data?.user){

        if(data.user.role != Role.unknown){
          return router.push('/dashboard');
        }else{
          setLoading(false)
        }
        
      }


    },[data])



    if(loading){
      return (<MuiServerProvider>
          <div className='flex justify-center items-center h-screen'>
          <CircularProgress className='text-indigo-700' size={60}/>
          </div>
        </MuiServerProvider>)
    }
    
    return (
      <>
            

            <div  className='flex justify-center px-6 items-center h-screen'>

              <div className='shadow-lg rounded p-6 dark:bg-slate-950'>

                <div className='text-center px-6 py-4'>
                <h4 className='font-bold text-xl mb-2'>Let&apos;s Begin!</h4>
                <p className='text-base text-slate-600 dark:text-white'>Choose the option that best describes your needs.</p>
                </div>


                <MuiServerProvider>
                <div className='flex flex-row justify-around items-center my-6 space-x-4 sm:space-y-0 sm:space-x-6'>


                <Button onClick={()=>
                
                {

                  update({...data,
                    user:{
                      ...data?.user,
                      role:Role.client
                    }
                  })

                  setLoading(true)

                }

                
                

                } 
                
                variant="text" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col p-4 md:p-6 `}>
                  <PhoneIphoneIcon className='mb-4 text-3xl sm:text-4xl '/>
                  <p className='font-semibold'>Software Development</p>
                
                </Button>


                <p className='mx-2'>OR</p>


                

                <Button onClick={ ()=>
                
                {
                  update({...data,
                    user:{
                      ...data?.user,
                      role:Role.partner
                    }
                  })

                  setLoading(true)
                }

                }
                variant="text" className={`${montserrat.className} text-slate-700 bg-slate-50 dark:bg-gray-800 dark:text-white shadow-lg flex flex-col p-4 md:p-6 `}>
                  
                  <Diversity1Icon className='mb-4 text-3xl sm:text-4xl'/>
                  <p className='font-semibold'>TerraTinge Partnership</p>
                  
                  
                </Button>

                </div>


                <Button onClick={async()=> {
                        setLoading(true);
                        
                        await logout()
                        
                        
                    }
                        
                }  variant="text" className={`${montserrat.className} my-6 text-black dark:text-white bg-slate-100 dark:bg-gray-800 w-full py-2 px-4 rounded-md`}>
                    Log out & choose later
                 </Button>
                </MuiServerProvider>






              </div>   








            </div>

           
            
       
      

       </>
    )
}