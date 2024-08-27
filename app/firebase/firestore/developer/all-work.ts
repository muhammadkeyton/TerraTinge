//interacts with cloud firestore,this is for all projects that terratinge works on


'use server'
import { db} from "@/app/firebase/clientFirebase";

import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData,setDoc,deleteField, updateDoc, Timestamp} from "firebase/firestore";
import { Project, ProjectPayment, ProjectState, ProjectVersions, ReviewedProjectType, ReviewedProjectTypeStage3, ReviewedProjectTypeStage4, VersionStage, VersionStage3 } from "@/app/lib/definitions";

//we are trying to fetch all data for developer to view,we have to make this better this is just a starting function
export const fetchAllProjects = async():Promise<null| Project[]> => {
    let Projects: Project[] = [];
    const projectsCollectionRef = collection(db, "projects");
    const allProjects = (await getDocs(projectsCollectionRef)).docs

    allProjects.forEach((doc)=>{
        let projectId = doc.id;
        let project = {
            ...doc.data(),
            projectId:projectId
        } as Project



        

        Projects.push(project)


    });

    
    if(Projects.length > 0){
        return Projects;
    }

    return null;

    
}



export const updateProjectStage4 = async ({projectId,newData}:{projectId:string,newData:ReviewedProjectTypeStage4}):Promise<boolean> =>{
    console.log('in function update stage 4')
    const {appName,projectLink,completed} = newData;

    try{
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            let docData = docSnap.data() as Project;
            let versions = docData.versions;
            let lastVersion = versions[versions.length - 1];
            


            //type guard
            const isVersionStage4 = (version:ProjectVersions): version is VersionStage3 =>{
                return version.versionStage === VersionStage.stage4;
            }

            if(!isVersionStage4(lastVersion)) return false;
          
             
            
            

            docData.appName = appName;
            docData.projectState = completed ? ProjectState.done : ProjectState.inProgress;
            lastVersion.versionStage = completed ? VersionStage.stage4 : VersionStage.stage3;
            lastVersion.projectInfo = {
                ...lastVersion.projectInfo,
                projectLink,
                appName: appName,
                projectState:completed ? ProjectState.done : ProjectState.inProgress,
                completionDate:completed? Timestamp.fromDate(new Date()) : null,


                
            }

          

            


            versions[versions.length - 1] = lastVersion;

            

            if(completed){
                await updateDoc(docRef,{
                    ...docData,
                    versions:versions,
                    maintainance: {
                        active:docData.maintainance.active,
                        endDate:docData.maintainance.endDate
                    } 
                    
    
                });
            }else{
                await updateDoc(docRef,{
                    ...docData,
                    versions:versions,
                    maintainance: deleteField()
                }); 
            }
           

            return true;
        }



    }catch(e){
        console.log(e); 
    }

    return false;


}



export const updateProjectStage3 = async ({projectId,newData}:{projectId:string,newData:ReviewedProjectTypeStage3}):Promise<boolean> =>{
    console.log('in function update stage 3')
    const {appCost,appDetail,appName,percentage,appCostAndFee,projectLink,completed} = newData;



    


    try{
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            let docData = docSnap.data() as Project;
            let versions = docData.versions;
            let lastVersion = versions[versions.length - 1];
            let dynamicPaymentStatus:ProjectPayment;


            //type guard
            const isVersionStage3 = (version:ProjectVersions): version is VersionStage3 =>{
                return version.versionStage === VersionStage.stage3;
            }

            if(!isVersionStage3(lastVersion)) return false;
          
            dynamicPaymentStatus = (()=>{

                if('discountedAppCostAndFee' in lastVersion.projectInfo){
                    if((lastVersion.projectInfo.discountedAppCostAndFee as number - lastVersion.projectInfo.paymentAmount) === 0){
                      return ProjectPayment.paid
                  }else if ((lastVersion.projectInfo.discountedAppCostAndFee as number - lastVersion.projectInfo.paymentAmount) === lastVersion.projectInfo.discountedAppCostAndFee as number){
                      return ProjectPayment.pending;
                  }else{
                      return ProjectPayment.initial;
                  }
          
                  }else{
                    if((lastVersion.projectInfo.appCostAndFee - lastVersion.projectInfo.paymentAmount) === 0){
                      return ProjectPayment.paid
                  }else if ((lastVersion.projectInfo.appCostAndFee - lastVersion.projectInfo.paymentAmount) === lastVersion.projectInfo.appCostAndFee){
                      return ProjectPayment.pending;
                  }else{
                      return ProjectPayment.initial;
                  }
                  }
               

                
            })(); 
            
            

            docData.appName = appName;
            docData.projectState = completed ? ProjectState.done : docData.projectState;
            lastVersion.versionStage = completed ? VersionStage.stage4 : lastVersion.versionStage;



            if('discountedAppCostAndFee' in lastVersion.projectInfo){
                lastVersion.projectInfo = {
                    ...lastVersion.projectInfo,
                    appCost,
                    appDetail,
                    feePercentage:percentage,
                    discountedAppCostAndFee:appCostAndFee,
                    projectLink,
                    paymentStatus:dynamicPaymentStatus,
                    projectState: completed? ProjectState.done : lastVersion.projectInfo.projectState,
                    completionDate:completed? Timestamp.fromDate(new Date()) : null
    
                    
                }

            }else{
                lastVersion.projectInfo = {
                    ...lastVersion.projectInfo,
                    appCost,
                    appDetail,
                    feePercentage:percentage,
                    appCostAndFee,
                    projectLink,
                    paymentStatus:dynamicPaymentStatus,
                    projectState: completed? ProjectState.done : lastVersion.projectInfo.projectState,
                    completionDate:completed? Timestamp.fromDate(new Date()) : null
    
                    
                }
            }
           

          

            


            versions[versions.length - 1] = lastVersion;

            //include 3 months free maintainance for every new project created
            const maintainanceStartDate = new Date();
            const freeMaintainanceEndDate = new Date(maintainanceStartDate.getTime() + 30 * 24 * 60 * 60 * 1000);
            const endFreeMaintainanceTimeStamp = Timestamp.fromDate(freeMaintainanceEndDate);

            if(completed){
                await updateDoc(docRef,{
                    ...docData,
                    versions:versions,
                    maintainance: {
                        active:true,
                        endDate:endFreeMaintainanceTimeStamp
                    } 
                    
    
                });
            }else{
                await updateDoc(docRef,{
                    ...docData,
                    versions:versions,
                }); 
            }
           

            return true;
        }
    }catch(e){
        console.log(e);
    }
   
    
    return false;



}


export const updateProjectStage2 = async ({projectId,newData}:{projectId:string,newData:ReviewedProjectType}):Promise<boolean> =>{
    
    const {appCost,appDetail,appName,paymentAmount,paymentStatus,percentage,appCostAndFee} = newData;


    try{
        const docRef = doc(db, "projects", projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            let docData = docSnap.data() as Project;
            let versions = docData.versions;
            let lastVersion = versions[versions.length - 1];

            lastVersion.versionStage = VersionStage.stage2;

            docData.appName = appName;


             // Type guard to check if appBudget exists
             if ('appBudget' in lastVersion.projectInfo) {
                let {appBudget, ...updatedProjectInfo} = lastVersion.projectInfo;
                lastVersion.projectInfo = updatedProjectInfo;
            }


            if('promoCodeId' in lastVersion.projectInfo){
                lastVersion.projectInfo = {
                    ...lastVersion.projectInfo,
                    appCost,
                    appDetail,
                    paymentAmount,
                    paymentStatus,
                    feePercentage:percentage,
                    discountedAppCostAndFee:appCostAndFee
                
                    
                }
            }else{
                lastVersion.projectInfo = {
                    ...lastVersion.projectInfo,
                    appCost,
                    appDetail,
                    paymentAmount,
                    paymentStatus,
                    feePercentage:percentage,
                    appCostAndFee:appCostAndFee
                
                    
                }
            }
            

           


            versions[versions.length - 1] = lastVersion;


            await updateDoc(docRef,{
                ...docData,
                versions:versions

            })

            return true;
        }
    }catch(e){
        console.log(e);
    }
   
    
    return false;
}


export const DeleteProject = async(projectId:string,clientId:string):Promise<boolean>=>{
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
        })

        console.log(`delete transaction for project with id:${projectId} deleted for client with id:${clientId} was successfull`)

        return true;

    }catch(e){
        console.log('delete transaction failed')
    }

    return false;
}



export const  UpdatePartnerPayment = async(projectId:string,promoId:string,paymentAmount:number,paid:boolean):Promise<boolean> =>{
    

    const projectDocumentRef = doc(db, "projects", projectId);
    const promoCodeDocumentRef = doc(db, "promoCodes",promoId);
    
 

    // //type guard to let us know that this project is stage 4,if project is not stage we cannot do anything with partner data
    let isVersion4 = (version:ProjectVersions):version is VersionStage3 =>{
        return version.versionStage === VersionStage.stage4
    }


    try{
        


        return await runTransaction(db, async (transaction) => {
            
            const project = await transaction.get(projectDocumentRef);
            const promo = await transaction.get(promoCodeDocumentRef);
    
            if (!promo.exists() || !project.exists()) return false;

           

            let projectData = project.data() as Project;
            let promoData = promo.data();
            let lastVersion = projectData.versions[projectData.versions.length - 1];

            

            if(!isVersion4(lastVersion)) return false;


            const date = new Date();

     
            const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
                
               
               
            lastVersion.projectInfo.partnerInfo = {
                ...(lastVersion.projectInfo.partnerInfo as { email: string }),
                paymentStatus: paid? ProjectPayment.paid : ProjectPayment.pending,
                amountPaid:paymentAmount,
                paymentDate: formattedDate
            }

            
  

            //update project version with the promocode
            transaction.update(projectDocumentRef,{versions:projectData.versions});

            //update promocode to reflect that it has been used and include project info(name,id)
            transaction.update(promoCodeDocumentRef,{
                ...promoData,
                projectInfo:{
                    ...promoData.projectInfo,
                    amountPaid:paymentAmount,
                    paymentStatus:paid? ProjectPayment.paid : ProjectPayment.pending

                }

            });


            return true;

        
        });

       
    

    }catch(e){
        console.error(`an error happened while trying to update partner payment:${e}`)
        return false;
    }




}




