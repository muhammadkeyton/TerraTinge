'use client';

import { useState } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';


import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { montserrat } from '@/app/ui/fonts';

import { FcGoogle } from "react-icons/fc";


import clsx from 'clsx';

import UltraTextField from '@/app/ui/reusable-components/ultra-textfield';

import { EmailSchema } from "@/app/lib/login-data-validation";



import { oAuthSignIn } from "@/app/server-actions/authentication/oauth";

import { magicLink } from "@/app/server-actions/authentication/login-users";
import { useRouter } from 'next/navigation';

type AuthViewPropType = {
    text?:string;
}

export default function AuthView({text}:AuthViewPropType){
    const router = useRouter()

    const [email,setEmail] = useState({
        text:'',
        error:false,
        helperText:''
    });
    const [loading,setLoading] = useState(false);

    const validateEmailData = ():boolean =>{
        const {error,data,success} = EmailSchema.safeParse({email:email.text});

        if(!success){
            setEmail({
                ...email,
                error:true,
                helperText:error?.errors[0].message
            });

            return success;
    

        }else{
            setEmail({
                ...email,
                error:false,
                helperText:''
            });

            return success;
        }
        

    }
    return (
        <>
         <p className= 'mb-5 font-medium '>
                  {loading && text !== undefined?'🪄Generating your magic login link🪄':`${text ?? ''}`}</p>
                <form onSubmit={async(event)=>{
                    event.preventDefault();

                    const emailOk = validateEmailData();

                    if(!emailOk){
                        return;
                    }else{
                        setLoading(true);

                        const result = await magicLink(email.text);
                        if(result){
                            const {error,helperText} = result;
                            setEmail({
                                ...email,
                                error:error,
                                helperText:helperText
                            })
                        }else{
                            router.push('/emailsent');
                        }
    
                        
    
                      


    

                    }
                   
                    
                }}
                
               >

                   {
                    loading?
                    
                             <MuiServerProvider>
                                <div className='flex justify-center items-center my-12'>
                                <CircularProgress className='text-indigo-700' size={60}/>
                                </div>
                             </MuiServerProvider>
                    :

                    <UltraTextField
                        type = 'text'
                        label='Email Address'
                        name='text'
                        error={email.error}
                        helperText={email.helperText}
                        value={email.text}
                        onChange={(event)=>{
                           const {name,value} = event.target;

                           setEmail({
                            ...email,
                            [name]:value
                           });
                           
                          
                        }}

                      
                        
                    />

                     }

                   
                

            

                    
                   <MuiServerProvider>
                    <Button disabled={email.text.length < 1 || loading} type='submit' variant="contained"  startIcon={email.text.length < 1 || loading?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':email.text.length > 0 && !loading,
                                'bg-inherit': email.text.length < 1 || loading
                            }
                        )
                   
                    }
                    >Request Login Link
                    </Button>
                </MuiServerProvider>

                </form>



                <p>By continuing, you agree to Ultrawave&apos;s <span className='underline underline-offset-2 text-indigo-700 dark:text-indigo-300'><Link href="/privacy">Privacy Policy</Link></span> & <span className='underline underline-offset-2 text-indigo-700 dark:text-indigo-300'><Link href="/terms">Terms and Conditions</Link></span>.</p>
                
                

                    
               
                <div className='flex items-center space-x-2 mt-8 mb-4'>

                    <div className="w-full h-0.5 bg-gray-300">

                    </div>

                    <p>OR</p>
                    <div className="w-full h-0.5 bg-gray-300">

                    </div>


                </div>

                <MuiServerProvider>
                <div className="flex flex-col space-y-4 mb-6">
                    
                    
                    <Button disabled={loading} onClick={async(event)=> {
                        event.preventDefault()
                        await oAuthSignIn()
                        
                    }
                        
                    } 
                    startIcon={<FcGoogle className="text-3xl"/>} variant="contained" className={`${montserrat.className}   w-full py-2 px-4 rounded-md`}>
                    Login with Google
                    </Button>

                    
                   
                    
                    
                
                </div>
                
                </MuiServerProvider>
        </>
    )
}