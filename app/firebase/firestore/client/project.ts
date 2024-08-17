//interacts with cloud firestore


'use server';

import { db} from "@/app/firebase/firebase";
import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData,Timestamp, updateDoc, deleteField, limit } from "firebase/firestore";
import { AppDataServer,clientProjectsType,Project, ProjectState,ProjectVersions,VersionStage, VersionStage2 } from "@/app/lib/definitions";

import { v4 as uuidv4 } from 'uuid';



export const getClientProjects = async(clientId:string):Promise<null | Project[]>  => {

    console.log('data fetching new request');
    let clientProjects: Project[] = [];
    const userRef = doc(db, "users", clientId);
    
    const projectsCollectionRef = collection(db, "projects");

    const userDocSnap = await getDoc(userRef);

    let projects = userDocSnap.data()?.projects;
    
    if(!projects || projects.length === 0) return null;

    const projectsQuery = query(projectsCollectionRef, where("clientInfo.clientId", "==", clientId));

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


export const addNewProject = async (projectState:ProjectState,userProfileImage:string,email:string,id:string,data:AppDataServer):Promise<boolean> => {

  

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
            
            const newVersionId = uuidv4();
            
           
                
            // Create the new project within the transaction
            transaction.set(doc(projectsCollection, newProjectId), { 
           
                appName:data.appName,
                projectState:projectState,

                versions:[
                    {  

                        versionId:newVersionId,
                        versionStage:VersionStage.stage1,
                        projectInfo:{
                            ...data,
                            projectState,
                            createdAt:Timestamp.fromDate(new Date())
                            
                        },

                        
                    }
                ],
                clientInfo:{
                    clientEmail:email,
                    clientImage:userProfileImage,
                    clientId:id
                }

               
               
            });
    
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


export const updateNewProject = async (projectId:string,appName:string,appDetail:string,appBudget:string):Promise<boolean> =>{
    const projectDocumentRef = doc(db, "projects", projectId);

    try{
        const docSnap = await getDoc(projectDocumentRef);

        if (docSnap.exists()) {
    
            let projectData = docSnap.data() as Project;
            let versions = projectData.versions
    
            if(versions.length > 0){
            let lastVersion = versions[versions.length - 1];
            lastVersion.projectInfo.appName = appName;
            lastVersion.projectInfo.appDetail = appDetail;

             // Type guard to check if appBudget exists
            if ('appBudget' in lastVersion.projectInfo) {
            lastVersion.projectInfo.appBudget = appBudget
            }
    
    
            versions[versions.length - 1] = lastVersion;
    
            try {
                await updateDoc(projectDocumentRef, {
                    ...projectData,
                    appName:appName,
                    versions:versions
                });


                console.log('client project details updated successfully')
    
                return true;
            } catch (error) {
                console.error("Error updating project document after success payment: ", error);
            }
            }
        }
    
    
             

    }catch(e){
        console.error('could not find this document  to update',e)
    }

   
   return false;
        
}






interface UpdateClientPromoResponseType{
    error:boolean,
    message:string,
    promoCodeId?:string
}


export const updateClientPromo = async({projectId,promoCode}:{projectId:string,promoCode:string}):Promise<UpdateClientPromoResponseType> =>{
    const projectDocumentRef = doc(db, "projects", projectId);
    const promoCodeDocumentRef = doc(db, "promoCodes",promoCode);
  

    let isVersion2 = (version:ProjectVersions): version is VersionStage2 =>{
        return version.versionStage === VersionStage.stage2;
    }

    try{
        


        return await runTransaction(db, async (transaction) => {
            
            const project = await transaction.get(projectDocumentRef);
            const promo = await transaction.get(promoCodeDocumentRef);
    
            if (!promo.exists() || !project.exists()) return {
                error:true,
                message:'This promo code is invalid. We recommend contacting the partner who provided it, or you can continue without a promo code.',
            };

           

            let projectData = project.data() as Project;
            let lastVersion = projectData.versions[projectData.versions.length - 1];

            if(promo.data().used){
                return {
                    error:true,
                    message:'This promo code has been used already. We recommend contacting the partner who provided it to give you a new one, or you can continue without a promo code.',
                    
                }
            }

            if(isVersion2(lastVersion)){
                lastVersion.projectInfo.promoCodeId = promo.id;
                projectData.versions[projectData.versions.length - 1] = lastVersion;
                

                //update project version with the promocode
                transaction.update(projectDocumentRef,{versions:projectData.versions});

                //update promocode to reflect that it has been used and include project info(name,id)
                transaction.update(promoCodeDocumentRef,{
                    projectInfo:{
                    projectName:projectData.appName,
                    projectId:project.id,
                    versionId: projectData.versions[projectData.versions.length - 1].versionId
                   },
                   used:true
            
                });


                return {
                    error:false,
                    message:'',
                    promoCodeId:promoCode
                }


            }



            return {
                error:true,
                message:'this is an unexpected error,you should not be seeing it,please email us!',
              
            }
          


            

            

        
        })

       
    

    }catch(e){
        console.error(`an error happened while trying to update promocode:${e}`)
        return {
            error:true,
            message:'unexpected server error,please reload page and try again',
            
        }
    }


   

}



export const ClientDeleteProject = async(projectId:string,clientId:string):Promise<boolean>=>{
    const projectRef = doc(db, "projects", projectId);
    const clientRef = doc(db, "users", clientId);

    try{

        await runTransaction(db, async (transaction) => {
            const user = await transaction.get(clientRef);
            const project = await transaction.get(projectRef);
    
            if (!user.exists() || !project.exists()) return;

            let projects: string[] = user.data()?.projects;

            let updatedProjects = projects.filter((project:string) => project !== projectId);

            transaction.delete(projectRef)

            transaction.update(clientRef, { projects: updatedProjects.length > 0 ? updatedProjects : deleteField() });
        });

        console.log(`delete transaction for project with id:${projectId} deleted for client with id:${clientId} was successfull`)

        return true;

    }catch(e){
        console.log('delete transaction failed')
        return false;
    }

   
}



