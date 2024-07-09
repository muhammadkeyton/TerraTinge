'use client';

import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { montserrat } from '@/app/ui/fonts';

import MuiServerProvider from '../../../mui-providers/mui-server-provider';
import TerraTextField from '@/app/ui/reusable-components/terra-textfield';





import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
}  from '../../shadcn-components/drawer';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '../../shadcn-components/dialog'






function ProjectDrawerDialog(){
 
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDesktop,setIsDesktop] = useState<MediaQueryList>();

  
  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)"));

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  if(isDesktop?.matches || windowWidth >= 768){
    return (
           


           //dialog and select problem
           <Dialog>
                <MuiServerProvider>
                <DialogTrigger asChild>
                 
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3  font-app rounded-xl normal-case`}>
                      Begin App Creation
                    </Button>
                  
                </DialogTrigger>
                </MuiServerProvider>
              <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
                <DialogHeader className='mb-4'>
                  <DialogTitle className='mb-2'>App Creation</DialogTitle>
                  <DialogDescription >
                    Tell us abit about your App and your budget
                  </DialogDescription>
                </DialogHeader>
               

                  <TerraTextField
                  label='App Name'
                  type='text'
                  
                  />

                  <TerraTextField
                  label='Detailed App Description'
                   type='text'
                  />



                 <TerraTextField
                  label='what is your budget?'
                   type='text'
                  
                  />



                 

                  
                
              
                <DialogFooter>
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-full p-3  font-app rounded-xl normal-case`}>
                      Submit For Approval
                    </Button>
                </DialogFooter>
               
              </DialogContent>
            </Dialog>
    )
  }

  return(
    <Drawer >
    <DrawerTrigger asChild>
    <button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3  font-app rounded-xl normal-case`}>
                     Begin App Creation
                    </button>
    </DrawerTrigger>
    <DrawerContent className='bg-white dark:bg-black border-none px-4 mb-6 z-50'>
    <div className='bg-gray-300 w-40 p-1 m-auto mb-4 rounded-xl '>
                 
                 </div>
      <div className="mx-auto w-full max-w-sm ">

        
        <DrawerHeader>
          <DrawerTitle>App Creation</DrawerTitle>
          <DrawerDescription>Tell us abit about your App and your budget</DrawerDescription>
        </DrawerHeader>

               <TerraTextField
                  label='App Name'
                  type='text'
                  
                  />

                  <TerraTextField
                  label='Detailed App Description'
                   type='text'
                  />



                 <TerraTextField
                  label='what is your budget?'
                   type='text'
                  
                  />
        
        <DrawerFooter>
                   <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3   rounded-xl normal-case`}>
                   Submit For Approval
                    </Button>
          <DrawerClose asChild>
          <Button variant='text' className={`${montserrat.className} text-base  text-red-500  w-46 p-3   rounded-xl normal-case`}>
                      Cancel
                    </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
  )
}

export default function Projects(){


  

  
    return(
        
    
               <div className='h-full p-12 flex flex-col gap-16 justify-center items-center'>
                   
                   
                 



                  <h1 className='font-semibold text-lg'>No Active Projects</h1>

                

               

                   <ProjectDrawerDialog /> 

               </div>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

