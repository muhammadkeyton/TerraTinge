'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shadcn-components/tabs"



import ProjectDrawerDialog from '../../components/projects/create-project';
import { DocumentData } from 'firebase/firestore';



function ProjectCard({appName}:{appName:string}){
  return(
    <div className='bg-white dark:bg-neutral-900 flex flex-col items-center p-6 rounded-md shadow-md'>

     <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm mb-4">Team Reviewing</code> 
     
     <Image  className="rounded-md mb-4 text-center border-2" priority={true} unoptimized src='/project-review.gif' width={200} height={150} alt='project' />

    
     
    <h2 className='text-xl font-bold mb-4'>{appName}</h2>
      
     
     

    

     <p className='text-sm'>created Today</p>
     


    </div>
  )
}

export default function Projects({projects}: { projects: null | DocumentData[] }){

  const [currentTab,setTab] = useState('In Review')
  
 
    return(
        
    
              <div className='h-full py-20 lg:py-6'>
                   


                   {

                   projects ?
                   
                 
                   <Tabs defaultValue={currentTab} className="flex flex-col items-center  h-full">
                      <TabsList className='shadow-lg gap-4 flex-none p-8 bg-slate-100 dark:bg-slate-800 '>
                        <TabsTrigger className={`   ${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}><span className='mr-2 bg-green-500 p-2 text-white rounded-md flex items-center justify-center'>1</span> In Review</TabsTrigger>
                        <TabsTrigger className={`py-2 px-3  ${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}><span className='mr-1 p-2  rounded-md flex items-center justify-center'>0</span>In Progress</TabsTrigger>
                      </TabsList>


                      {
                        currentTab === "In Review"?
                      
                      <TabsContent className='grow w-full flex flex-col gap-6 justify-center items-center' value="In Review">
                      

                      
                      <ProjectCard appName={projects[0]?.appName}/>

                     
                      </TabsContent>

                      :

                      <TabsContent className='grow w-full flex flex-col gap-6 justify-center items-center' value="In Progress">
                        Nothing In Progress
                      
                      </TabsContent>

                      }


                    </Tabs>

                    :

                    <div className=' h-full flex flex-col items-center justify-center gap-6'>
                       <h1 className='font-semibold text-lg'>No Active Projects</h1>
                       <ProjectDrawerDialog /> 
                    </div>

                    }


                 
                  

              </div>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

