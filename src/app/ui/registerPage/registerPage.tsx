'use client';
import { useTheme } from 'next-themes'
import { useState,useEffect,useReducer } from 'react';
import NavBar from "../reusableComponents/navbar"

import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';

import clsx from 'clsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import MuiServerProvider from "../MuiProviders/muiServerProvider";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { montserrat } from '@/app/ui/fonts';

import { FcGoogle } from "react-icons/fc";
import { FaTiktok } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


import {TextFieldUIReducer,RegisterDataReducer} from './registerReducer';
import { FieldName } from './registerConstants';


export default function RegisterPage(){
    const { resolvedTheme } = useTheme();
    const [showPassword,setPassword] = useState(false);
    

    const initialTextFieldUi = {
        textColor:'',
        borderColor:'',
        labelFocusedColor:'',
        helperTextColor:'',
    }

    const initialRegisterData = {
        firstName:{
            text:"",
           
        },
        lastName:{
            text:"",
            
        },
        emailAddress:{
            text:"",
            
        },
        password:{
            text:"",
            helperText:'we recommend you create a password that is atleast 8 characters long and has a combination of upperCase letters & numbers & symbols,this will make your password more secure.'
            
        },
        repeatPassword:{
            text:"",
           
        },
        submitEnabled:false
    }

    const [textFieldState, dispatchUI] = useReducer(TextFieldUIReducer,initialTextFieldUi);
    const [registerData,dispatchData] = useReducer(RegisterDataReducer,initialRegisterData);

    function updateRegisterData(event:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;
        dispatchData({type:"DataFieldUpdate",payload:{field:name as FieldName,text:value}})  
    }


    function validateAllDataBeforeSubmit(){
        dispatchData({type:"ValidateBeforeSubmit"})
    }

    useEffect(() => {
        if(resolvedTheme == 'light'){
            dispatchUI({type:'textColor',payload:'#0f172a'})
            dispatchUI({type:'borderColor',payload:'#6366f1'})
            dispatchUI({type:'labelFocusedColor',payload:'#6366f1'})
            dispatchUI({type:'helperTextColor',payload:'#4b5563'})
       
        }else{
            dispatchUI({type:"textColor",payload:'#fff'})
            dispatchUI({type:'borderColor',payload:'#fff'})
            dispatchUI({type:'labelFocusedColor',payload:'#fff'})
            dispatchUI({type:'helperTextColor',payload:'#fff'})    
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
                
                <h1 className="font-extrabold text-2xl mb-5">Create your Account</h1>
                <p className="mb-5 font-medium">Tell us a bit about yourself. We just need the basics.</p>
                

                <div className="flex flex-row space-x-2">

                
               
                <TextField label="First Name"  variant="outlined" fullWidth
                error={registerData.firstName.error}
                helperText={registerData.firstName.helperText}
                required
                inputProps={{
                    maxLength:45
                }}
                autoFocus={true}
                name='firstName'
                value={registerData.firstName.text}
                onChange={updateRegisterData}
                sx={{

                    marginBottom:2,

                    '& .MuiOutlinedInput-root':{
                        color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },
                    
                    }}/>

               <TextField label="Last Name"  variant="outlined" fullWidth
                error={registerData.lastName.error}
                helperText={registerData.lastName.helperText}
                required
                inputProps={{
                    maxLength:45
                }}

                name='lastName'
                value={registerData.lastName.text}
                onChange={updateRegisterData}
                sx={{

                    marginBottom:2,

                    '& .MuiOutlinedInput-root':{
                        color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },
                    
                    }}/>

                </div>

                <TextField label="Email Address"  variant="outlined" fullWidth
                error={registerData.emailAddress.error}
                helperText={registerData.emailAddress.helperText}
                required
                name='emailAddress'
                value={registerData.emailAddress.text}
                onChange={updateRegisterData}
                sx={{

                    marginBottom:2,

                    '& .MuiOutlinedInput-root':{
                        color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },
                    
                    }}/>


                <TextField label="Password" type={showPassword?'text':'password'} variant="outlined"  fullWidth
                error={registerData.password.error}
                helperText={registerData.password.helperText}
                required
                name='password'
                value={registerData.password.text}
                onChange={updateRegisterData}

             
                 
                sx={{

                    marginBottom:2,

                    '& .MuiFormHelperText-root':{
                        color:registerData.password.error? null :textFieldState.helperTextColor
                    },
                    
                    '& .MuiOutlinedInput-root':{
                         color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
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


          <TextField label="Repeat Password*" type={showPassword?'text':'password'} variant="outlined"  fullWidth
                error={registerData.repeatPassword.error}
                helperText={registerData.repeatPassword.helperText}
                required
                name='repeatPassword'
                value={registerData.repeatPassword.text}
                onChange={updateRegisterData}
                
                sx={{

                    marginBottom:1,
                    

                    '& .MuiOutlinedInput-root':{
                         color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
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

            
                <MuiServerProvider>
                <Button disabled={!registerData.submitEnabled} onClick={validateAllDataBeforeSubmit}  variant="contained" startIcon={registerData.submitEnabled?<LockOpenIcon className='text-2xl'/> :<LockIcon className='text-2xl'/>} 
                    className={
                        clsx(
                            `mt-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':registerData.submitEnabled == true,
                                'bg-inherit': registerData.submitEnabled == false
                            }
                        )
                   
                    }>Create Account</Button>
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
                    <Button startIcon={<FcGoogle className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with Google</Button>
                    <Button startIcon={<FaTiktok className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with TikTok</Button>
                    <Button startIcon={<FaApple className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with Apple</Button>
                    <Button startIcon={<FaFacebook className="text-3xl text-blue-600 dark:text-white"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with Facebook</Button>
                    <Button startIcon={<RiTwitterXLine className="text-3xl "/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with X</Button>
                </div>
                
                </MuiServerProvider>
                
                   
                  
                <div className="w-full h-0.5 bg-gray-300 mb-4">

                </div>
                    
                    
                <Link href="/Authentication/Login"><p className="mb-8 text-indigo-700 dark:text-white">have an existing account? Go to Login
                        </p>
                        </Link>
                
               
            </div>

         </div>
        </>
    )
    
}