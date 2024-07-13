'use server';

import { AppDataServer } from "@/app/lib/definitions";

import { NameSchema } from "@/app/lib/data-validation";

import { auth } from "@/auth";

import { addNewProject} from "@/app/firebase/firestore/client/project";

import { revalidatePath } from 'next/cache';










/**
 * This function validates the project data and calls our database transaction  
 * @param {AppDataServer} data  - The data received from the client when submitting project for review.
 
 */
export const createNewProject = async (data:AppDataServer):Promise<boolean>=>{

    const session = await auth();
    

    const appNameResult = NameSchema.safeParse({name:data.appName});
    const appDetail = data.appDetail
    const appBudget = data.appBudget;

    if(!appNameResult.success || appDetail.length < 1 || appBudget.length < 1){
        return false;
    }

     //data has been validated and is ok,now we can get the client id and pass to the firestore transaction
    const user = session?.user?.id as string;

    const newProjectCreated = await addNewProject(user,{appName:appNameResult.data.name,appDetail,appBudget});

    if(newProjectCreated){
        revalidatePath('/dashboard/client')
        
    }
    return newProjectCreated;





    




    
    


   

    
}