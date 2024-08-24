'use client';




import { useRouter } from 'next/navigation';

import {useState} from 'react';
import AppNameDate from './top-section/AppNameDate'
// import EditProject from './middle-section/edit-project';
// import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';
import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import { montserrat } from '@/app/ui/fonts';
import { deleteProject } from '@/app/server-actions/in-app/developer/all-work';

import CircularProgress from '@mui/material/CircularProgress';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../shadcn-components/alert-dialog';
import { ProjectPayment, VersionStage } from '@/app/lib/definitions';
import { Timestamp } from 'firebase/firestore';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import EditProject from './middle-section/edit-project';
import React, { Dispatch, SetStateAction } from 'react';


type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appDetail:string,
  projectId:string,
  clientId:string,
  appCost:number,
  feePercentage:number,
  appCostAndFee:number,
  paymentAmount:number,
  paymentStatus:ProjectPayment,
  projectLink:string | null,
  paymentDate:string,
  completionDate:string,
  versionStage:VersionStage
  maintainance: {
    active:boolean,
    endDate:Timestamp | Date | null
  },
  promo?:string,
  discountedAppCostAndFee?:number,
  partnerInfo?:{
    email:string,
    paymentStatus:ProjectPayment,
    amountPaid?:number
    paymentDate?: string
  },

 
  
}


function DeveloperDeleteProjectStage4({projectId,clientId,setLoading}:{projectId:string,clientId:string,setLoading:Dispatch<SetStateAction<boolean>>}){
  const router = useRouter();
  return(

  
  <AlertDialog>
  <MuiServerProvider>
   <AlertDialogTrigger className='text-base bg-red-700 text-white hover:bg-red-500  p-2   rounded-xl'>
  
   Delete

    
    </AlertDialogTrigger>
  </MuiServerProvider>
  <AlertDialogContent className='max-w-sm md:max-w-lg bg-white dark:bg-black '>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you really want to delete this project?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this project
        and remove it&apos;s data from our database.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <MuiServerProvider>
       
    
        <Button className={`${montserrat.className} text-base bg-red-700 text-white hover:bg-red-500  p-2   rounded-xl normal-case`}
          onClick={async()=>{
            if(!navigator.onLine){
              alert('hey developer,please connect your device to the internet,project deletion needs internet connection!');
              return;
            }


            setLoading(true);
      
  
            const deleteResult = await deleteProject(projectId,clientId)
  
            if(deleteResult){
              setLoading(false)
              router.push('/dashboard');
            }else{
              alert('hey developer,project could not be deleted!');
              setLoading(false)
         
            }
          }}
        >
          Delete
        </Button>
          
        
      </MuiServerProvider>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
)

}


export default function DeveloperProjectCardStage4({appName,clientEmail,clientImage,paymentStatus,appCost,paymentAmount,feePercentage,createdAt,appDetail,projectId,clientId,appCostAndFee,projectLink,paymentDate,versionStage,maintainance,completionDate,promo,discountedAppCostAndFee,partnerInfo}:ProjectCardProps){
    
    const [loading,setLoading] = useState(false);

    return (


      <>
        


        {

          !loading?


            <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md my-6'>

            <AppNameDate projectId={projectId} partnerInfo={partnerInfo} discountedAppCostAndFee={discountedAppCostAndFee} promo={promo} maintainanceEndDate={maintainance.endDate as Date} completionDate={completionDate} paymentDate={paymentDate} projectLink={projectLink} paymentAmount={paymentAmount} appCostAndFee={appCostAndFee} feePercentage={feePercentage} appCost={appCost} appName={appName} createdAt={createdAt}/>
          
            <div className='flex flex-row my-4 justify-between space-x-4'>

              
              <ViewSubmittedDetails  promo={promo} discountedAppCostAndFee={discountedAppCostAndFee} paymentAmount={paymentAmount} paymentStatus={paymentStatus} appCostAndFee={appCostAndFee}  appDetail={appDetail} appName={appName} />
              
              
              
              {paymentStatus !== ProjectPayment.processing && <EditProject versionStage={versionStage} projectLink={projectLink} appCost={`${appCost/100}`} percentage={`${ Math.round(((feePercentage-1)*100))}`}  appDetail={appDetail} appName={appName} projectId={projectId}/>}



              {paymentStatus !== ProjectPayment.processing && <DeveloperDeleteProjectStage4 setLoading={setLoading} projectId={projectId} clientId={clientId}/>}
              
            </div>

            

            <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                      
                      

              
              
            </div>


            :



            <MuiServerProvider>
              <div className='flex justify-center items-center my-12'>
              <CircularProgress className='text-indigo-700' size={60}/>
              </div>
            </MuiServerProvider>




        }
        



      
      
      
      
      
      
      </>
      
    )
   
}