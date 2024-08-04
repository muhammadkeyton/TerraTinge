'use server';

import { AppDataServer, Project, ProjectState,clientProjectsType } from "@/app/lib/definitions";

import { NameSchema } from "@/app/lib/data-validation";

import { auth } from "@/auth";

import { addNewProject,getClientProjects,updateNewProject} from "@/app/firebase/firestore/client/project";

import { revalidatePath } from 'next/cache';
import { Timestamp } from "firebase/firestore";










/**
 * This function validates the project data and calls our database transaction  
 * @param {AppDataServer} data  - The data received from the client when submitting project for review.
 
 */
export const createNewProject = async (data:AppDataServer):Promise<boolean>=>{

   

    const session = await auth();
    

    const appNameResult = NameSchema.safeParse({name:data.appName});
    const appDetail = data.appDetail;
    const appBudget = data.appBudget;

    if(!appNameResult.success || appDetail.length < 1 || appBudget.length < 1){
        return false;
    }

     //data has been validated and is ok,now we can get the client id and pass to the firestore transaction
    const userId = session?.user?.id as string;
    const userEmail = session?.user?.email as string;
    const userProfileImage = session?.user?.image ?? `https://avatar.vercel.sh/${session?.user?.email}` as string;
    
    const projectState = ProjectState.inReview;
    const newProjectCreated = await addNewProject(projectState,userProfileImage,userEmail,userId,{appName:appNameResult.data.name,appDetail,appBudget});

    if(newProjectCreated){
        revalidatePath('/dashboard/client')
        
    }
    return newProjectCreated;





    




    
    


   

    
}



export const updateNewClientProject = async({projectId,appName,appDetail,appBudget}:{projectId:string,appName:string,appDetail:string,appBudget:string}):Promise<boolean> =>{
    const updated = await updateNewProject(projectId,appName,appDetail,appBudget);


    if(updated){
        revalidatePath('/dashboard/client')
        
    }
    return updated;
}




export const getProjects = async(clientId:string):Promise<null | clientProjectsType> => {
    const projects = await getClientProjects(clientId);


    if(!projects){
      return null;
    }



    // Function to convert Firestore timestamp to formatted date string,reason why we stored as timestamp in db 
    //is to allow flexibility for future date calculations
    const formatTimestamp = (timestamp:Timestamp):string => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    };


    //time complexity of o(n)
    const modifiedDateProjects: Project[] = projects.map((project) => {
        const modifiedVersions = project.versions.map((version) => ({
            ...version,
            projectInfo: {
                ...version.projectInfo,
                createdAt: formatTimestamp(version.projectInfo.createdAt as Timestamp)
            }
        }));
    
        return {
            ...project,
            versions: modifiedVersions
        };
    });


    const inReview = modifiedDateProjects.find((project) => project.projectState === ProjectState.inReview) ?? null;

    const inProgress = modifiedDateProjects.find((project) => project.projectState === ProjectState.inProgress) ?? null;

    const done = modifiedDateProjects.filter((project) => project.projectState === ProjectState.done);
    

    

    return <clientProjectsType>{
        inReview,
        inProgress,
        done
    }
}