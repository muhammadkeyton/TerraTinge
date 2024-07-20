'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn-components/tabs"

import ProjectCard from './project-card';


import { DocumentData } from 'firebase/firestore';





export default function ProjectTabs({projects}: { projects:DocumentData[] }){
    const [currentTab,setTab] = useState('In Review')



    return (
        <Tabs defaultValue={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-4'>
                    
                        <TabsTrigger className={`   ${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}><span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>1</span>In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}>In Progress</TabsTrigger>
                        <TabsTrigger className={`   ${currentTab === 'Completed' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="Completed" onClick={()=> setTab("Completed")}>15 Done</TabsTrigger>
                      </TabsList>



                      <TabsContent className='grow w-full flex flex-col justify-center items-center' value={currentTab}>

                      {
                        (()=>{

                            switch (currentTab) {
                                case 'In Review':{
                                    return  (
                                    
                                     <ProjectCard appName={projects[0]?.appName} />
                                   
                                    )
                                }


                                case 'In Progress':{
                                    return 'nothing in progress'
                                }


                                case 'Completed':{
                                    return 'nothing completed'
                                }


                                default:{
                                    throw new Error(`the tab state is unknown ${currentTab}`)
                                }
                                    
                                    
                            
                            }

                        })()
                      }

                    </TabsContent>


                    

        </Tabs>

    )
}