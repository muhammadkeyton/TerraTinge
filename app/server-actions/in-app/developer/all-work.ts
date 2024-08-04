'use server';

import { fetchAllProjects, updateProject,DeleteProject } from "@/app/firebase/firestore/developer/all-work";
import { AppCostSchema, NameSchema } from "@/app/lib/data-validation";
import {ReviewedProjectType,ProjectPayment, Project, ProjectState, developerProjectsType } from "@/app/lib/definitions";
import { Timestamp } from "firebase/firestore";

import { revalidatePath } from "next/cache";







export const getAllProjects = async ():Promise<null | developerProjectsType> => {
    const projects = await fetchAllProjects();


 


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
    const modifiedDateProjects = projects.map((project) => {
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


    const inReview = modifiedDateProjects.filter((project) => project.projectState === ProjectState.inReview) ?? null;

    const inProgress = modifiedDateProjects.filter((project) => project.projectState === ProjectState.inProgress) ?? null;

    const done = modifiedDateProjects.filter((project) => project.projectState === ProjectState.done) ?? null;
    

    

    return <developerProjectsType>{
        inReview,
        inProgress,
        done
    }
}















export const submitUpdateProject = async (id:string,projectData:any):Promise<boolean> =>{
    const {appName,appCost,appDetail,percentage} = projectData;



    const appNameResult = NameSchema.safeParse({name:appName});
    const appCostResult = AppCostSchema.safeParse({appCost:appCost});

    if(!appNameResult.success || !appCostResult.success || appDetail.length < 1 || percentage.length < 1){
        return false;
    }

    let cost = Number(appCostResult.data.appCost)*100;
    let dynamicPercentage = (Number(percentage)/100)+1;

   //It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy
   //thats why we have to change appCost from dollar amount to cents
    let projectUpdate = <ReviewedProjectType>{
        paymentStatus:ProjectPayment.pending,
        appName,
        appDetail,
        percentage:dynamicPercentage,
        appCost:Math.round(cost * dynamicPercentage),
        paymentAmount:0,
    }


    const projectUpdateResult = await updateProject({projectId:id,newData:projectUpdate});

    if(projectUpdateResult){
        revalidatePath('/dashboard/developer')
    }


   


    return projectUpdateResult;
}



export const deleteProject = async (projectId:string,clientId:string):Promise<boolean> => {
    const deleteResult = await DeleteProject(projectId,clientId);

    if(deleteResult){
        revalidatePath('/dashboard/developer')
    }

    return deleteResult;
}