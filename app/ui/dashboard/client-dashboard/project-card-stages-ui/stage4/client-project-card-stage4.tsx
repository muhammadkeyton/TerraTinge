'use client';






import AppNameImageDateFeedBackText from './top-section/AppNameImageDateFeedBackText'
import ViewProjectDetails from './middle-section/view-project-details';
import ProceedToPayment from './middle-section/proceed-to-payment';
import AppFounder from './bottom-section/app-founder';
import { ProjectPayment } from '@/app/lib/definitions';
import { Timestamp } from 'firebase/firestore';





type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appCostAndFee:number,
  appDetail:string,
  paymentStatus:ProjectPayment
  paymentAmount:number,
  completionDate:string
  paymentDate:string,
  projectLink:string | null,
  projectId:string,
  maintainance: {
    active:boolean,
    endDate:Timestamp | Date | null
  }
  
}


export default function ProjectCardStage4({appName,clientEmail,clientImage,createdAt,appCostAndFee,appDetail,paymentAmount,paymentStatus,projectLink,paymentDate,completionDate,maintainance,projectId}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
          <AppNameImageDateFeedBackText paymentAmount={paymentAmount} maintainanceEndDate={maintainance.endDate as Date} completionDate={completionDate}    appCostAndFee={appCostAndFee} paymentDate={paymentDate} projectLink={projectLink} appName={appName} createdAt={createdAt}/>

          <div className='my-4 px-4'>
            <ViewProjectDetails appCostAndFee={appCostAndFee} paymentAmount={paymentAmount} paymentStatus={paymentStatus} appDetail={appDetail} appName={appName} />

            {((appCostAndFee - paymentAmount)!==0) && <ProceedToPayment paymentAmount={paymentAmount} appCostAndFee={appCostAndFee} appName={appName} projectId={projectId}/>}
          </div>

          <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}