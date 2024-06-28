
import { auth } from "@/auth";


import SideNav from "@/app/ui/dashboard/sidenav/sidenav";

export default async function Layout({ children }: { children: React.ReactNode }) {
   


    return (
        <div className='h-screen gap-6 flex flex-col md:flex-row md:p-6 bg-slate-100'>

            <div className='md:w-64'>
            <SideNav/>
            </div>
            

            <div className="flex-grow">{children}</div>
        </div>
    );
  }