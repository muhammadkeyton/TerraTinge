'use client';






import AppNameImageDateFeedBackText from './top-section/AppNameImageDateFeedBackText'
import CreateOrEditProject from './middle-section/create-edit-project';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';


import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';



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
import { montserrat } from '@/app/ui/fonts';
import { useRouter } from 'next/navigation';
import { clientDeleteProject } from '@/app/server-actions/in-app/client/project';


type ProjectCardProps = {
  appName:string,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appBudget:string,
  appDetail:string,
  projectId:string,
  clientId:string
 
  
}







function ClientDeleteProjectStage1({projectId,clientId}:{projectId:string,clientId:string}){
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
  <AlertDialogContent className='max-w-sm md:max-w-lg  bg-white dark:bg-black '>
    <AlertDialogHeader>
      <AlertDialogTitle>Do you really want to delete this project?</AlertDialogTitle>
      <AlertDialogDescription>
      Are you sure you want to delete this project? This action cannot be undone and will permanently remove all associated data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <MuiServerProvider>
        <AlertDialogAction>
        <Button className={`${montserrat.className} text-base bg-red-700 text-white hover:bg-red-500  p-2   rounded-xl normal-case`}
          onClick={async()=>{
            if(!navigator.onLine){
              alert('hello,please connect your device to the internet,project deletion needs internet connection!');
              return;
            }
      
  
            const deleteResult = await clientDeleteProject(projectId,clientId)
  
            if(deleteResult){
              router.push('/dashboard');
            }else{
              alert('hello,project could not be deleted!,try again');
         
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


export default function ProjectCardStage1({appName,clientEmail,clientImage,createdAt,appBudget,appDetail,projectId,clientId}:ProjectCardProps){

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
          <AppNameImageDateFeedBackText appName={appName} createdAt={createdAt}/>

          <div className='flex flex-row my-4 justify-between'>
           <ViewSubmittedDetails appBudget={appBudget} appDetail={appDetail} appName={appName} />
          <CreateOrEditProject appBudget={appBudget} appDetail={appDetail} appName={appName} projectId={projectId}/>
          <ClientDeleteProjectStage1 clientId={clientId} projectId={projectId}/>
          </div>

          <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}