'use client';

import { useState,useEffect} from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/tabs"





import { clientProjectsType, VersionStage } from '@/app/lib/definitions';
import ProjectCardStage1 from './stage1/project-card-stage1';





export default function ClientProjectTabs({projects}: { projects:clientProjectsType}){
    const {inReview,inProgress,done}   = projects;
    
    const [currentTab,setTab] = useState<string>('');

    useEffect(() => {
        if (inReview !== null && inProgress === null) {
            setTab('InReview');
        } else if (inReview === null && inProgress !== null) {
            setTab('InProgress');
        } else if (inReview === null && inProgress === null) {
            setTab('done');
        }
    }, []);
    
   
   console.log(inProgress)
console.log(currentTab)

    return (
        <Tabs value={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-4'>
                    
                        <TabsTrigger className={`${currentTab === 'InReview' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InReview" onClick={()=> setTab("InReview")}>{inReview && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>1</span>} In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'InProgress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InProgress" onClick={()=> setTab("InProgress")}>{inProgress && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>1</span>}In Progress</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'done' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="done" onClick={()=> setTab("done")}>Done</TabsTrigger>
                      </TabsList>



                      <TabsContent className='grow w-full flex flex-col justify-center items-center' value={currentTab}>

                      {
                        (()=>{

                            switch (currentTab) {
                                case 'InReview':{
                                    const version = inReview?.versions[inReview?.versions.length - 1];
                                    
                                    if(version?.versionStage === VersionStage.stage1){
                                        return <ProjectCardStage1 projectId={inReview?.projectId} appBudget={version.projectInfo.appBudget} appName={version.projectInfo.appName} appDetail={version.projectInfo.appDetail} clientEmail={inReview?.clientInfo.clientEmail as string} clientImage={inReview?.clientInfo.clientImage as string} createdAt={version.projectInfo.createdAt as string}/>
                                    }


                                    return 'this is not stage 1 need to check the code';
                                    

                                
                                }


                                case 'InProgress':{
                                   return 'nothing in progress'
                                }


                                case 'done':{
                                    
                                return (
                    
                                    <h1 className='font-semibold text-md text-center'>All Your Completed Apps Will Appear Here</h1>
                               
                                )
                                   
                                
                                }


                                
                                    
                                    
                            
                            }

                        })()
                      }

                    </TabsContent>


                    

        </Tabs>

    )
}