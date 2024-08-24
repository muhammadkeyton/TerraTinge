'use server';

import { db} from "@/app/firebase/clientFirebase";

import { collection,doc,runTransaction,getDoc, Timestamp, query, where, limit, getDocs} from "firebase/firestore";
import { generateUniquePromoCode } from "@/app/server-actions/in-app/partner/promo-codes";
import { ProjectPayment,PromoCode } from "@/app/lib/definitions";





export const getPartnerPromoCode = async({partnerId}:{partnerId:string}):Promise<PromoCode[] | null> =>{
    const partnerRef = doc(db, "users", partnerId);
    const promoCodesCollectionRef = collection(db, "promoCodes");

    let promoCodes:PromoCode[] = []

    try{
        const partner = await getDoc(partnerRef)

        if(!partner.exists()) return null;

        

        const promoQuery = query(promoCodesCollectionRef,where('partnerInfo.partnerId','==',partnerId));
        const allPromoCodes = (await getDocs(promoQuery)).docs ;


        allPromoCodes.forEach((promo)=>{
            let promoCode = {
                ...promo.data(),
                promoCode:promo.id
            } as PromoCode

            promoCodes.push(promoCode);
        })
        


        if(promoCodes.length > 0){
            return promoCodes;
        }

       return null;
        

        
    }catch(e){
        console.error(`could not fetch partner promoCodes:${e}`)
        return null;
    }


    


}




export const savePartnerPromoCode = async ({partnerId,promoCode,partnerEmail}:{partnerId:string,promoCode:string,partnerEmail:string}):Promise<boolean>=>{
    

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
    
            
            
          
            
           
                
            // Create the new promocode within the transaction and save to db,we are using the promocode itself as document id for fast retrieval later for clients
            transaction.set(doc(promoCodesCollection,promoCode), {

                partnerInfo:{
                    partnerId:partnerId,
                    partnerEmail:partnerEmail,
                },
                used:false,
                createdAt:Timestamp.fromDate(new Date()),


                
               
               
            });
    
            promoCodes.push(promoCode);
    
            transaction.update(partnerRef, { promoCodes: promoCodes });

            
            
        });


        console.log('promoCode db save transaction was a success!');

        return true;

    }catch(e){
        console.error(`couldn't save promoCode to db:${e}`)
    }

    return false;

}