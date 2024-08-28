
'use client';



import NavBar from "@/app/ui/reusable-components/navbar"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";

import { PageWrapper } from "@/app/ui/page-animater";

import AuthView from '@/app/ui/reusable-components/login'


import useWebviewDetection from "../reusable-components/useWebviewDetection";


export default function LoginPage(){
    
    const { isClient, isWebView } = useWebviewDetection();

    const ExplanationText = 'Accessing Our Services Is Super Easy, Enter Your Email. Click On The Email Link You Receive and You Will Be Logged In!'
   

    if (!isClient) {
        return null; // meaning we are still in server side and cannot detect webview
    }

    return (
        <div className='relative pt-16'>
        <NavBar/>
         <div className="flex justify-center items-center h-screen">
         
            <PageWrapper>
            <div id="loginform" className="max-w-md px-4">

                <MuiServerProvider>
                 <AccountCircleOutlinedIcon className='font-normal text-5xl mb-10 text-indigo-700 dark:text-white'/>
                </MuiServerProvider>

                {
                    !isWebView?

               
                <>
                <h1 className="font-extrabold text-2xl mb-5">TerraTinge Login With Email</h1>




                <AuthView text={ExplanationText}/>
                </>

                :

                <p className="font-extrabold text-2xl mb-5">
                For security reasons, we do not allow logins through social media webviews such as TikTok, Instagram, LinkedIn, etc. Please use a web browser like Chrome, Bing, Firefox, Microsoft Edge, or Safari to securely authenticate with us. Thank you for your understanding.
                </p>
              


                }
                
     
               
                   
                  
                
               

            </div>
            </PageWrapper>

         </div>
        </div>
    )
    
}