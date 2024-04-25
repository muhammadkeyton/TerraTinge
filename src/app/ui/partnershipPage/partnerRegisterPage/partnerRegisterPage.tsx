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
import { TextFieldUIReducer, RegisterDataReducer } from './partnerRegisterReducer';
import NavBar from '@/app/ui/reusableComponents/navbar';
import Footer from '@/app/ui/landingPage/components/FooterSection';
import { PageWrapper } from '../../pageAnimater';


export default function RegisterPage(){
    const { resolvedTheme } = useTheme();
 

    const [industry, setIndustry] = useState('');
    const [role, setRole] = useState('');

    const handleIndustryChange = (event: SelectChangeEvent) => {
      setIndustry(event.target.value as string);
    };
    const handleRoleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
      };
    

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
        companyName:{
            text:"",
            
        },

        emailAddress:{
            text:"",  
        },

        industry:{
            text:"",
            
        },
        role:{
            text:"",  
        },
        submitEnabled:false,
        errorIds:[]
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
         <PageWrapper>

         <div className='flex flex-col lg:flex-row  items-center m-auto gap-8 h-screen mt-40 md:mt-0 '>
           
            <div className='relative md:mt-24  lg:w-[50%] h-[75%] flex justify-center items-start'>
          
                <div className='rounded-lg ml-4 pt-20 md:max-w-[80%] h-full w-full border bg-indigo-950/90 hover:dark:shadow-lg text-white  dark:shadow-gray-200 text-center p-6'>
                <Diversity1Icon className='mr-4 mb-8'/>
                      <h1 className='mb-6 text-3xl sm:text-xl md:text-4xl'>Join us discover the power of synergy. Partner with us!</h1>
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
        
            <div className="mt-24 flex justify-center">


                <div className="max-w-md ">

                     
                        <h1 className='font-extrabold text-2xl mb-5'>
                            Join as a recruiter , job seeker or hiring manager
                        </h1>
                        <p className='mb-5 font-medium'>Join our Altrawave tech community now and get early access to 6 months of premium features and content!</p>
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
                        

                <TextField label="Company Name"  variant="outlined" fullWidth
                        error={registerData.companyName.error}
                        helperText={registerData.companyName.helperText}
                        required
                        inputProps={{
                            maxLength:45
                        }}

                        name='companyName'
                        value={registerData.companyName.text}
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

                        
                    <FormControl sx={{ 
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
                       
                    }} fullWidth >
                        <InputLabel id="demo-simple-select-label">Industry of work</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={industry}
                        label="Industry of work"
                        onChange={handleIndustryChange}
                    
                        >
                        <MenuItem value='technology'>Technology</MenuItem>
                        <MenuItem value='business'>Business</MenuItem>
                        <MenuItem value='education'>Education</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl  sx={{ 
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
                        
                    }} fullWidth >
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select className='text-red-700'
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleRoleChange}
                        >
                        <MenuItem value='recruiter'>Recruiter</MenuItem>
                        <MenuItem value='jobseeker'>Job seeker</MenuItem>
                        <MenuItem value='hiringmanager'>Hiring manager</MenuItem>
                        </Select>
                    </FormControl>
                            



                 
                    <p className='p-3 text-xs text-gray-700 dark:text-gray-100'>
                        We rescpect your privacy & security. Altrawave Tech does not spam or share your personal
                        information with third parties.By submitting this form , you agree that we may contact you in relation
                        to our poroducts & services, in accordance with our <span className='text-purple-500'> privacy and policy</span>
                        .You can opt out anytime.
                    </p>

                   
                        <div className='flex justify-center py-4 items-center'>
                            <MuiServerProvider>
                                    <Button variant="contained" endIcon={<Sendicon />}
                                    className='w-[50%] bg-indigo-950 text-white rounded-full py-2'
                                    >
                                      Sign Up
                                    </Button>
                            </MuiServerProvider>
                        </div>
                    
                
                </div>

                </div>
              
         </div>
        </PageWrapper>
      </>
    )
    
}