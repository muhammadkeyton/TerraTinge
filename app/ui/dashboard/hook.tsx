
'use client'


import {useState} from 'react';

import { PiDevices } from "react-icons/pi";
import { FiUser } from "react-icons/fi";

import Client from './client/client';


export const navLinks = [
    {
        name:'Projects',
        icon:<PiDevices className='text-3xl' />,
    },

    {
        name:'Profile',
        icon:<FiUser className='text-3xl' />
    }
]
   


export function useNavigationState(){
    const [currentLink,setLink] = useState('Projects')





    return {
        currentLink
    }
}