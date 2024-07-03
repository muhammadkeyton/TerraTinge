import { FiUser } from "react-icons/fi";
import { PiDevices } from "react-icons/pi";
import { FcAdvertising } from "react-icons/fc";



//client dashboard navLinks
export const ClientLinks = [
    {
        name:'Projects',
        icon:<PiDevices className='text-3xl' />,
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />
    }
    
]



//partner dashboard navlinks
//client dashboard navLinks
export const PartnerLinks = [
    {
        name:'PromoCodes',
        icon:<FcAdvertising className='text-3xl' />,
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />
    }
    
]