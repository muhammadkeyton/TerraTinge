'use client';



import AppNameImageDateFeedBackText from './top-section/AppNameImageDateFeedBackText'
import CreateOrEditProject from './middle-section/create-edit-project';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';



type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appBudget:string,
  appDetail:string,
  projectId?:string
  
}


export default function ProjectCardStage1({appName,clientEmail,clientImage,createdAt,appBudget,appDetail,projectId}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>
        <AppNameImageDateFeedBackText appName={appName} createdAt={createdAt}/>

        <div className='flex flex-row my-4 justify-between'>
          <CreateOrEditProject appBudget={appBudget} appDetail={appDetail} appName={appName} projectId={projectId}/>
          <ViewSubmittedDetails appBudget={appBudget} appDetail={appDetail} appName={appName} />
        </div>

        <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
        
      </div>
    )
   
}