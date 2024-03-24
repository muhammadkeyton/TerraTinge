'use client';
import { useTheme } from 'next-themes'
import { useState,useEffect } from 'react';
import NavBar from "../reusableComponents/navbar"
import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import MuiServerProvider from "../MuiProviders/muiServerProvider";
import LockIcon from '@mui/icons-material/Lock';
import { montserrat } from '@/app/ui/fonts';



export default function LoginPage(){
    const { resolvedTheme } = useTheme();
    const [textColor,setTextColor] = useState('');
    const [borderColor,setBorderColor] = useState('');
    const [labelFocusedColor,setLabelColor] = useState('');


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


                <TextField label="Password*" variant="outlined"  fullWidth
                
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
                }}
                
                />
                

               <MuiServerProvider>
               <Button  variant="contained" startIcon={<LockIcon className='text-2xl'/>} className={`${montserrat.className} text-base text-center bg-slate-950 dark:bg-indigo-950 text-white w-full h-10 font-app rounded-full normal-case`}>Login</Button>
               </MuiServerProvider>
                
            </div>

         </div>
        </>
    )
    
}