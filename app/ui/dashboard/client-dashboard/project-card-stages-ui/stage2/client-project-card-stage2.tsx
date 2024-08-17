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
  appCostAndFee:number,
  appDetail:string,
  projectId:string,
  paymentStatus:ProjectPayment,
  promo?:string
 
  
}


export default function ProjectCardStage2({appName,clientEmail,clientImage,createdAt,appCostAndFee,appDetail,projectId,paymentStatus,promo}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
          <AppNameImageDateFeedBackText appCostAndFee={appCostAndFee} appName={appName} createdAt={createdAt}/>

          <div className='flex flex-col my-4 gap-4 px-4'>
           <ViewProjectDetails appCostAndFee={appCostAndFee}  paymentStatus={paymentStatus} appDetail={appDetail} appName={appName} />
           <ProceedToPayment promo={promo} appCostAndFee={appCostAndFee} appName={appName} projectId={projectId}/>
            
          </div>

          <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}