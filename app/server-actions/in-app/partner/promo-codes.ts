'use server';

import { v4 as uuidv4 } from 'uuid';


import { auth } from '@/auth';
import { savePartnerPromoCode,getPartnerPromoCode } from '@/app/firebase/firestore/partner/promo-codes';

import { revalidatePath } from 'next/cache';
import { Timestamp } from 'firebase/firestore';
import { ProjectPayment,partnerPromoCodesType } from '@/app/lib/definitions';



export const fetchPartnerPromoCodes = async ():Promise<partnerPromoCodesType| null> =>{
    const session = await auth();
    const partnerId = session?.user?.id as string;
    const promoCodes = await getPartnerPromoCode({partnerId:partnerId})

    if(!promoCodes) return null;

    
    // Function to convert Firestore timestamp to formatted date string,reason why we stored as timestamp in db 
    //is to allow flexibility for future date calculations
    const formatTimestamp = (timestamp:Timestamp):string => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    };



    const modifiedDatePromoCodes = promoCodes.map((promo) => {
        return {
            ...promo,
            createdAt: formatTimestamp(promo.createdAt as Timestamp)
        }
    });


   

    const inUse = modifiedDatePromoCodes.filter((project) => project.used === true && project.projectInfo?.paymentStatus === ProjectPayment.pending ) ?? null;


    const notUsedYet = modifiedDatePromoCodes.find((project) => project.used === false) ?? null;

    const earnings = modifiedDatePromoCodes.filter((project) => project.projectInfo?.paymentStatus === ProjectPayment.paid) ?? null;

    return {
        inUse,
        earnings,
        notUsedYet
    }
}






export const generateUniquePromoCode = async ():Promise<boolean> => {

    

    const session = await auth()

    if(!session?.user) return false;

    const partnerId = session.user.id as string;
    const partnerName = session.user.name?.substring(0,5) ?? session.user.email?.split('@')[0].substring(0,5);
    const partnerEmail = session?.user?.email as string;
    const newPromo = `TerraTinge-${partnerName}-${uuidv4()}`;

    const savePromoResult = await savePartnerPromoCode({partnerId:partnerId,promoCode:newPromo,partnerEmail:partnerEmail})

    if(savePromoResult){
        revalidatePath('/dashboard/partner');
    }

    return savePromoResult;
    
}