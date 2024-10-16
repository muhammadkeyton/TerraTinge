
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';


import AllWork from "@/app/ui/dashboard/developer-dashboard/project-card-stages-ui/developer-projects"

import { getAllProjects } from "@/app/server-actions/in-app/developer/all-work";

export default async function DeveloperProjects(){
    
    const session = await auth()
    const role = session?.user?.role;


    if(role !== Role.developer){
        return redirect('/dashboard');
    }

    const allProjects = await getAllProjects();
    

    return (
        <AllWork projects={allProjects}/>
    )
}