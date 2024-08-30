'use server';

import { fetchAllProjects, updateProjectStage2,UpdatePartnerPayment,updateProjectStage3,DeleteProject, updateProjectStage4 } from "@/app/firebase/firestore/developer/all-work";
import { AppCostSchema, NameSchema } from "@/app/lib/data-validation";
import {ReviewedProjectType,ProjectPayment, ProjectState, developerProjectsType, ProjectVersions, VersionStage3, VersionStage, ReviewedProjectTypeStage3, ReviewedProjectTypeStage4 } from "@/app/lib/definitions";
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


    const formatMaintainanceDate = (date:Timestamp | null):Date|null => {
        if(!date) return null;

        return new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    }


    


  
    //type guard ,versionstage3 is the final version,stage4 is just to indicate its complete
    const isVersionStage3 = (version:ProjectVersions): version is VersionStage3 =>{
        return version.versionStage === VersionStage.stage3;
    }


    const isVersionStage4 = (version:ProjectVersions):version is VersionStage3 => {
        return version.versionStage === VersionStage.stage4;
    }


    //time complexity of o(n)
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
    const {appName,appCost,appDetail,percentage,projectLink,versionStage,completed} = projectData;


  


    const appNameResult = NameSchema.safeParse({name:appName});
    const appCostResult = AppCostSchema.safeParse({appCost:appCost});


    

    if(versionStage !== VersionStage.stage4 && (!appNameResult.success || !appCostResult.success || appDetail.length < 1 || percentage.length < 1)){
        return false;
        
    }

   

    let cost = Number(appCostResult.data?.appCost)*100;

    let numPercentage= Number(percentage)
   



    // Function to calculate total charge
    function calculateTotalCharge(desiredAmount:number, percentage:number):number {
        let processingFeePercentage = percentage / 100;
        return desiredAmount / (1 - processingFeePercentage);
    }
    
   let projectUpdate;

   let projectUpdateResult;

   let totalCharge = calculateTotalCharge(cost,numPercentage);

   if(versionStage && (versionStage === VersionStage.stage3)){
      
      projectUpdate = <ReviewedProjectTypeStage3>{
        appName:appNameResult.data?.name,
        appDetail,
        percentage:numPercentage,
        appCostAndFee:Math.round(totalCharge),
        appCost:Math.round(cost),
        completed:completed,
        projectLink: projectLink.length > 0 ? projectLink : null
      }

      projectUpdateResult = await updateProjectStage3({projectId:id,newData:projectUpdate});
   }else if(versionStage && (versionStage === VersionStage.stage4)){
  
     projectUpdate = <ReviewedProjectTypeStage4>{
        appName,
        completed:completed,
        projectLink: projectLink.length > 0 ? projectLink : null
      }

      projectUpdateResult = await updateProjectStage4({projectId:id,newData:projectUpdate});
   }else{
    projectUpdate = <ReviewedProjectType>{
        paymentStatus:ProjectPayment.pending,
        appName,
        appDetail,
        percentage:numPercentage,
        appCostAndFee:Math.round(totalCharge),
        appCost:Math.round(cost),
        paymentAmount:0,
    }
    projectUpdateResult = await updateProjectStage2({projectId:id,newData:projectUpdate});

   }
    

   //It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy
   //thats why we have to change appCost from dollar amount to cents
    


   

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


export const updatePartnerPayment = async({projectId,promoId,paymentAmount,paid}:{projectId:string,promoId:string,paymentAmount:number,paid:boolean}):Promise<boolean> =>{
    
    let success = await UpdatePartnerPayment(projectId,promoId,paymentAmount,paid);

    if(success){
        revalidatePath('/dashboard/developer')
    }

    return success;
}