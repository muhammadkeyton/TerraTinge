import { FaTiktok } from "react-icons/fa6";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import WorkIcon from '@mui/icons-material/Work';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';

import { lobster_Two } from "@/app/ui/fonts";


import instagram from '/instagram.png';

//PCPT is a short word for partners,careers,privacy policy and terms and conditions
type PCPTType = {
    icon:any,
    text:string
}

function PCPT({icon,text}:PCPTType){
    return(
    <div className="flex items-center space-x-4">
        {icon}
        <a href="">{text}</a>
    </div>
    )
}


export default function Footer(){
    const date = new Date().getFullYear()
    return (
        <footer className="grid grid-cols-2 gap-16 md:grid-cols-3 md:gap-0 place-items-center font-bold dark:text-white  my-20 xl:mx-24">
            <div>
            <h4 className="max-w-sm">© {date} Ultrawave Technologies Canada, All Rights Reserved</h4>
            </div>


            <div className="flex  flex-col space-y-4">
                

                <PCPT text="Partnership" icon={<Diversity1Icon/>}/>
                <PCPT text="Careers" icon={<WorkIcon/>}/>
                <PCPT text="Privacy Policy" icon={<PolicyIcon/>}/>
                <PCPT text="Terms and Conditions" icon={<GavelIcon/>}/>
                
                
            </div>


            <div className="col-span-2 md:col-auto flex flex-col space-y-6">
                <div>
                <h4 className="mb-2 text-2xl">Get in touch</h4>
                <a href="" className="underline decoration-indigo-700 underline-offset-4">support@Ultrawave.tech</a>
                </div>

                <div className="flex items-center space-x-6">
                 <div>
                 <IconButton className="p-3">
                 <FaTiktok className="text-4xl text-black dark:text-white"/>
                 </IconButton>
                 <p>TikTok</p>
                 </div>
                 
                 <div>
                 <IconButton className="p-3">
                    <Image
                    unoptimized
                    src='/instagram.png'
                    width={35}
                    height={35}
                    alt='instagram logo'
                    />
                 </IconButton>
                 <p className={`${lobster_Two.className}`}>Instagram</p>
                 </div>
                 
                
                </div>

            </div>


        </footer>
    )
}