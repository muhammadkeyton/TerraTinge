
import Divider from '@mui/material/Divider';
import PolicyIcon from '@mui/icons-material/Policy';

import Footer from "../landing-page/components/footer-section";


import { PageWrapper } from '../page-animater';

import NavBar from "../reusable-components/navbar";

const PrivacyPolicyData = [
    {
      "heading": "Personal Information",
      "text": "We collect personal information when you register for an account, such as your name and email address. This information is used to provide you with our services. For payment processing, we use Stripe, a third-party service. While you will provide payment information such as credit card details during the transaction process, we do not collect or store this information. Stripe handles all aspects of payment processing. For more information, please refer to Stripe’s Privacy Policy."
    },
    {
      "heading": "Third-Party Login",
      "text": "Our web application offers you the option to log in using an email magic link or a third-party service such as Google. When you choose to log in using Google, we will receive certain profile information according to the permissions granted by you on their platform. We do not receive or store your passwords for Google and similary when you just login with our email magic links,we just send you links to allow you access,we don't ask for passwords to your emails or google account, For more information, please refer to the privacy policies of Google."
    },
    {
      "heading": "Use of Information",
      "text": "We use your information to provide and improve our services, process your transactions, and communicate with you about your account or our services. We do not sell or share your information with third parties for marketing purposes."
    },
    {
      "heading": "Security",
      "text": "We take the security of your personal information seriously. We use industry-standard security measures to protect your information from unauthorized access, use, or disclosure"
    },
    {
      "heading": "Cookies",
      "text": "We use cookies to provide a better user experience, such as keeping you logged in to your account. You can control the use of cookies at the individual browser level."
    },
    {
      "heading": "Changes to This Policy",
      "text": "We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes."
    }
]
  
function Privacy({heading,text,i}:{heading:string,text:string,i:number}){
    return (
        <>
          <h2 className="text-xl font-semibold mb-4">{`${i}. ${heading}`}</h2>
          <p className='text-lg max-w-screen-md  mb-6 '>{text}</p>
        </>
        


    )
}
export default function PrivacyPage(){
    return (
      
        <main className="px-4 md:p-8">
            
            <NavBar/>

            <PageWrapper>
            <div className="flex flex-col justify-center mt-24 items-center ">

                <div  className='flex space-x-4 items-center mb-10 dark:text-white'>

                <PolicyIcon/>
                <h1 className="text-2xl font-black ">Ultrawave Privacy Policy</h1>

                </div>

                <div className='mb-6'>
                {
                    PrivacyPolicyData.map((data,index)=>{
                        return <Privacy key={index} heading={data.heading} text={data.text} i={index + 1}/>
                    })
                }

                </div>



            </div>
            </PageWrapper>

          



            
            <Divider className="dark:bg-slate-300" />

            <Footer/>


        </main>
       
    )
}