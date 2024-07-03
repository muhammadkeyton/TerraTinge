
'use client';

import { useContext } from 'react';
import { PartnerNavigationContext } from '../navigation-context';

import PromoCode from './promo-codes';

export default function PartnerContent(){
    const { currentState} = useContext(PartnerNavigationContext)


    switch (currentState) {
        case 'PromoCodes':{
            return <PromoCode/>
        }

        case 'Profile':{
            return <h1>partner profile</h1>
        }
            
            
    
        default:
            return <h1>un expected component</h1>
    }
}