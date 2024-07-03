

import NavBar from "../ui/dashboard/reuseable-components/in-app-navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
   


    return (
        <div className='relative'>
            
            <div className='fixed h-16 z-10  top-0 left-0 right-0 '>
             <NavBar/>
            </div>
            
           
            
            
            <div>{children}</div>




        </div>
    );
  }