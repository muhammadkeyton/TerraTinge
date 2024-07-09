'use client';

import Button from '@mui/material/Button';
import { useState,useEffect } from 'react';
import { montserrat } from '@/app/ui/fonts';

import MuiServerProvider from '../../../mui-providers/mui-server-provider';
import TerraTextField from '@/app/ui/reusable-components/terra-textfield';






import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../../shadcn-components/sheet"

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
    <SheetSide/>
  )
}

function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      
        <Sheet key='bottom'>
          <SheetTrigger asChild>
            <Button>bottom</Button>
          </SheetTrigger>
          <SheetContent side='bottom' className='bg-white dark:bg-black border-none'>
            <SheetHeader className='mb-4'>
              <SheetTitle className='mb-2'>App Creation</SheetTitle>
              <SheetDescription>
              Tell us abit about your App and your budget
              </SheetDescription>
            </SheetHeader>
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
            <SheetFooter>
              <SheetClose asChild>
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-full p-3  font-app rounded-xl normal-case`}>
                      Submit For Approval
                    </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

    </div>
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

