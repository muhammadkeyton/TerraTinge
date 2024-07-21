
import Image from 'next/image';
import { Role } from '@/app/lib/definitions';
import Button from '@mui/material/Button';
import MuiServerProvider from '../../mui-providers/mui-server-provider';
import { montserrat } from '../../fonts';
export default function ProjectCard({appName,role}:{appName:string,role:Role}){
    // let appDetailLines = appDetail.split('\n');
   

    return(
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>
  
        
       
  
       <h2 className={`text-xl font-bold ${role === Role.developer && 'mb-4'}`}>{appName}</h2>


       {
        role === Role.client
        &&
       <Image  className="rounded-md text-center bg-indigo-500 my-4" priority={true} unoptimized src='/project-review.gif' width={250} height={200} alt='project' />

       }
  
  
       <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">{role === Role.client? 'TerraTinge Team Reviewing' :'Awaiting Review'}</code>
       
      
      
       
       
  
       
      
  
  
       
       
       
  
      
      {
        (()=>{
          switch (role) {
            case Role.client:{
              return( <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! Our dedicated team is currently reviewing the details with great care. We understand how important this is for you. Please expect an email from us within the next 24 hours as we gather our insights and feedback. We appreciate your patience and look forward to moving ahead together!</p>)
            }


            case Role.developer:{
              return (
                

                <MuiServerProvider>
                 <div className='flex flex-row justify-around items-center space-x-4 my-12'>
                 <Button variant="text" className={`${montserrat.className} text-indigo-700`}>View</Button>
                 <Button variant="contained" className={`${montserrat.className} bg-indigo-700 text-white`}>Edit</Button>
                 <Button variant="text" className='text-red-600'>Delete</Button>
                 </div>
                </MuiServerProvider>
                
                 
                
               
               
              )
            }
              
              
          
            default:
              break;
          }
        })()
      }
     
  
       
  
       {/* <>
         {appDetailLines.map((line, index) => (
            <p className='text-sm max-w-xs mt-4' key={index}>{line}</p>
          ))}
       </> */}
       
       
  
  
      </div>
    )
  }