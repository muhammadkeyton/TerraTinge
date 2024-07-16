import { FiUser } from "react-icons/fi";
import { PiDevices } from "react-icons/pi";
import { FcAdvertising } from "react-icons/fc";

import { MdOutlineWork } from "react-icons/md";



//client dashboard navLinks
export const ClientLinks = [
    {
        name:'Projects',
        icon:<PiDevices className='text-3xl' />,
        href:'/dashboard/client'
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />,
        href:'/dashboard/client/profile'
    },
    
]



//partner dashboard navlinks
export const PartnerLinks = [
    {
        name:'PromoCodes',
        icon:<FcAdvertising className='text-3xl' />,
        href:'/dashboard/partner'
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />,
        href:'/dashboard/partner/profile'
    }
    
]

//partner dashboard navlinks
export const DeveloperLinks = [
    {
        name:'Work',
        icon:<MdOutlineWork className='text-3xl' />,
        href:'/dashboard/developer'
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />,
        href:'/dashboard/developer/profile'
    }
    
]