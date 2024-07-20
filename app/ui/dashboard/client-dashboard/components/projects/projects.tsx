




import ProjectTabs from '../../../reuseable-components/project-tabs';
import ProjectDrawerDialog from '../../components/projects/create-project';
import { DocumentData } from 'firebase/firestore';


     
    
    
     
     

     
    


     
     
     

    



export default function Projects({projects}: { projects: null | DocumentData[] }){


  
    return(
        
    
              <>
                   


                   {

                   projects ?
                   
                 
                    <ProjectTabs projects={projects}/>
                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Welcome to TerraTinge, We&apos;re ready for your app development journey.</h1>
                       <ProjectDrawerDialog /> 
                    </div>

                    }


                 
                  

              </>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

