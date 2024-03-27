'use client';
import { useTheme } from 'next-themes'
import { useState,useEffect } from 'react';
import NavBar from "../reusableComponents/navbar"

import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';


import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import MuiServerProvider from "../MuiProviders/muiServerProvider";
import LockIcon from '@mui/icons-material/Lock';
import { montserrat } from '@/app/ui/fonts';

import { FcGoogle } from "react-icons/fc";
import { FaTiktok } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


export default function LoginPage(){
    const { resolvedTheme } = useTheme();
    const [textColor,setTextColor] = useState('');
    const [borderColor,setBorderColor] = useState('');
    const [labelFocusedColor,setLabelColor] = useState('');
    const [showPassword,setPassword] = useState(false);
  


    useEffect(() => {
        if(resolvedTheme == 'light'){
            setTextColor('#0f172a')
            setBorderColor('#6366f1')
            setLabelColor('#6366f1')
           
        }else{
            setTextColor('#fff')
            setBorderColor('#fff')
            setLabelColor('#fff')
            
            
        }
    }, [resolvedTheme]);


    return (
        <>
         <NavBar/>

         <div className="mt-24 flex justify-center">


            <div className="max-w-md ">

                <MuiServerProvider>
                 <AccountCircleOutlinedIcon className='font-normal text-5xl mb-10 text-indigo-700 dark:text-white'/>
                </MuiServerProvider>
                
                <h1 className="font-extrabold text-2xl mb-5">Login</h1>
                <p className="mb-5 font-medium">Login with your account credentials</p>

               
                <TextField label="Email*"  variant="outlined" fullWidth 
                sx={{

                    marginBottom:2,

                    '& .MuiOutlinedInput-root':{
                        color:textColor,
                        '&.Mui-focused fieldset': {borderColor: borderColor,},
                        '&:hover fieldset': {borderColor: borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },
                    
                    }}/>


                <TextField label="Password*" type={showPassword?'text':'password'} variant="outlined"  fullWidth
                
                sx={{

                    marginBottom:1,
                    

                    '& .MuiOutlinedInput-root':{
                         color:textColor,
                        '&.Mui-focused fieldset': {borderColor: borderColor,},
                        '&:hover fieldset': {borderColor: borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },
                }}

               InputProps={{
                endAdornment:<InputAdornment position='end'>
                             
                               <IconButton onClick={()=> setPassword(!showPassword)}>
                                  {showPassword?

                                  
                                  <VisibilityIcon  className="text-slate-700 dark:text-white"/>
                                 
                                  
                                  :
                                  
                                  
                                  <VisibilityOffIcon  className="text-slate-700 dark:text-white"/>
                                  
                                  
                                  }
                                  
                               </IconButton>
                               
                             </InputAdornment>
                             
               }}
                
               />

            
             <a href='' className='mb-6 dark:text-white'>Forgot Password?</a>
               

         

                
                <MuiServerProvider>
                <Button  variant="contained" startIcon={<LockIcon className='text-2xl'/>} className={`mt-4 ${montserrat.className}  text-base text-center bg-slate-950 dark:bg-indigo-950 text-white w-full h-10 font-app rounded-full normal-case`}>Login</Button>
                </MuiServerProvider>

                    
               
                <div className='flex items-center space-x-2 mt-8 mb-4'>

                    <div className="w-full h-0.5 bg-gray-300">

                    </div>

                    <p>OR</p>
                    <div className="w-full h-0.5 bg-gray-300">

                    </div>


                </div>

                <MuiServerProvider>
                <div className="flex flex-col space-y-4 mb-6">
                    <Button startIcon={<FcGoogle className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Login with Google</Button>
                    <Button startIcon={<FaTiktok className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Login with TikTok</Button>
                    <Button startIcon={<FaApple className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Login with Apple</Button>
                    <Button startIcon={<FaFacebook className="text-3xl text-blue-600 dark:text-white"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Login with Facebook</Button>
                    <Button startIcon={<RiTwitterXLine className="text-3xl "/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Login with X</Button>
                </div>
                
                </MuiServerProvider>
                
                   
                  
                <div className="w-full h-0.5 bg-gray-300 mb-4">

                </div>
                    
                    
                <Link href="/Authentication/Register"><p className="mb-8 text-indigo-700 dark:text-white">Don&apos;t have an account? Go Create an account
                        </p>
                        </Link>
                
               
            </div>

         </div>
        </>
    )
    
}