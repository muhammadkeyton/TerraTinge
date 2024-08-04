//interacts with cloud firestore,this is for all projects that terratinge works on


'use server'
import { db} from "@/app/firebase/firebase";

import { collection,doc,runTransaction,getDoc,query,where,getDocs, DocumentData,setDoc,deleteField, updateDoc } from "firebase/firestore";
import { Project, ReviewedProjectType, VersionStage } from "@/app/lib/definitions";

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





export const updateProject = async ({projectId,newData}:{projectId:string,newData:ReviewedProjectType}):Promise<boolean> =>{
    const {appCost,appDetail,appName,paymentAmount,paymentStatus} = newData;


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
                paymentStatus
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




