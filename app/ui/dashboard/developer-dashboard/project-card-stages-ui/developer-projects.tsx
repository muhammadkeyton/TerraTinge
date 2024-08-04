
import { developerProjectsType} from '@/app/lib/definitions';
import ProjectTabs from './developer-projects-tabs';
 

export default function AllWork({projects}: { projects: null | developerProjectsType}){

  
    return(
        
    

                   
                 <>
                

                   {

                   projects?
                   
                 
                    <ProjectTabs projects={projects}/>
                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Hi developer,you have no projects</h1> 
                    </div>

                    }


                   </>


                 
                  

              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}
