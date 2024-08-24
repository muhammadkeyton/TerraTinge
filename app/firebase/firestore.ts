//interacts with cloud firestore


'use server';

import { db} from "@/app/firebase/clientFirebase";
import { collection,addDoc,doc,getDoc,setDoc } from "firebase/firestore";



import { ApplicationDataServer, Role } from "@/app/lib/definitions";
import { uploadDeveloperResume } from "./storage";







export const updateUserRole = async (userId:string,role:Role):Promise<void> => {
    console.log('called this function')

    try{
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            await setDoc(docRef,{role:role},{merge:true});
        } else {
            return;
        }
    }catch(e){
        console.error(e);
    }
    

}







/**
 * This function adds developer data to our firestore database,it requires a data parameter
 * @param {ApplicationDataServer} developerData  - The data received from the developer.
 
 */
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

