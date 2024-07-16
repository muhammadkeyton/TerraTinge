'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shadcn-components/tabs"



import ProjectDrawerDialog from '../../components/projects/create-project';
import { DocumentData } from 'firebase/firestore';



function ProjectCard({appName,appDetail,appBudget}:{appName:string,appDetail:string,appBudget:string}){
  return(
    <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>

      
     

     <h2 className='text-xl font-bold '>{appName}</h2>

     <div className='border-2 flex rounded-md justify-center my-4 py-2'>
     <Image  className="rounded-md text-center bg-indigo-500" priority={true} unoptimized src='/project-review.gif' width={200} height={200} alt='project' />

     </div>


     <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">TerraTinge Team Reviewing</code>
     
    
    
     
     

     
    


     
     
     

    

     <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! Our dedicated team is currently reviewing the details with great care. We understand how important this is for you. Please expect an email from us within the next 24 hours as we gather our insights and feedback. We appreciate your patience and look forward to moving ahead together!</p>
     
     


    </div>
  )
}

export default function Projects({projects}: { projects: null | DocumentData[] }){

  const [currentTab,setTab] = useState('In Review')
  
    return(
        
    
              <>
                   


                   {

                   projects ?
                   
                 
                   <Tabs defaultValue={currentTab} className="h-full overflow-y-auto p-2 flex flex-col gap-4 items-center ">
                      <TabsList className='shadow-lg gap-4 flex-none p-6 bg-slate-100 dark:bg-slate-800 '>
                    
                        <TabsTrigger className={`   ${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}><span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>1</span>In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}><span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>0</span>In Progress</TabsTrigger>
                      </TabsList>


                      {
                        currentTab === "In Review"?
                      
                      <TabsContent className='grow w-full flex flex-col justify-center items-center' value="In Review">
                      

                      
                      <ProjectCard appName={projects[0]?.appName} appBudget={projects[0]?.appBudget} appDetail={projects[0]?.appDetail}/>
                    
                      

                     
                      </TabsContent>

                      :

                      <TabsContent className='grow w-full flex flex-col gap-6 justify-center items-center' value="In Progress">
                        No project in Progress
                      
                      </TabsContent>

                      }


                    </Tabs>

                    :

                    <div className=' h-full px-2 flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-md text-center'>Welcome to TerraTinge😊, We&apos;re ready for your app development journey.</h1>
                       <ProjectDrawerDialog /> 
                    </div>

                    }


                 
                  

              </>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

