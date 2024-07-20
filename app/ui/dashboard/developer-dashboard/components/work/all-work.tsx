
import ProjectTabs from '../../../reuseable-components/project-tabs';

import { DocumentData } from 'firebase/firestore';

export default function AllWork({projects}: { projects: null | DocumentData[] }){


  
    return(
        
    
              <>
                   


                   {

                   projects ?
                   
                 
                    <ProjectTabs projects={projects}/>
                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Hi developer,you have no projects</h1> 
                    </div>

                    }


                 
                  

              </>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}
