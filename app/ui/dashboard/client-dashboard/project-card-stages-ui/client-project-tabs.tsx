'use client';

import { useState,useEffect} from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/tabs"


import { isVersionStage1,isVersionStage2,isVersionStage3 } from '../../type-guards';


import { clientProjectsType} from '@/app/lib/definitions';
import ProjectCardStage1 from './stage1/client-project-card';
import ProjectCardStage2 from './stage2/client-project-card-stage2';
import ProjectCardStage3 from './stage3/client-project-card-stage3';





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
                                    
                                    
                                    if(version && isVersionStage1(version)){
                                        return <ProjectCardStage1 clientId={inReview.clientInfo.clientId}  projectId={inReview?.projectId} appBudget={version.projectInfo.appBudget} appName={version.projectInfo.appName} appDetail={version.projectInfo.appDetail} clientEmail={inReview?.clientInfo.clientEmail as string} clientImage={inReview?.clientInfo.clientImage as string} createdAt={version.projectInfo.createdAt as string}/>
                                    } else if (version && isVersionStage2(version)){
                                        return <ProjectCardStage2 appCostAndFee={version.projectInfo.appCostAndFee} appDetail={version.projectInfo.appDetail} appName={inReview.appName} clientEmail={inReview.clientInfo.clientEmail} clientImage={inReview.clientInfo.clientImage}  paymentStatus={version.projectInfo.paymentStatus} createdAt={version.projectInfo.createdAt as string} projectId={inReview.projectId}/>
                                    }else if(!version && inProgress){
                                        return  <h1 className='font-semibold text-md text-center'>Current project in progress. Can&apos;t create a new project now.</h1>
                                    }



                         
                                   return  <h1 className='font-semibold text-md text-center'>Nothing InReview</h1>


                                    



                                
                                }


                                case 'InProgress':{
                                   const version = inProgress?.versions[inProgress?.versions.length - 1];

                                   if(version && isVersionStage3(version)){
                                    return <ProjectCardStage3 paymentDate={version.projectInfo.paymentDate as string} appCostAndFee={version.projectInfo.appCostAndFee} appDetail={version.projectInfo.appDetail} projectLink={version.projectInfo.projectLink} appName={inProgress.appName} clientEmail={inProgress.clientInfo.clientEmail} clientImage={inProgress.clientInfo.clientImage} createdAt={version.projectInfo.createdAt as string} paymentAmount={version.projectInfo.paymentAmount} paymentStatus={version.projectInfo.paymentStatus}/>
                                   }


                                   return <h1 className='font-semibold text-md text-center'>nothing in progress</h1>
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