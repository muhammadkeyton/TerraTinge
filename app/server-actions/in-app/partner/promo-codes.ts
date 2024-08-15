'use server';

import { v4 as uuidv4 } from 'uuid';


import { auth } from '@/auth';
import { savePartnerPromoCode,getPartnerPromoCode } from '@/app/firebase/firestore/partner/promo-codes';

import { revalidatePath } from 'next/cache';



export const fetchPartnerPromoNotUsed = async ():Promise<string|null> =>{
    const session = await auth();
    const partnerId = session?.user?.id as string;
    return await getPartnerPromoCode({partnerId:partnerId})
}





interface generatePromoResultType{
    success:boolean,
    promoCode:string | null;
}
export const generateUniquePromoCode = async ():Promise<generatePromoResultType> => {

    

    const session = await auth()

    if(!session?.user) return <generatePromoResultType>{
        success:false,
        promoCode:null
    };

    const partnerId = session.user.id as string;
    const partnerName = session.user.name?.substring(0,5) ?? session.user.email?.split('@')[0].substring(0,5);
    const newPromo = `TerraTinge-${partnerName}-${uuidv4()}`;

    const savePromoResult = await savePartnerPromoCode({partnerId:partnerId,promoCode:newPromo})

    if(savePromoResult){
        revalidatePath('/dashboard/partner');

        return <generatePromoResultType>{
            success:true,
            promoCode:newPromo
        };
    }

    return <generatePromoResultType>{
        success:false,
        promoCode:null
    };;
    
}