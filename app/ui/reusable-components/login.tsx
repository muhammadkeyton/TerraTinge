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

import TerraTextField from '@/app/ui/reusable-components/terra-textfield';

import { EmailSchema } from "@/app/lib/data-validation";



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


    enum Loading{
        magicLink = 'magicLink',
        oAuth = 'oAuth',
        unknown = 'unknown'
    }

    interface LoadingType{
        state:boolean,
        type:Loading
    }
   
    const [loading,setLoading] = useState<LoadingType>({
        state:false,
        type:Loading.unknown
    });

    

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
                text:data.email,
                error:false,
                helperText:''
            });

            return success;
        }
        

    }
    return (
        <>
                <p className= 'mb-5 font-medium my-4 '>
                {
                    (()=>{
                        switch(loading.type){
                            case Loading.unknown:{
                                return text;
                            }

                            case Loading.magicLink:{
                                return '🪄Generating your magic login link🪄';
                            }

                            case Loading.oAuth:{
                                return 'Please wait...';
                            }
                        }
                    })()
                }
                </p>
         
                 
                <form onSubmit={async(event)=>{
                    event.preventDefault();

                    const emailOk = validateEmailData();

                    if(!emailOk){
                        return;
                    }else{
                        setLoading({
                            state:true,
                            type:Loading.magicLink
                        });

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
                    loading.state?
                    
                             <MuiServerProvider>
                                <div className='flex justify-center items-center my-12'>
                                <CircularProgress className='text-indigo-700' size={60}/>
                                </div>
                             </MuiServerProvider>
                    :

                    <TerraTextField
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
                    <Button disabled={email.text.length < 1 || loading.state} type='submit' variant="contained"  startIcon={email.text.length < 1 || loading.state?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':email.text.length > 0 && !loading.state,
                                'bg-inherit': email.text.length < 1 || loading.state
                            }
                        )
                   
                    }
                    >Request Login Link
                    </Button>
                </MuiServerProvider>

                </form>



                <p>By continuing, you agree to TerraTinge&apos;s <span className='underline underline-offset-2 text-indigo-700 dark:text-indigo-300'><Link href="/privacy">Privacy Policy</Link></span> & <span className='underline underline-offset-2 text-indigo-700 dark:text-indigo-300'><Link href="/terms">Terms and Conditions</Link></span>.</p>
                
                

                    
               
                <div className='flex items-center space-x-2 mt-8 mb-4'>

                    <div className="w-full h-0.5 bg-gray-300">

                    </div>

                    <p>OR</p>
                    <div className="w-full h-0.5 bg-gray-300">

                    </div>


                </div>

                <MuiServerProvider>
                <div className="flex flex-col space-y-4 mb-6">
                    
                    
                    <Button disabled={loading.state} onClick={async(event)=> {
                        event.preventDefault()
                        setLoading({
                            state:true,
                            type:Loading.oAuth
                        });
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