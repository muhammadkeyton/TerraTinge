'use client';




import { useRouter } from 'next/navigation';


import AppNameDate from './top-section/AppNameDate'
import EditProject from './middle-section/edit-project';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';
import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import { montserrat } from '@/app/ui/fonts';
import { deleteProject } from '@/app/server-actions/in-app/developer/all-work';


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../shadcn-components/alert-dialog';
import { ProjectPayment, VersionStage } from '@/app/lib/definitions';


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
  versionStage:VersionStage

 
  
}


function DeveloperDeleteProjectStage1({projectId,clientId}:{projectId:string,clientId:string}){
  const router = useRouter();
  return(

  
  <AlertDialog>
  <MuiServerProvider>
   <AlertDialogTrigger>
   <Button className={`${montserrat.className} text-base bg-red-700 text-white hover:bg-red-500  p-2   rounded-xl normal-case`}>
   Delete
   </Button>
    
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
        <AlertDialogAction>
        <Button className={`${montserrat.className} text-base bg-red-700 text-white hover:bg-red-500  p-2   rounded-xl normal-case`}
          onClick={async()=>{
            if(!navigator.onLine){
              alert('hey developer,please connect your device to the internet,project deletion needs internet connection!');
              return;
            }
      
  
            const deleteResult = await deleteProject(projectId,clientId)
  
            if(deleteResult){
              router.push('/dashboard');
            }else{
              alert('hey developer,project could not be deleted!');
         
            }
          }}
        >
          Delete
        </Button>
          
        </AlertDialogAction>
      </MuiServerProvider>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
)

}


export default function DeveloperProjectCardStage3({appName,clientEmail,clientImage,paymentStatus,appCost,paymentAmount,feePercentage,createdAt,appDetail,projectId,clientId,appCostAndFee,projectLink,paymentDate,versionStage}:ProjectCardProps){
    
    

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md my-6'>


        
                
      <AppNameDate paymentDate={paymentDate} projectLink={projectLink} paymentAmount={paymentAmount} appCostAndFee={appCostAndFee} feePercentage={feePercentage} appCost={appCost} appName={appName} createdAt={createdAt}/>
      

     
        
      <div className='flex flex-row my-4 justify-between space-x-4'>

        
        <ViewSubmittedDetails paymentAmount={paymentAmount} paymentStatus={paymentStatus} appCostAndFee={appCostAndFee}  appDetail={appDetail} appName={appName} />
        
        
        
        {paymentStatus !== ProjectPayment.processing && <EditProject versionStage={versionStage} projectLink={projectLink} appCost={`${appCost/100}`} percentage={`${ Math.round(((feePercentage-1)*100))}`}  appDetail={appDetail} appName={appName} projectId={projectId}/>}



        {paymentStatus !== ProjectPayment.processing && <DeveloperDeleteProjectStage1 projectId={projectId} clientId={clientId}/>}
        
      </div>

      

      <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}