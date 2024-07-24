'use server';

import { fetchAllProjects, updateProject } from "@/app/firebase/firestore/developer/all-work";
import { AppCostSchema, NameSchema } from "@/app/lib/data-validation";
import { ReviewedProjectType,ProjectPayment } from "@/app/lib/definitions";
import { DocumentData } from "firebase/firestore";
import { revalidatePath } from "next/cache";


export const getAllProjects = async ():Promise<null | DocumentData []> => {
    return await fetchAllProjects();
}


export const submitUpdateProject = async (id:string,projectData:any):Promise<boolean> =>{
    const {appName,appCost,appDetail} = projectData;

    const appNameResult = NameSchema.safeParse({name:appName});
    const appCostResult = AppCostSchema.safeParse({appCost:appCost});

    if(!appNameResult.success || !appCostResult.success || appDetail.length < 1 ){
        return false;
    }

    let cost = Number(appCostResult.data.appCost);

   //It's usually good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy
   //thats why we have to change appCost from dollar amount to cents
    let projectUpdate = <ReviewedProjectType>{
        paymentStatus:ProjectPayment.pending,
        appName,
        appDetail,
        appCost:cost*100,
        paymentAmount:0,
        reviewed:true
    }


    const projectUpdateResult = await updateProject({projectId:id,newData:projectUpdate});

    if(projectUpdateResult){
        revalidatePath('/dashboard/developer')
    }


   


    return projectUpdateResult;
}