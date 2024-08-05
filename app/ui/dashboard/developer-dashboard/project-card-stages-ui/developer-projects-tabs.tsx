'use client';

import { useState,useEffect} from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/tabs"

import { isVersionStage1,isVersionStage2 } from '../../type-guards';



import { developerProjectsType } from '@/app/lib/definitions';
import DeveloperProjectCardStage1 from './stage1/developer-project-card';
import DeveloperProjectCardStage2 from './stage2/developer-project-card-stage2';





export default function DeveloperProjectTabs({projects}: { projects:developerProjectsType}){
    const {inReview,inProgress,done}  = projects;
    
    const [currentTab,setTab] = useState<string>('');

    useEffect(() => {
        if ((inReview && inReview.length>0) && (inProgress  && inProgress.length <1 )) {
            setTab('InReview');
        } else if ((inProgress && inProgress.length>0) && (inReview  && inReview.length <1 )) {
            setTab('InProgress');
        } else if ((inProgress && inProgress.length<1) && (inReview  && inReview.length <1 )) {
            setTab('done');
        }
    }, []);
    
   
    

   
   

    return (
        <Tabs value={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-4'>
                    
                        <TabsTrigger className={`${currentTab === 'InReview' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InReview" onClick={()=> setTab("InReview")}>{(inReview  && inReview.length > 0) && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>{inReview.length}</span>} In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'InProgress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InProgress" onClick={()=> setTab("InProgress")}>{(inProgress && inProgress.length > 0)  && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>{inProgress.length}</span>}In Progress</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'done' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="done" onClick={()=> setTab("done")}>Done</TabsTrigger>
                      </TabsList>



                      <TabsContent className='grow w-full grid grid-cols-1 justify-items-center content-center' value={currentTab}>

                      {
                        (()=>{

                            switch (currentTab) {
                                case 'InReview':{
                                    

                                   return( <div>

                                        {
                                            inReview?.map((project,i)=>{
                                                let version = project.versions[project.versions.length - 1]

                                                if(isVersionStage1(version)){
                                                    return <DeveloperProjectCardStage1 key={i} clientId={project.clientInfo.clientId} projectId={project.projectId} appBudget={version.projectInfo.appBudget} appName={version.projectInfo.appName} appDetail={version.projectInfo.appDetail} clientEmail={project.clientInfo.clientEmail} clientImage={project.clientInfo.clientImage} createdAt={version.projectInfo.createdAt as string}/>
                                                }else if (isVersionStage2(version)){
                                                    return <DeveloperProjectCardStage2 key={i} appCost={version.projectInfo.appCost} appDetail={version.projectInfo.appDetail} appName={project.appName} clientEmail={project.clientInfo.clientEmail} clientId={project.clientInfo.clientId} clientImage={project.clientInfo.clientImage} createdAt={version.projectInfo.createdAt as string} feePercentage={version.projectInfo.feePercentage} paymentAmount={version.projectInfo.paymentAmount} paymentStatus={version.projectInfo.paymentStatus} projectId={project.projectId}/>
                                                }
                                            })
                                        }

                                    </div>)
                                    
                                   
                                    
                                   


                                    
                                    

                                
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