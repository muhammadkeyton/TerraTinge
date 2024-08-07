'use client';






import AppNameImageDateFeedBackText from './top-section/AppNameImageDateFeedBackText'
import ViewProjectDetails from './middle-section/view-project-details';
import AppFounder from './bottom-section/app-founder';
import { ProjectPayment } from '@/app/lib/definitions';





type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appCostAndFee:number,
  appDetail:string,
  paymentStatus:ProjectPayment
  paymentAmount:number,
  projectLink:string | null
 
  
}


export default function ProjectCardStage3({appName,clientEmail,clientImage,createdAt,appCostAndFee,appDetail,paymentAmount,paymentStatus,projectLink}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
          <AppNameImageDateFeedBackText projectLink={projectLink} appName={appName} createdAt={createdAt}/>

          <div className='my-4 px-4'>
           <ViewProjectDetails appCostAndFee={appCostAndFee} paymentAmount={paymentAmount} paymentStatus={paymentStatus} appDetail={appDetail} appName={appName} /> 
          </div>

          <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}