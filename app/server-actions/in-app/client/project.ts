'use server';

import { AppDataServer, ProjectState,ProjectVersions,VersionStage,VersionStage3,clientProjectsType } from "@/app/lib/definitions";

import { NameSchema } from "@/app/lib/data-validation";

import { auth } from "@/auth";

import { addNewProject,getClientProjects,updateNewProject, ClientDeleteProject,updateClientPromo} from "@/app/firebase/firestore/client/project";

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




interface updatePromoCodeResult{
    error:boolean,
    promoCodeId?:string,
    message:string
}

export const updateClientProjectPromoCode = async({projectId,promoCode}:{projectId:string,promoCode:string}):Promise<updatePromoCodeResult>=>{
    const result = await updateClientPromo({projectId,promoCode})
  
    revalidatePath('/dashboard/client');
    return await updateClientPromo({projectId,promoCode})
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

    const formatMaintainanceDate = (date:Timestamp | null):Date|null => {
        if(!date) return null;

        return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    }


    //type guard
    const isVersionStage3 = (version:ProjectVersions): version is VersionStage3 =>{
        return version.versionStage === VersionStage.stage3;
    }

    const isVersionStage4 = (version:ProjectVersions):version is VersionStage3 => {
        return version.versionStage === VersionStage.stage4;
    }


    //time complexity of o(n)

   // Modified projects with formatted dates
   const modifiedDateProjects = projects.map((project) => {
        const modifiedVersions = project.versions.map((version) => {
            if (isVersionStage3(version)) {
                return {
                    ...version,
                    projectInfo: {
                        ...version.projectInfo,
                        createdAt: formatTimestamp(version.projectInfo.createdAt as Timestamp),
                        paymentDate: formatTimestamp(version.projectInfo.paymentDate as Timestamp),
                        
                    }
                };
            } else if (isVersionStage4(version)){

                return {
                    ...version,
                    projectInfo: {
                        ...version.projectInfo,
                        createdAt: formatTimestamp(version.projectInfo.createdAt as Timestamp),
                        paymentDate: formatTimestamp(version.projectInfo.paymentDate as Timestamp),
                        completionDate: formatTimestamp(version.projectInfo.completionDate as Timestamp)
                        
                    }
                };

            } else {
                return {
                    ...version,
                    projectInfo: {
                        ...version.projectInfo,
                        createdAt: formatTimestamp(version.projectInfo.createdAt as Timestamp),
                    }
                };
            }
        });


        if(project.projectState === ProjectState.done){
            return {
                ...project,
                versions: modifiedVersions,
                maintainance:{
                    ...project.maintainance,
                    endDate:formatMaintainanceDate(project.maintainance.endDate as Timestamp | null)
                }
            };
        }



        return {
            ...project,
            versions: modifiedVersions,
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




export const clientDeleteProject = async (projectId:string,clientId:string):Promise<boolean> => {
    const deleteResult = await ClientDeleteProject(projectId,clientId);

    if(deleteResult){
        revalidatePath('/dashboard/client')
    }

    return deleteResult;
}