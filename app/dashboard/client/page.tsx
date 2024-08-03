
import Projects from "@/app/ui/dashboard/client-dashboard/project-card-stages-ui/client-projects"
import {  Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { getProjects } from "@/app/server-actions/in-app/client/project";

export default async function ClientProjects(){
    const session = await auth();
    const role = session?.user?.role;

    if(role !== Role.client){
        return redirect('/dashboard');
    }



    const userId = session?.user?.id as string;

 
    const projects = await getProjects(userId)

    


    return (
        
        <Projects projects={projects}/>
    )
}