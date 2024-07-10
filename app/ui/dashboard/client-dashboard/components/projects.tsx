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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../shadcn-components/tabs"





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
                  <MuiServerProvider>
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-full p-3  font-app rounded-xl normal-case`}>
                      Submit For Review
                    </Button>
                  </MuiServerProvider>
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
    
      
        <Sheet key='bottom'>
        <MuiServerProvider>
          <SheetTrigger asChild>
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-46 p-3  font-app rounded-xl normal-case`}>
                      Begin App Creation
                    </Button>
          </SheetTrigger>
        </MuiServerProvider>
          <SheetContent side='bottom' className='bg-white dark:bg-black border-none rounded-t-xl'>
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
                  <MuiServerProvider>
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-full p-3  font-app rounded-xl normal-case`}>
                      Submit For Review
                    </Button>
                  </MuiServerProvider>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

  
  )
}


export default function Projects(){

  const [currentTab,setTab] = useState('In Review')
  

  
    return(
        
    
              <div className='h-full py-20'>
                   
                   
                 
                   <Tabs defaultValue={currentTab} className="h-full w-full flex flex-col items-center">
                      <TabsList className='shadow-lg gap-4 flex-none p-8 bg-slate-100 dark:bg-slate-800'>
                        <TabsTrigger className={`p-3  ${currentTab === 'In Review' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Review" onClick={()=> setTab("In Review")}>In Review</TabsTrigger>
                        <TabsTrigger className={`p-3  ${currentTab === 'In Progress' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="In Progress" onClick={()=> setTab("In Progress")}>In Progress</TabsTrigger>
                      </TabsList>


                      {
                        currentTab === "In Review"?
                      
                      <TabsContent className='grow  w-full flex flex-col gap-6 justify-center items-center' value="In Review">
                      
                      <h1 className='font-semibold text-lg'>No Active Projects</h1>
                      <ProjectDrawerDialog /> 

                     
                      </TabsContent>

                      :

                      <TabsContent className='grow w-full flex flex-col gap-6 justify-center items-center' value="In Progress">
                        Nothing In Progress
                      
                      </TabsContent>

                      }


                    </Tabs>


                 
                  

              </div>
              
               



            
                
                

               
                
               
                


                
                
                
          







        
    )
}

