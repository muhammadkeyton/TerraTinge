'use client'

import { useContext } from 'react';


import clsx from 'clsx';



export type NavLink = {
    name: string;
    icon: JSX.Element;
};

type NavLinksProps = {
    links: NavLink[],
    navigationContext: React.Context<any>;
}
   

export default function NavLinks({links,navigationContext}:NavLinksProps){
    const { currentState, setCurrentState } = useContext(navigationContext)

  

    return(
        <>
           { links.map((link,index)=>{
        

                return(
                    <div key={index+1} 

                    onClick={()=> setCurrentState(link.name)}
                    
                    className={
                        clsx(
                           'hover:bg-indigo-400 hover:text-white  dark:text-white  text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4',
                           {
                             'bg-indigo-400 text-white': link.name === currentState,
                             'bg-slate-100 dark:bg-gray-950': link.name !== currentState
                           } 
                        )
                    }
                    
                    
                    
                   >
                    
                    
                    
                    
                    {link.icon}
                    <h4 className='font-light hidden md:block'>{link.name}</h4>
                    </div>
                )

                })     
    
         }
        </>
    )
   
}