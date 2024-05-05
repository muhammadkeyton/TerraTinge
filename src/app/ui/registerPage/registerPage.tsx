'use client';

import NavBar from "../reusableComponents/navbar"


import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Button from '@mui/material/Button';
import Link from 'next/link';

import clsx from 'clsx';


import MuiServerProvider from "../MuiProviders/muiServerProvider";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { montserrat } from '@/app/ui/fonts';

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import UltraTextField from '../reusableComponents/ultraTextField';

import { useRegistration} from '../reusableFrontendRegisterState&Validation/registerHook';


export default function RegisterPage(){
    const {registerData,updateRegisterData,serverErrorMessage,validateAllDataAndUpdateState} = useRegistration()
    
    return (
        <>
         <NavBar/>

         <div className="mt-24 flex justify-center">


            <div id='registerform' className="max-w-md ">

                <MuiServerProvider>
                  <AccountCircleOutlinedIcon className='font-normal text-5xl mb-10 text-indigo-700 dark:text-white'/>
                </MuiServerProvider>
                
                <h1 className="font-extrabold text-2xl mb-5">Create your Account</h1>
                <p className={
                    clsx(
                        `mb-5 font-medium`,
                        {
                            'text-red-500':serverErrorMessage.length > 0
                        }
                    )
                }
                
                
               
                >{serverErrorMessage.length > 0? serverErrorMessage : 'Tell us a bit about yourself. We just need the basics.'}
                </p>
                

                <form onSubmit={(event)=>{
                    event.preventDefault();
                    validateAllDataAndUpdateState();
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
                
                
                <MuiServerProvider>
                <Button type='submit' disabled={!registerData.submitButtonEnabled} variant="contained" startIcon={registerData.submitButtonEnabled?<LockOpenIcon className='text-2xl'/> :<LockIcon className='text-2xl'/>} 
                    className={
                        clsx(
                            `mt-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':registerData.submitButtonEnabled == true,
                                'bg-inherit': registerData.submitButtonEnabled == false
                            }
                        )
                   
                    }>Create Account</Button>
                </MuiServerProvider>
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
                    <Button startIcon={<FaApple className="text-3xl"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with Apple</Button>
                    <Button startIcon={<FaFacebook className="text-3xl text-blue-600 dark:text-white"/>} variant="contained" className={`${montserrat.className} dark:bg-slate-900 w-full py-2 px-4`}>Sign Up with Facebook</Button>
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