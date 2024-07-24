//interacts with cloud firestore


'use server';

import { db} from "@/app/firebase/firebase";
import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData } from "firebase/firestore";
import { AppDataServer,Project,ProjectPayment } from "@/app/lib/definitions";





export const getClientProjects = async(clientId:string):Promise<null | DocumentData[]>  => {

    console.log('data fetching new request');
    let clientProjects: DocumentData[] = [];
    const userRef = doc(db, "users", clientId);
    
    const projectsCollectionRef = collection(db, "projects");

    const userDocSnap = await getDoc(userRef);

    let projects = userDocSnap.data()?.projects;
    
    if(!projects || projects.length === 0) return null;

    const projectsQuery = query(projectsCollectionRef, where("clientId", "==", clientId));

    const projectsQuerySnapshot = (await getDocs(projectsQuery)).docs;

    projectsQuerySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let projectId = doc.id;
        
        let project = {
            ...doc.data(),
            projectId:projectId
        } as Project;
      
        clientProjects.push(project);

        
    });

    return clientProjects;




}

/**
 * This function runs a firestore transaction that creates a project and adds project id to user and user id to project,both should succeed or fail together
 * @param {AppDataServer} data  - The data received from the client when submitting project for review.
 * @param {id} id  - the currently logged in user's id
 
 */


export const addNewProject = async (reviewed:boolean,userProfileImage:string,email:string,id:string,data:AppDataServer):Promise<boolean> => {

    console.log(data)

    try {
        const userRef = doc(db, "users", id);
        const projectsCollection = collection(db,'projects');
    
        await runTransaction(db, async (transaction) => {
            const user = await transaction.get(userRef);
    
            if (!user.exists()) return;
    
            let projects = user.data()?.projects;
    
            if (!projects) {
                projects = [];
            }
    
            // Generate a unique ID for the new project
            const newProjectId = doc(projectsCollection).id;
            

            //we need the date when this project was created
            const date = new Date();
            const options: Intl.DateTimeFormatOptions = { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            };
            const formattedDate = date.toLocaleDateString('en-US', options);
           
                
            // Create the new project within the transaction
            transaction.set(doc(projectsCollection, newProjectId), { ...data, clientId: user.id,paymentStatus:ProjectPayment.pending,clientEmail:email,clientImage:userProfileImage,createdAt:formattedDate,reviewed:reviewed});
    
            projects.push(newProjectId);
    
            transaction.update(userRef, { projects: projects });

            
            
        });

        console.log('new project transaction committed successfully')

        return true;


       

        
    } catch (error) {
        console.log('new project transaction all failed')
        return false;
    
        
    }


   



   
    


   



  


    
}


