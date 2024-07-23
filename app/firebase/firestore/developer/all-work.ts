//interacts with cloud firestore,this is for all projects that terratinge works on


'use server'
import { db} from "@/app/firebase/firebase";

import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData } from "firebase/firestore";
import { Project } from "@/app/lib/definitions";

//we are trying to fetch all data for developer to view
export const fetchAllProjects = async():Promise<null| DocumentData[]> => {
    let Projects: DocumentData[] = [];
    const projectsCollectionRef = collection(db, "projects");
    const allProjects = (await getDocs(projectsCollectionRef)).docs

    allProjects.forEach((p,i)=>{
        let project = p.data() as Project;

        Projects.push(project)


    });

    
    if(Projects.length > 0){
        return Projects;
    }

    return null;

    
}