
import Image from 'next/image';




export default function ProjectCard({appName}:{appName:string}){
    // let appDetailLines = appDetail.split('\n');
    return(
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>
  
        
       
  
       <h2 className='text-xl font-bold '>{appName}</h2>
  
       <Image  className="rounded-md text-center bg-indigo-500 my-4" priority={true} unoptimized src='/project-review.gif' width={250} height={200} alt='project' />
  
  
       <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">TerraTinge Team Reviewing</code>
       
      
      
       
       
  
       
      
  
  
       
       
       
  
      
  
      <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! Our dedicated team is currently reviewing the details with great care. We understand how important this is for you. Please expect an email from us within the next 24 hours as we gather our insights and feedback. We appreciate your patience and look forward to moving ahead together!</p>
  
       
  
       {/* <>
         {appDetailLines.map((line, index) => (
            <p className='text-sm max-w-xs mt-4' key={index}>{line}</p>
          ))}
       </> */}
       
       
  
  
      </div>
    )
  }