//interacts with cloud firestore


'use server';

import { db} from "@/app/firebase/firebase";
import { collection,addDoc } from "firebase/firestore";


import { ApplicationDataServer } from "../lib/definitions";
import { uploadDeveloperResume } from "./storage";



export const addDeveloperApplication = async (data:ApplicationDataServer):Promise<boolean> => {
    const devAppCollection = collection(db,'devApplications');
   
    const resume = data.resume.get('file');




    try{

        const resumeId = await uploadDeveloperResume(resume);
        
        if(resumeId){
            const newDevApplication = await addDoc(devAppCollection,{
                name:data.name,
                email:data.email,
                about:data.about,
                resume:resumeId
            });
            console.log(`new dev application added with id:${newDevApplication.id}`)

            return true;
        }
        


        

    }catch(e){
        console.error(e);
    }

    

    return false;
    

    
}

