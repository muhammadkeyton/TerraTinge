'use client';



import { useState } from 'react';
import { useRouter } from 'next/navigation';

import AppNameDate from './top-section/AppNameDate'
import EditProject from './middle-section/edit-project';
import ViewSubmittedDetails from './middle-section/view-submitted-details';
import AppFounder from './bottom-section/app-founder';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import { montserrat } from '@/app/ui/fonts';
import { deleteProject } from '@/app/server-actions/in-app/developer/all-work';


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


export default function DeveloperProjectCardStage1({appName,clientEmail,clientImage,createdAt,appBudget,appDetail,projectId,clientId}:ProjectCardProps){
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    return (
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>


        
                
      <AppNameDate appName={appName} createdAt={createdAt}/>
      

      {
          !loading?
        
      <div className='flex flex-row my-4 justify-between space-x-4'>

        
        <ViewSubmittedDetails appBudget={appBudget} appDetail={appDetail} appName={appName} />
        <EditProject  appDetail={appDetail} appName={appName} projectId={projectId}/>

        <MuiServerProvider>
        <Button className={`${montserrat.className} text-base bg-red-700 text-white hover:bg-red-500  p-1   rounded-xl normal-case`} 
        onClick={async()=>{
          if(!navigator.onLine){
            alert('hey developer,please connect your device to the internet,project deletion needs internet connection!');
            return;
          }
          setLoading(true)

          const deleteResult = await deleteProject(projectId,clientId)

          if(deleteResult){
            router.push('/dashboard');
          }else{
            alert('hey developer,project could not be deleted!');
            setLoading(false)
          }
        }}>
          Delete
        </Button>
        </MuiServerProvider>
        
      </div>

      :

      <MuiServerProvider>
          <div className='flex justify-center items-center my-12'>
          <CircularProgress className='text-indigo-700' size={60}/>
          </div>
      </MuiServerProvider>

      }

      <AppFounder clientEmail={clientEmail} clientImage={clientImage} />
                 
                

        
        
      </div>
    )
   
}