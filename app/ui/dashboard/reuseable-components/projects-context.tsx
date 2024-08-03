// 'use client';

// import  React,{ createContext, useContext, useState, ReactNode } from 'react';
// import { Project,ProjectState,Role } from '@/app/lib/definitions';


// interface ProjectsContextType{
//     inReview:Project[],
//     inProgress:Project[],
//     done:Project[],
//     setProjectsAndRole: (projects: Project[],role:Role) => void;
// }

// const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

// export const useProjectsContext = ()=>{
//     const context = useContext(ProjectsContext);

//     if(!context) throw new Error('useProjectContext must be used within a ProjectProvider');

//     return context;
// }

// interface ProjectsProviderProps {
//     children: ReactNode;
// }

// export const ProjectsProvider: React.FC<ProjectsProviderProps> = ({children}) =>{

//     const [inReview,setInReview] = useState<Project[]>([]);
//     const [inProgress,setInProgress] = useState<Project[]>([]);
//     const [done,setDone] = useState<Project[]>([]);
//     const [role,setRole] = useState<Role>();


//     const setProjectsAndRole = (Projects:Project[],role:Role) =>{

//         const review = Projects.filter((project) => project.projectState === ProjectState.inReview);
//         const inProgress = Projects.filter((project)=> project.projectState === ProjectState.inProgress);
//         const done = Projects.filter((project) => project.projectState === ProjectState.done)


//         setInReview(review);
//         setInProgress(inProgress);
//         setDone(done);
//         setRole(role);
       
//     }


//     return (
//         <ProjectsContext.Provider value={{inReview, inProgress, done, setProjectsAndRole }}>
//           {children}
//         </ProjectsContext.Provider>
//       );

// }



