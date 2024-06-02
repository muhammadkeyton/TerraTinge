
'use client';



import NavBar from "@/app/ui/reusable-components/navbar"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";

import { PageWrapper } from "@/app/ui/page-animater";

import AuthView from '@/app/ui/reusable-components/login'




export default function LoginPage(){
    

    const ExplanationText = 'Accessing Our Services Is Super Easy, Enter Your Email. Click On The Email Link You Receive and You Will Be Logged In!'


    return (
        <>
         <NavBar/>

         <div className="mt-24 flex justify-center items-center">
            
            <PageWrapper>
            <div id="loginform" className="max-w-md ">

                <MuiServerProvider>
                 <AccountCircleOutlinedIcon className='font-normal text-5xl mb-10 text-indigo-700 dark:text-white'/>
                </MuiServerProvider>
                
                <h1 className="font-extrabold text-2xl mb-5">Quick Login With Email</h1>

                <AuthView text={ExplanationText}/>
     
               
                   
                  
                
               

            </div>
            </PageWrapper>

         </div>
        </>
    )
    
}