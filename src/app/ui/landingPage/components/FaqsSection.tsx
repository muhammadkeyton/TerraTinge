'use client';

import {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ConstructionIcon from '@mui/icons-material/Construction';
import SecurityIcon from '@mui/icons-material/Security';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CodeIcon from '@mui/icons-material/Code';
import LockIcon from '@mui/icons-material/Lock';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CopyrightIcon from '@mui/icons-material/Copyright';

const faqsData = [
    {
        "icon": <DesignServicesIcon/>,
        "question": "What services do you offer?",
        "answer": "Our company excels in crafting bespoke mobile and web applications that are not only beautiful but also performant. We tailor our services to align with your unique business requirements, ensuring that the final product is a perfect fit for your specific needs."
    },
    {   "icon":<ConstructionIcon/>,
        "question": "What technologies do you specialize in?",
        "answer": "We believe that technologies are tools that serve to realize your vision. Our team is proficient in a wide array of technologies and selects the most suitable ones based on your project's requirements. For instance, if your project involves both a mobile and a web app, we might employ a combination of React, React Native, or Flutter."
    },
    {   "icon":<SecurityIcon/>,
        "question": "Can you provide examples of projects you've completed?",
        "answer": "We hold our clients’ privacy in high regard and ensure the utmost confidentiality for their projects. We refrain from disclosing these projects on our website, as we respect our clients and do not own the copyright to these projects. However, we can proudly share that the web app you’re currently viewing stands as a testament to our capabilities. It showcases a beautifully designed landing page, user authentication, an AI chatbot, an account system for project payments and feature requests, and so much more."
    },
    {   "icon": <DomainVerificationIcon/>,
        "question": "How do you ensure the quality of your software?",
        "answer": "Quality is at the forefront of our software development process. We adhere to industry best practices and conduct rigorous testing at each stage of development. This meticulous approach ensures that we deliver high-quality, reliable, and efficient software."
    },
    {
        "icon":<CreditCardIcon/>,
        "question": "What is your pricing model? Are there any hidden costs?",
        "answer": "Our pricing model is flexible and is determined by the complexity and scope of your project. Typically, projects range from $4000 to $15000 + tax. We believe in transparency and assure you that there are no hidden costs. We charge a third of the project cost upfront, with the balance due upon your satisfaction with the completed project."
    },
    { 
        "icon": <CodeIcon/>,
        "question": "What kind of support do you offer after the Development?",
        "answer": "Post-launch, we offer three months of free maintenance. After this period, you can opt for our monthly maintenance service at 10% of the total development cost. Alternatively, you can choose other developers for maintenance since you own the app."
    },
    {   "icon":<LockIcon/>,
        "question": "How do you handle data security and privacy?",
        "answer": "Data security and privacy are paramount in our development process. We adhere to industry-standard security practices and regulations to safeguard your data. We implement robust security measures to prevent unauthorized access and ensure the confidentiality of your data."
    },
    {   "icon": <EditNoteIcon/>,
        "question": "Can I make changes to the project once it has started?",
        "answer": "Yes, we accommodate changes during the development process. However, if these changes necessitate additional development time compared to the original plan, we will charge an additional 5% of the project cost to your remaining balance."
    },
    {   "icon":<InsertEmoticonIcon/>,
        "question": "What happens if I'm not satisfied with the final product?",
        "answer": "Your satisfaction is our priority. We involve you in every step of the development process, requiring your review and approval for each completed feature before proceeding. This collaborative approach ensures that you are satisfied with the final product, as you have guided its creation."
    },
    {   "icon": <CopyrightIcon />,
        "question": "Do I own the intellectual property of the developed software?",
        "answer": "Absolutely, you retain full ownership of the app and its source code. We respect your rights and maintain strict confidentiality, never disclosing our clients' projects on our website."
    }
]

interface CustomAccordianPropType{
  icon:any,
  question:string,
  answer:string
  expanded:string | boolean,
  handleChange: (p:string)=> any,
  panel:string
}

function CustomAccordian({icon,question,answer,expanded,handleChange,panel}:CustomAccordianPropType){
    return (
        <div className="flex items-start space-x-2 ">

        <div className="p-3 border dark:border-gray-400  rounded-lg dark:text-white">
         {icon}
        </div>
      
      <div>

      <Accordion expanded={expanded === panel} onChange={handleChange(panel)} className="bg-inherit shadow-lg hover:shadow-indigo-500/50 rounded">
        <AccordionSummary
          expandIcon={<ExpandCircleDownIcon className="dark:text-white" />}
        >
          
          <h4 className="font-semibold dark:text-white">{question}</h4>
        </AccordionSummary>
        <AccordionDetails onClick={handleChange(panel)}>
          <p className="cursor-pointer font-normal text-gray-700 dark:text-gray-300" >
            {answer}
          </p>
        </AccordionDetails>
      </Accordion>
      </div>

    </div>
    )
}



export default function Faqs() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel:any) => (event:Event, isExpanded:boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  

  return (
 <div id='section2' className="xl:mx-24 mt-20 mb-40">
      <h1 className="text-4xl font-black dark:text-white mb-4">Frequently Asked Questions</h1>
      <h4 className="text-gray-700 dark:text-slate-50 mb-16">Quick answers to questions,you may have.</h4>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {
        faqsData.map((data,index)=>{
            return ( <CustomAccordian key={index} panel={`panel${index}`} handleChange={handleChange} expanded={expanded} icon={data.icon} question={data.question} answer={data.answer}/>)
        })
    }



    </div>



    </div>
  );
}



