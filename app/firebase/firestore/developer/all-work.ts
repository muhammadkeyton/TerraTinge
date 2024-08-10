//interacts with cloud firestore,this is for all projects that terratinge works on


'use server'
import { db} from "@/app/firebase/firebase";

import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData,setDoc,deleteField, updateDoc, Timestamp} from "firebase/firestore";
import { Project, ProjectPayment, ProjectState, ProjectVersions, ReviewedProjectType, ReviewedProjectTypeStage3, VersionStage, VersionStage3 } from "@/app/lib/definitions";

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
                if((appCostAndFee - lastVersion.projectInfo.paymentAmount) === 0){
                    return ProjectPayment.paid
                }else if ((appCostAndFee - lastVersion.projectInfo.paymentAmount) === appCostAndFee){
                    return ProjectPayment.pending;
                }else if (lastVersion.projectInfo.paymentAmount > 0 && lastVersion.projectInfo.paymentAmount < appCostAndFee){
                    return ProjectPayment.initial;
                }else{
                    return lastVersion.projectInfo.paymentStatus;
                }

                
            })(); 
            
            

            docData.appName = appName;
            docData.projectState = completed ? ProjectState.done : docData.projectState;
            lastVersion.versionStage = completed ? VersionStage.stage4 : lastVersion.versionStage;
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

          

            


            versions[versions.length - 1] = lastVersion;

            //include 3 months free maintainance for every new project created
            const maintainanceStartDate = new Date();
            const freeMaintainanceEndDate = new Date(maintainanceStartDate.getTime() + 90 * 24 * 60 * 60 * 1000);
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
            lastVersion.projectInfo = {
                ...lastVersion.projectInfo,
                appCost,
                appDetail,
                paymentAmount,
                paymentStatus,
                feePercentage:percentage,
                appCostAndFee
                
            }

            // Type guard to check if appBudget exists
            if ('appBudget' in lastVersion.projectInfo) {
                let {appBudget, ...updatedProjectInfo} = lastVersion.projectInfo;
                lastVersion.projectInfo = updatedProjectInfo;
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




