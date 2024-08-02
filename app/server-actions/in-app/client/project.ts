'use server';

import { AppDataServer, Project, ProjectState } from "@/app/lib/definitions";

import { NameSchema } from "@/app/lib/data-validation";

import { auth } from "@/auth";

import { addNewProject,getClientProjects} from "@/app/firebase/firestore/client/project";

import { revalidatePath } from 'next/cache';
import { Timestamp } from "firebase/firestore";










/**
 * This function validates the project data and calls our database transaction  
 * @param {AppDataServer} data  - The data received from the client when submitting project for review.
 
 */
export const createNewProject = async (data:AppDataServer):Promise<boolean>=>{

    // console.log(data);

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
    const reviewed = false;
    const projectState = ProjectState.inReview;
    const newProjectCreated = await addNewProject(projectState,reviewed,userProfileImage,userEmail,userId,{appName:appNameResult.data.name,appDetail,appBudget});

    if(newProjectCreated){
        revalidatePath('/dashboard/client')
        
    }
    return newProjectCreated;





    




    
    


   

    
}


export const getProjects = async(clientId:string):Promise<null | Project []> => {
    const projects = await getClientProjects(clientId);




    let modifiedDateProjects:Project[] = [];

   


    if(!projects){
      return null;
    }



    // Function to convert Firestore timestamp to formatted date string
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



    modifiedDateProjects = projects.map((project)=>{
        return {
            ...project,
            versions:project.versions.map((version)=>{
                return {
                    ...version,
                    projectInfo:{
                        ...version.projectInfo,
                        createdAt:formatTimestamp(version.projectInfo.createdAt as Timestamp)
                    }
                }
            })
            
        }
      })

    

    return modifiedDateProjects;
}