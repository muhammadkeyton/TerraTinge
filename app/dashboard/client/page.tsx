
import Projects from "@/app/ui/dashboard/client-dashboard/components/projects/projects"
import { auth } from "@/auth"
import { getClientProjects } from "@/app/firebase/firestore/client/project";

export default async function ClientProjects(){
    const session = await auth();
    const userId = session?.user?.id as string;
    const projects = await getClientProjects(userId)


    return (
        <Projects projects={projects}/>
    )
}