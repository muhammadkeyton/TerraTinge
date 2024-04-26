'use client';
import { useTheme } from 'next-themes'
import { useState,useEffect,useReducer } from 'react';
import TextField from '@mui/material/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import clsx from 'clsx';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Sendicon from '@mui/icons-material/Send'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { montserrat } from '@/app/ui/fonts';

import { FcGoogle } from "react-icons/fc";
import { FaTiktok } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


// import {TextFieldUIReducer,RegisterDataReducer} from './registerReducer';
import { FieldName } from './partnerRegisterConstants';
import MuiServerProvider from '@/app/ui/MuiProviders/muiServerProvider';
import { RegisterDataReducer } from './partnerRegisterReducer';
import NavBar from '@/app/ui/reusableComponents/navbar';
import Footer from '@/app/ui/landingPage/components/FooterSection';
import { PageWrapper } from '../../pageAnimater';
import UltraTextField, { TextFieldUIReducer } from '../../reusableComponents/ultraTextField';


export default function RegisterPage(){
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
        submitEnabled:false,
        errorIds:[]
    }
    


    const [registerData,dispatchData] = useReducer(RegisterDataReducer,initialRegisterData);

    function updateRegisterData(event:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;
        dispatchData({type:"DataFieldUpdate",payload:{field:name as FieldName,text:value}})  
    }


    function validateAllDataBeforeSubmit(){
        dispatchData({type:"ValidateBeforeSubmit"})
    }



    return (
        <>
         <NavBar/>
         <PageWrapper>

         <div className='flex flex-col lg:flex-row  items-center m-auto  h-screen mt-40 md:mt-0 '>
           
            <div className='relative md:mt-24  lg:w-[50%] h-[75%] flex justify-center items-start'>
          
                <div className='rounded-lg ml-4 pt-20 md:max-w-[80%] h-full w-full border bg-violet-950 dark:bg-violet-950/50  text-white  text-center p-6'>
                <Diversity1Icon sx={{fontSize:'4rem'}} className='mr-4 mb-8'/>
                      <h1 className='mb-6 text-3xl sm:text-xl md:text-4xl'>Join us discover the power of synergy</h1>
                        <p className='md:ml-8 mb-5 font-medium'>
                          
                            Partner with us at Altrawave Tech to unlock growth opportunities, access exclusive benefits, and amplify your impact. Together, we will forge strategic alliances, foster innovation, and drive mutual success. 
                            Join our network and thrive through the power of partnership.
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
        
            <div className="pt-20 flex justify-center h-screen m-auto">


                <div className="w-full sm:max-w-md ">

                     
                    <h1 className='font-extrabold text-2xl mb-5'>
                        Partner with us
                    </h1>
                    <p className='mb-5 font-medium'>Become an Ultrawave Partner, Unlock New Earnings, and Shape the Future of Technology</p>
                    
                    <form id='registerform' onSubmit={(event)=>{
                    event.preventDefault();
                    validateAllDataBeforeSubmit();
                        }}>

                        <div className="flex flex-row space-x-2">
                            <UltraTextField
                            type = 'text'
                            label='First Name'
                            name='firstName'
                            helperText={registerData.firstName.helperText}
                            error={registerData.firstName.error}
                            value={registerData.firstName.text}
                            onChange={updateRegisterData}
                            inputProps={{maxLength:45}}
                            autoFocus={true}
                            />

                            <UltraTextField
                            type = 'text'
                            label='Last Name'
                            name='lastName'
                            helperText={registerData.lastName.helperText}
                            error={registerData.lastName.error}
                            value={registerData.lastName.text}
                            onChange={updateRegisterData}
                            inputProps={{maxLength:45}}
                            />

                        </div>

                        <UltraTextField
                            type = 'text'
                            label='Email Address'
                            name='emailAddress'
                            helperText={registerData.emailAddress.helperText}
                            error={registerData.emailAddress.error}
                            value={registerData.emailAddress.text}
                            onChange={updateRegisterData}
                        />

                        <UltraTextField
                            type = 'password'
                            label='Password'
                            name='password'
                            helperText={registerData.password.helperText}
                            error={registerData.password.error}
                            value={registerData.password.text}
                            onChange={updateRegisterData}
                        />


                        <UltraTextField
                            type = 'password'
                            label='Repeat Password'
                            name='repeatPassword'
                            helperText={registerData.repeatPassword.helperText}
                            error={registerData.repeatPassword.error}
                            value={registerData.repeatPassword.text}
                            onChange={updateRegisterData}
                        />
                            <p className='p-3 text-xs text-gray-700 dark:text-gray-100'>
                                We rescpect your privacy & security. Altrawave Tech does not spam or share your personal
                                information with third parties.By submitting this form , you agree that we may contact you in relation
                                to our poroducts & services, in accordance with our <span className='text-purple-500'> privacy and policy</span>
                                .You can opt out anytime.
                            </p>
                        
                          <div className='flex justify-center py-4 items-center'>
                                <MuiServerProvider>
                                        <Button variant="contained" 
                                        className='w-[50%]  bg-slate-950 dark:bg-indigo-950 text-white rounded-full py-2'
                                        >
                                         Sign Up
                                        </Button>
                                </MuiServerProvider>
                            </div>
                      
                        </form>


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
                            

                        <div className='pb-8'>
                            <Link href="/Authentication/Login"><p className="mb-8 text-indigo-700 dark:text-white">have an existing account? Go to Login
                                    </p>
                            </Link>
                        </div>   
                       
                
                           
                            
                  </div>

          </div>

      </div>
      
        </PageWrapper>
      </>
    )
    
}