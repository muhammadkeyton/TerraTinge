import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'

import PartnerTabs from "@/app/ui/dashboard/partner-dashboard/partner-tabs";
export default async function DeveloperWork(){
    
    const session = await auth()


    if(session?.user?.role !== Role.partner){
        return redirect('/dashboard');
    }

    return (
     <PartnerTabs/>

    );
}