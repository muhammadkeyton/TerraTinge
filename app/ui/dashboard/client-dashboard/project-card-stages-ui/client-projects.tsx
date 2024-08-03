
'use client';



import { clientProjectsType } from '@/app/lib/definitions';

import CreateOrEditProject from './stage1/middle-section/create-edit-project';
import ClientProjectTabs from './client-project-tabs';


    

     

export default function ClientProjects({projects}: { projects: null | clientProjectsType }){
   
   
  
    return(
        
    
         
                   <>
                   


                   {

                   projects ?
                   
                    
                     <ClientProjectTabs projects={projects}/>
                  

                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Welcome to TerraTinge, We&apos;re ready for your app development journey.</h1>
                       <CreateOrEditProject /> 
                    </div>

                    }
                    </>

                 
                  

       
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

