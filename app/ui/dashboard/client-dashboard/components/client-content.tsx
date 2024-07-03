
'use client';

import { useContext } from 'react';
import { ClientNavigationContext } from '../navigation-context';

import Projects from './projects';

export default function ClientContent(){
    const { currentState} = useContext(ClientNavigationContext)


    switch (currentState) {
        case 'Projects':{
            return <Projects/>
        }

        case 'Profile':{
            return <h1>client profile</h1>
        }
            
            
    
        default:
            return <h1>un expected component</h1>
    }
}