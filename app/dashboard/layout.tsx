
import { auth } from "@/auth";


export default async function Layout({ children }: { children: React.ReactNode }) {
   


    return (
        <div className='flex flex-row space-x-4'>
            <p>sidenav</p>


            <div>{children}</div>
        </div>
    );
  }