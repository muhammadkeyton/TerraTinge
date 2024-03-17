
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';

import Footer from '../landingPage/components/FooterSection';
import ThemeSwitch from '../landingPage/Mui Components/ThemeSwitch';

import { montserrat } from '@/app/ui/fonts';


import { PageWrapper } from '../pageAnimater';




interface CareerValueCardProp{
    heading:string,
    text:string,
    color:string,
    icon:any
}


const CareerValueData = [
    {
        'heading':'Creativity at our core',
        'text':'We breathe creativity in building user-friendly mobile and web applications. Our team thrives on innovative thinking and problem-solving. Welcome to the core of innovation.',
        'color':'bg-violet-700',
        'icon':<LightbulbOutlinedIcon className='text-3xl'/>
    },
    {
        'heading':'Collaboration as Our Strength',
        'text':'We believe in the power of teamwork. Our strength lies in our collective expertise and the collaborative spirit that drives us to create top-notch mobile and web applications',
        'color':'bg-orange-700',
        'icon':<Diversity3Icon className='text-3xl'/>
    }
]


function CareerValueCard({heading,text,color,icon}:CareerValueCardProp){
    
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


export default function CareersPage(){
    return(
    <PageWrapper>
        <main className="md:p-8">

            <div className="mt-6 mb-12 flex justify-between items-center">
                <Link href='/'>
                    <Button startIcon={<ArrowBackIcon/>} className={`${montserrat.className} `}>
                        Home
                    </Button>
                </Link>

                <ThemeSwitch/>
            </div>
            
           
                 
            <div  className='flex space-x-4 items-center mb-4 dark:text-white'>

             <WorkIcon/>
             <h1 className="text-3xl font-black">Ultrawave Careers</h1>

            </div>
            
            <p className="max-w-screen-sm mb-6 text-lg">We greatly appreciate the opportunity to work with skilled and hardworking engineers to build top-notch applications. However, please be aware that we are not currently looking to grow our team.</p>

            <div className='flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6 mb-6'>


                {
                    CareerValueData.map((data,index)=>{
                        return <CareerValueCard key={index} heading={data.heading} color={data.color} text={data.text} icon={data.icon}/>
                    })
                }

               


            </div>
            <Divider className="dark:bg-slate-300" />

            <Footer/>



        </main>
        </PageWrapper>
    )
}