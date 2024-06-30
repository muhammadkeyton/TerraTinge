
import { auth } from "@/auth";


import SideNav from "@/app/ui/dashboard/sidenav/sidenav";
import NavBar from "../ui/dashboard/navbar/in-app-navbar";
export default async function Layout({ children }: { children: React.ReactNode }) {
   


    return (
        <div className='relative h-screen gap-6 flex  flex-col md:flex-row md:p-6 bg-slate-100 dark:bg-black'>
            
            <div className='fixed h-16 z-10  top-0 left-0 right-0 '>
             <NavBar/>
            </div>
            

            <div className='md:w-64 z-10 w-full fixed bottom-0  left-0 right-0 md:static backdrop-blur-md  md:p-0   border-none outline-none'>
            <SideNav/>
            </div>
            

            <div className="flex-grow">{children}</div>
        </div>
    );
  }