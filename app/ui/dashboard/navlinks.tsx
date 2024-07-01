'use client'



import { navLinks } from "./hook"
import { useNavigationState } from "./hook"
import clsx from 'clsx';


export default function NavLinks(){
    const {currentLink} = useNavigationState();

    return(
        <>
           { navLinks.map((link,index)=>{
        

                return(
                    <div key={index+1} 
                    
                    className={
                        clsx(
                           'bg-slate-100  hover:bg-indigo-400 hover:text-white dark:bg-gray-950  text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4',
                           {
                             'bg-indigo-400 text-white dark:bg-indigo-400': link.name === currentLink
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