'use client';






import AppNameImageDateFeedBackText from './top-section/AppNameImageDateFeedBackText'
import ViewProjectDetails from './middle-section/view-project-details';
import ProceedToPayment from './middle-section/proceed-to-payment';
import AppFounder from './bottom-section/app-founder';
import { ProjectPayment } from '@/app/lib/definitions';





type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appCost:number,
  appDetail:string,
  projectId:string,
  paymentStatus:ProjectPayment
  paymentAmount:number
 
  
}


export default function ProjectCardStage2({appName,clientEmail,clientImage,createdAt,appCost,appDetail,projectId,paymentAmount,paymentStatus}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
          <AppNameImageDateFeedBackText appCost={appCost} appName={appName} createdAt={createdAt}/>

          <div className='flex flex-col my-4 gap-4 px-4'>
           <ViewProjectDetails appCost={appCost} paymentAmount={paymentAmount} paymentStatus={paymentStatus} appDetail={appDetail} appName={appName} />
           {/* <ProceedToPayment  appCost={appCost} appName={appName} projectId={projectId}/> */}
            
          </div>

          <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}