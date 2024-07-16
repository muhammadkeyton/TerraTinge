
import Projects from "@/app/ui/dashboard/client-dashboard/components/projects/projects"
import { getClientProjects } from "@/app/firebase/firestore/client/project";
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function ClientProjects(){
    const session = await auth();

    if(session?.user?.role !== Role.client){
        return redirect('/dashboard');
    }



    const userId = session?.user?.id as string;
    const projects = await getClientProjects(userId)




    return (
        <Projects projects={projects}/>
    )
}