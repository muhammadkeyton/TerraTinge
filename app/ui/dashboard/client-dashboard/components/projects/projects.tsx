'use client';

import { useState } from 'react';


import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../shadcn-components/tabs"



import ProjectDrawerDialog from '../../components/projects/create-project';



export default function Projects(){

  const [currentTab,setTab] = useState('In Review')
  

  
    return(
        
    
              <div className='h-full py-20'>
                   
                   
                 
                   <Tabs defaultValue={currentTab} className="h-full w-full flex flex-col items-center">
                      <TabsList className='shadow-lg gap-4 flex-none p-8 bg-slate-100 dark:bg-slate-800 '>
                        <TabsTrigger className={`py-2 px-3   ${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}> In Review</TabsTrigger>
                        <TabsTrigger className={`py-2 px-3  ${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}>In Progress</TabsTrigger>
                      </TabsList>


                      {
                        currentTab === "In Review"?
                      
                      <TabsContent className='grow  w-full flex flex-col gap-6 justify-center items-center' value="In Review">
                      
                      <h1 className='font-semibold text-lg'>No Active Projects</h1>
                      <ProjectDrawerDialog /> 

                     
                      </TabsContent>

                      :

                      <TabsContent className='grow w-full flex flex-col gap-6 justify-center items-center' value="In Progress">
                        Nothing In Progress
                      
                      </TabsContent>

                      }


                    </Tabs>


                 
                  

              </div>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

