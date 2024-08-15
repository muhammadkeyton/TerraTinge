'use server';

import { db} from "@/app/firebase/firebase";

import { collection,doc,runTransaction,getDoc, Timestamp, query, where, limit, getDocs} from "firebase/firestore";
import { generateUniquePromoCode } from "@/app/server-actions/in-app/partner/promo-codes";




export const getPartnerPromoCode = async({partnerId}:{partnerId:string}):Promise<string|null> =>{
    const partnerRef = doc(db, "users", partnerId);
    const promoCodesCollectionRef = collection(db, "promoCodes");
    try{
        const partner = await getDoc(partnerRef)

        if(!partner.exists()) return null;

        const promoQuery = query(promoCodesCollectionRef, where("used", "==", false),where('partnerId','==',partnerId),limit(1));
        const promoQuerySnapshot = (await getDocs(promoQuery)).docs;

        if(promoQuerySnapshot.length > 0){
            return promoQuerySnapshot[0].data().promoCode;
        }else{
            return null;
        }

        
    }catch(e){
        console.error('could not fetch partner promocodes')
    }


    return null;


}




export const savePartnerPromoCode = async ({partnerId,promoCode}:{partnerId:string,promoCode:string}):Promise<boolean>=>{
    

    try{
        const partnerRef = doc(db, "users", partnerId);
        const promoCodesCollection = collection(db,'promoCodes');

        await runTransaction(db, async (transaction) => {
            const partner = await transaction.get(partnerRef);
    
            if (!partner.exists()) return false;
    
            let promoCodes = partner.data()?.promoCodes;


    
            if (!promoCodes) {
                promoCodes = [];
            }else{
                if(promoCodes.includes(promoCode)){
                    return await generateUniquePromoCode()
                }
            }
    
            // Generate a unique ID for the new promoCode
            const newPromoId = doc(promoCodesCollection).id;
            
          
            
           
                
            // Create the new promocode within the transaction
            transaction.set(doc(promoCodesCollection, newPromoId), { 
           
                promoCode:promoCode,
                partnerId:partnerId,
                used:false,
                createdAt:Timestamp.fromDate(new Date()),


                
               
               
            });
    
            promoCodes.push(newPromoId);
    
            transaction.update(partnerRef, { promoCodes: promoCodes });

            
            
        });


        console.log('promoCode db save transaction was a success!');

        return true;

    }catch(e){
        console.error(`couldn't save promoCode to db:${e}`)
    }

    return false;

}