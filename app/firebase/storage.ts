//interacts with cloud storage

'use server';

import { ref,uploadBytes } from "firebase/storage";
import { storage} from "@/app/firebase/clientFirebase";
import {v4 as generateId} from 'uuid';








export const uploadDeveloperResume = async(resume:FormDataEntryValue | null):Promise<string | null> =>{
    const resumeRefId = generateId();
    const resumeRef = ref(storage, `developerResumes/${resumeRefId}`);

    if(resume instanceof Blob){
        try{
            await uploadBytes(resumeRef,resume)
            return resumeRefId
        }catch(e){
            console.log(e)
        }
        
    }


    return null;
    
      
    
    
}
