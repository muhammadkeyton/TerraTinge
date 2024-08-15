import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'

import PartnerTabs from "@/app/ui/dashboard/partner-dashboard/partner-tabs";
import { fetchPartnerPromoNotUsed } from "@/app/server-actions/in-app/partner/promo-codes";
export default async function DeveloperWork(){
    
    const session = await auth()


    if(session?.user?.role !== Role.partner){
        return redirect('/dashboard');
    }

    const promoCode = await fetchPartnerPromoNotUsed();

    return (
     <PartnerTabs promo={promoCode}/>

    );
}