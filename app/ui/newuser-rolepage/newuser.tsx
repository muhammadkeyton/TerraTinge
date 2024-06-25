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
          setLoading(true)
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

              <div className='shadow-lg rounded p-6'>

                <div className='text-center px-6 py-4'>
                <h4 className='font-bold text-xl mb-2'>Let&apos;s Begin!</h4>
                <p className='text-base text-slate-600'>Choose the option that best describes your needs.</p>
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

                }

                } 
                
                variant="text" className={`${montserrat.className} text-slate-700 bg-slate-50 shadow-lg flex flex-col p-4 md:p-6 `}>
                  <PhoneIphoneIcon className='mb-4 text-3xl sm:text-4xl'/>
                  <p className='font-semibold'>Software Development</p>
                
                </Button>


                

                <Button onClick={ ()=>
                
                {
                  update({...data,
                    user:{
                      ...data?.user,
                      role:Role.partner
                    }
                  })
                }

                }
                variant="text" className={`${montserrat.className} text-slate-700 bg-slate-50  shadow-lg flex flex-col p-4 md:p-6 `}>
                  
                  <Diversity1Icon className='mb-4 text-3xl sm:text-4xl'/>
                  <p className='font-semibold'>TerraTinge Partnership</p>
                  
                  
                </Button>

                </div>
                </MuiServerProvider>






              </div>








            </div>

           
            
       
      

       </>
    )
}