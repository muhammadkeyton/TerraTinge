
import GavelIcon from '@mui/icons-material/Gavel';
import Divider from '@mui/material/Divider';
import Footer from "../landing-page/components/footer-section";

import { PageWrapper } from '../page-animater';
import NavBar from "../reusable-components/navbar";

const TermsData = [
    {
      "heading": "Terms of Agreement",
      "text": "By engaging our mobile and web application development services, you are consenting to these terms and conditions. We reserve the right to modify these terms without prior notification. If you disagree with any part of these terms and conditions, we kindly request that you refrain from using our web application for your software development needs."
    },
    {
      "heading": "Scope of Services and Deliverables",
      "text": "We offer a comprehensive range of services in the domain of mobile and web application development. The scope and specifications of the project will be mutually agreed upon before the initiation of the project. We ensure that you have complete access to your source code and hosting services."
    },
    {
      "heading": "Payment Terms and Refund Policy",
      "text": "Payment for our services is due upon the completion of the project. We require an upfront payment of a third of the total project cost. Refunds are available if requested by you before the commencement of the first feature development. However, once we have started building the first feature, refunds are not available. Despite this, we will strive to ensure your satisfaction throughout the project."
    },
    {
      "heading": "Integration with Third-Party Services",
      "text": "We offer the option to log in using third-party service for oAuth Google and also your normal email by sending you a secure login link. Please note that we are not affiliated with your email provider or google third-party services in any way. Any issues with their services are not our responsibility as we do not have access to their data. We only receive the data you give us permission to receive. We do not have access to your passwords on these platforms. We are not responsible for any loss of access to those accounts or any actions taken by someone who uses your third-party accounts to log in to our service."
    },
    {
      "heading": "Confidentiality and Data Protection",
      "text": "We place a high priority on the security of your personal information. We implement industry-standard security measures to safeguard your information from unauthorized access, use, or disclosure."
    },
    {
      "heading": "Support After Development",
      "text": "Upon launch, we offer three months of complimentary maintenance. Following this period, you may opt for our monthly maintenance service at 10% of the total development cost. If issues arise after the three-month period due to your actions, hosting provider downtime, or bugs, and you are not subscribed to our monthly maintenance service, we are not liable for these issues. However, we can assist in resolving them at a charge of 20% of the project cost for the specific issue. Once resolved, you may opt for our monthly maintenance service. If you do not subscribe to our monthly maintenance, you assume full responsibility for your application, including user data and all related aspects."
    }
]


function Term({heading,text,i}:{heading:string,text:string,i:number}){
    return (
        <>
          <h2 className="text-xl font-semibold mb-4">{`${i}. ${heading}`}</h2>
          <p className='text-lg max-w-screen-md  mb-6 '>{text}</p>
        </>
        


    )
}

export default function TermsPage(){
    return (
   
    <main className='md:p-8'>

      <NavBar/>

       <PageWrapper>
        <div className="flex flex-col justify-center mt-24 items-center">

            <div  className='flex space-x-4 items-center mb-10 dark:text-white'>

                <GavelIcon/>
                <h1 className="text-2xl font-black ">Ultrawave Terms and Conditions</h1>

            </div>

            <div className='mb-6'>
                {
                    TermsData.map((data,index)=>{
                        return <Term key={index} heading={data.heading} text={data.text} i={index + 1}/>
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