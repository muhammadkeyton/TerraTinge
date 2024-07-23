//interacts with cloud firestore,this is for all projects that terratinge works on


'use server'
import { db} from "@/app/firebase/firebase";

import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData } from "firebase/firestore";
import { Project, ReviewedProjectType } from "@/app/lib/definitions";

//we are trying to fetch all data for developer to view,we have to make this better this is just a starting function
export const fetchAllProjects = async():Promise<null| DocumentData[]> => {
    let Projects: DocumentData[] = [];
    const projectsCollectionRef = collection(db, "projects");
    const allProjects = (await getDocs(projectsCollectionRef)).docs

    allProjects.forEach((doc)=>{
        let projectId = doc.id;
        let project = {
            ...doc.data(),
            projectId:projectId
        } as Project;



        

        Projects.push(project)


    });

    
    if(Projects.length > 0){
        return Projects;
    }

    return null;

    
}





export const updateProject = async ({projectId,newData}:{projectId:string,newData:ReviewedProjectType}):Promise<boolean> =>{
    
    console.log('inside database project update');


    console.log({
        ...newData,
        projectId
    });
    
    return true;
}




