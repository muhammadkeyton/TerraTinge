
'use client';



import NavBar from "@/app/ui/reusable-components/navbar"

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";

import { PageWrapper } from "@/app/ui/page-animater";

import AuthView from '@/app/ui/reusable-components/login'

import { isWebview } from '@dvlden/is-webview';


export default function LoginPage(){
    const userAgent = window.navigator.userAgent;
   const isWebView = isWebview(userAgent);

    const ExplanationText = 'Accessing Our Services Is Super Easy, Enter Your Email. Click On The Email Link You Receive and You Will Be Logged In!'


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

                <p className="font-extrabold text-2xl mb-5">Hello,for security purpose we do not allow our users to login using social media webviews,please open our webApp in a web browser like safari or chrome in order to securely authenticate with us </p>


                }
                
     
               
                   
                  
                
               

            </div>
            </PageWrapper>

         </div>
        </div>
    )
    
}