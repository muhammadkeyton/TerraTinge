'use client'



import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import Link from 'next/link';

export type NavLink = {
    name: string;
    icon: JSX.Element;
    href:string
};

type NavLinksProps = {
    links: NavLink[],
    
}
   

export default function NavLinks({links}:NavLinksProps){
   
    const pathname = usePathname();
  

    return(
        <>
           { links.map((link,index)=>{
        

                return(
                    <Link key={index+1} 
                    href={link.href}
                    className={
                        clsx(
                           'hover:bg-indigo-400 hover:text-white  dark:text-white  text-sm p-3 rounded-lg cursor-pointer flex h-[48px] items-center justify-center flex-row  gap-4',
                           {
                             'bg-indigo-400 text-white': pathname === link.href,
                             'bg-slate-100 dark:bg-gray-950': pathname !== link.href
                           } 
                        )
                    }
                    
                    
                    
                   >
                    
                    
                    
                    
                    {link.icon}
                    <h4 className='font-light hidden md:block'>{link.name}</h4>
                    </Link>
                )

                })     
    
         }
        </>
    )
   
}