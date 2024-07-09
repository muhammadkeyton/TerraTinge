

import NavBar from "../ui/dashboard/reuseable-components/in-app-navbar";
import SideNav from "../ui/dashboard/reuseable-components/sidenav";
export default function Layout({ children }: { children: React.ReactNode }) {
   


    return (
        <div className='relative bg-slate-100 dark:bg-black h-screen gap-6 flex  flex-col md:flex-row md:p-6'>
            
            <div className='fixed h-16 z-10  top-0 left-0 right-0 '>
             <NavBar/>
            </div>

            <div className='md:w-64 z-10 w-full fixed bottom-0  left-0 right-0 md:static backdrop-blur-md  md:p-0   border-none outline-none'>
            <SideNav/>
            </div>
            
           
            
            
            <div className='flex-grow bg-white md:shadow-md dark:bg-black dark:md:border-2 dark:md:border-slate-500  overflow-y-auto md:rounded-xl'>{children}</div>




        </div>
    );
  }