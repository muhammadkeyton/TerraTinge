'use client';

import { useState,useEffect} from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn-components/tabs"

import ProjectCard from './project-card';


import { DocumentData } from 'firebase/firestore';
import { Project, Role } from '@/app/lib/definitions';

import { useProjectsContext } from './projects-context';
import ProjectDrawerDialog from '../client-dashboard/components/projects/create-project';



export default function ProjectTabs({projects,role}: { projects:Project[],role:Role}){

    const {done,inProgress,inReview,setProjectsAndRole} = useProjectsContext();


    const [currentTab,setTab] = useState('')

    useEffect(() => {
        if (!projects || !role) return;
    
        setProjectsAndRole(projects, role);
    
    }, [projects, role]);
    
    useEffect(() => {
        if (inReview.length > 0) {
            setTab('InReview');
        } else if (inReview.length < 1 && inProgress.length > 0) {
            setTab('InProgress');
        } else if (inReview.length < 1 && inProgress.length < 1 && done.length > 0) {
            setTab('done');
        }
    }, [inReview, inProgress, done]);
    
    console.log('done:', done);
    console.log('inreview:', inReview);
    console.log('inprogress:', inProgress);
    console.log(currentTab);

    

    return (
        <Tabs defaultValue={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-4'>
                    
                        <TabsTrigger className={`${currentTab === 'InReview' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InReview" onClick={()=> setTab("InReview")}>{inReview.length > 0 && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>{inReview.length}</span>} In Review</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'InProgress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="InProgress" onClick={()=> setTab("InProgress")}>{inProgress.length > 0 && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>{inProgress.length}</span>}In Progress</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'done' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="done" onClick={()=> setTab("done")}>{done.length > 0 && <span className='mr-2 bg-green-500 p-2 text-white rounded-full w-[25px] h-[25px] flex items-center justify-center'>{done.length}</span>}Done</TabsTrigger>
                      </TabsList>



                      <TabsContent className='grow w-full flex flex-col justify-center items-center' value={currentTab}>

                      {
                        (()=>{

                            switch (currentTab) {
                                case 'InReview':{

                                    if(inReview.length>0){

                                   
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
                                     paymentAmount={projects[0]?.paymentAmount}
                                     paymentStatus={projects[0]?.paymentStatus}
                                     
                                     />
                                   
                                    )

                                }else if(inReview.length<1 && inProgress.length <1){
                                    return (
                                        <>
                                        <h1 className='font-semibold text-md text-center'>your previous project is done,you can create a new project</h1>
                                        <ProjectDrawerDialog /> 
                                        </>
                                    )
                                }

                                return (
                                    <>
                                    <h1 className='font-semibold text-md text-center'>Nothing InReview and You have a Project in progress</h1>
                                    
                                    </>
                                )



                                
                                }


                                case 'InProgress':{
                                    if(inProgress.length>0){

                                   
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
                                         paymentAmount={projects[0]?.paymentAmount}
                                         paymentStatus={projects[0]?.paymentStatus}
                                         
                                         />
                                       
                                        )
    
                                    }else if(inReview.length<1 && inProgress.length <1){
                                        return (
                                            <>
                                            <h1 className='font-semibold text-md text-center'>Nothing In Progress</h1>
                                           
                                            </>
                                        )
                                    }
    
                                    return (
                                        <>
                                        <h1 className='font-semibold text-md text-center'>Nothing In Progress</h1>
                                        
                                        </>
                                    )
                                }


                                case 'done':{
                                    return 'All Your Completed Apps Will Appear Here'
                                }


                                
                                    
                                    
                            
                            }

                        })()
                      }

                    </TabsContent>


                    

        </Tabs>

    )
}