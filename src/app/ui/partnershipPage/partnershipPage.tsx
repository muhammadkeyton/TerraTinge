import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Divider from '@mui/material/Divider';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Button from '@mui/material/Button';
import Footer from '../landingPage/components/FooterSection';



import { PageWrapper } from '../pageAnimater';


import NavBar from '../reusableComponents/navbar';

import { montserrat } from '@/app/ui/fonts';


interface PartnershipCardProp{
    heading:string,
    text:string,
    color:string,
    icon:any
}







const partnershipData = [
    {
         'color':'bg-green-800',
        'icon':<FollowTheSignsIcon className='text-3xl'/>,
        'heading': 'Embark on a Lucrative Partnership',
        'text': "Step into an exciting partnership with Ultrawave. Click the 'Become Partner' button below to register and join our mission of creating exceptional apps that redefine user experience. Your journey towards a profitable partnership begins here.",
    },
    {
        'color':'bg-indigo-800',
        'icon':<TrendingUpIcon className='text-3xl'/>,
        'heading': 'Maximize Your Earnings through Sharing',
        'text': "Once onboard, request your unique promo code and start advertising our software development services on your social media platforms. For every completed app project that uses your promo code, you earn a 10% share of the project cost. Imagine earning $4000 from a $40,000 project just by sharing your promo code! The more clients you bring, the more money you make. Let's reach potential clients, build extraordinary apps, and prosper together."
    }
];


function PartnershipCard({heading,text,color,icon}:PartnershipCardProp){
    
       return(

       
        <div className={`${color} basis-1/2  pt-20 pb-6 px-6 rounded-md text-gray-100`}>

            <div className=" mb-4 flex justify-center items-center bg-inherit w-12 h-12 rounded-full border-white border-2  ">
                {icon}
            </div>
            
            <h3 className="mb-2 text-2xl font-semibold dark:text-white">{heading}</h3>
            <p className='dark:text-gray-200'>{text}</p>
        </div>

)


  
}


export default function PartnershipPage(){
    return(
    
        <main className=" lg:px-28">

            

            <NavBar/>
            
           
            <PageWrapper>  
            <div  className='flex space-x-4 items-center mt-24 mb-8 dark:text-white'>

             <Diversity1Icon/>
             <h1 className="text-3xl font-black">Ultrawave Partnership</h1>

            </div>
            
       

            <div className='flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6 mb-6'>


                {
                    partnershipData.map((data,index)=>{
                        return <PartnershipCard key={index} heading={data.heading} color={data.color} text={data.text} icon={data.icon}/>
                    })
                }

               


            </div>

            <Button  variant="contained" startIcon={<Diversity1Icon/>}  className={`${montserrat.className} mb-5 text-base bg-slate-950 dark:bg-indigo-950 text-white w-52 h-10 font-app rounded-full normal-case`}>Become Partner</Button>
            </PageWrapper> 
            <Divider className="dark:bg-slate-300" />

            <Footer/>



        </main>
       
    )
}