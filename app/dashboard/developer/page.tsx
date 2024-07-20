
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


import AllWork from "@/app/ui/dashboard/developer-dashboard/components/work/all-work";

export default async function DeveloperProjects(){
    
    const session = await auth()


    if(session?.user?.role !== Role.developer){
        return redirect('/dashboard');
    }

    return (
        <AllWork projects={null}/>
    )
}