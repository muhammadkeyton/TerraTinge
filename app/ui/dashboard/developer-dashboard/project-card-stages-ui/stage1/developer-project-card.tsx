'use client';






import AppNameDate from './top-section/AppNameDate'
import EditProject from './middle-section/edit-project';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';





type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appBudget:string,
  appDetail:string,
  projectId:string,
 
  
}


export default function DeveloperProjectCardStage1({appName,clientEmail,clientImage,createdAt,appBudget,appDetail,projectId}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
      <AppNameDate appName={appName} createdAt={createdAt}/>

      <div className='flex flex-row my-4 justify-between'>
        <ViewSubmittedDetails appBudget={appBudget} appDetail={appDetail} appName={appName} />
        <EditProject  appDetail={appDetail} appName={appName} projectId={projectId}/>
        
      </div>

      <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}