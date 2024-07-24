'use client';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn-components/tabs"

import ProjectCard from './project-card';


import { DocumentData } from 'firebase/firestore';
import { Role } from '@/app/lib/definitions';





export default function ProjectTabs({projects,role}: { projects:DocumentData[],role:Role}){
    const [currentTab,setTab] = useState('In Review')



    return (
        <Tabs defaultValue={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-4'>
                    
                        <TabsTrigger className={`${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}><span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>1</span>In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}>In Progress</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'Completed' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="Completed" onClick={()=> setTab("Completed")}>Done</TabsTrigger>
                      </TabsList>



                      <TabsContent className='grow w-full flex flex-col justify-center items-center' value={currentTab}>

                      {
                        (()=>{

                            switch (currentTab) {
                                case 'In Review':{
                                    
                                    return  (
                                    
                                     <ProjectCard 
                                     appName={projects[0]?.appName} 
                                     clientEmail={projects[0]?.clientEmail} 
                                     clientImage={projects[0]?.clientImage} 
                                     createdAt={projects[0]?.createdAt} 
                                     role={role} 
                                     appBudget={projects[0]?.appBudget} 
                                     appDetail={projects[0]?.appDetail} 
                                     projectId={projects[0]?.projectId}
                                     reviewed = {projects[0]?.reviewed}
                                     appCost={projects[0]?.appCost}
                                     paymentAmount={projects[0]?.appCost}
                                     
                                     />
                                   
                                    )
                                }


                                case 'In Progress':{
                                    return 'You Have No App Development In Progress'
                                }


                                case 'Completed':{
                                    return 'All Your Completed Apps Will Appear Here'
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