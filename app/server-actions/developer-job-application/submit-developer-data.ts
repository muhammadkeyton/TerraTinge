
'use server';

import { NameSchema,EmailSchema } from "@/app/lib/data-validation";
import { ApplicationDataServer } from "@/app/lib/definitions";

import { addDeveloperApplication } from "@/app/firebase/firestore";

export const submitDeveloperData = async(data:ApplicationDataServer):Promise<boolean | void> => {
   
    const {name,email,about,resume} = data;

    const nameResult = NameSchema.safeParse({name:name});
    const emailResult = EmailSchema.safeParse({email:email});
    const badAboutData = about.length > 1000 || about.length < 1;
    const resumeResult = resume.get('file');

   

    if (!nameResult.success || !emailResult.success || badAboutData || !(resumeResult instanceof File)){
        console.error('server data not accepted')
        return false;
    }else{
        if(resumeResult.type != 'application/pdf'){
            console.error('not resume pdf')
            return false;
        }



        //save the developer application resume in storage and save all info in a collection called:DeveloperApplications
        return await addDeveloperApplication(data);
    }


   

    
} 