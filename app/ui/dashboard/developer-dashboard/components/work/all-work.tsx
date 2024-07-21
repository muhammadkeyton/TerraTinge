
import { Role } from '@/app/lib/definitions';
import ProjectTabs from '../../../reuseable-components/project-tabs';

import { DocumentData } from 'firebase/firestore';

export default function AllWork({projects,role}: { projects: undefined | DocumentData[],role:Role }){

  
    return(
        
    
              <>
                   


                   {

                   projects !== undefined ?
                   
                 
                    <ProjectTabs projects={projects} role={role}/>
                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Hi developer,you have no projects</h1> 
                    </div>

                    }


                 
                  

              </>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}
