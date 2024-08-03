'use client';


import { montserrat } from '@/app/ui/fonts';
import MuiServerProvider from '../../../../../mui-providers/mui-server-provider';

import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "../../../../shadcn-components/sheet"
  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../../../../shadcn-components/dialog'


import useWindowWidth from "@/app/ui/dashboard/reuseable-components/hooks/detect-window-width";


type ViewSubmittedDetailsProp = {
    appName:string,
    appBudget:string,
    appDetail:string
}


export default function ViewSubmittedDetails({appName,appBudget,appDetail}:ViewSubmittedDetailsProp){
    const {isDesktop,windowWidth} = useWindowWidth();

    const appDetailLines = appDetail.split('\n');
    const appBudgetLines = appBudget?.split('\n');


if(isDesktop || windowWidth >= 768){
    return(
     
  
                   <Dialog>
                   <MuiServerProvider>
                    <DialogTrigger asChild>
                     
                        <Button variant='text' className={`${montserrat.className} p-3 text-indigo-600 dark:text-indigo-500`}>
                         View Submitted Details
                        </Button>
                      
                    </DialogTrigger>
                    </MuiServerProvider>
                  <DialogContent className="max-w-lg h-[80vh] flex flex-col bg-white dark:bg-black">
                    <DialogHeader className='mb-4'>
                      <DialogTitle className='mb-2'>{appName}</DialogTitle>
                      <DialogDescription >
                        App Details And Budget
                      </DialogDescription>
                    </DialogHeader>


                    
                  <div className='overflow-y-auto flex-grow flex flex-col gap-12'>
                  
                        <div>
                            <h2 className='font-bold mb-2'>App Detail:</h2>
                            
                            
                            {appDetailLines.map((line, index) => (
                            <p className='text-sm mt-4' key={index}>{line}</p>
                            ))}
        
                        </div>
                        
                        
                        
                            <Divider className='dark:bg-slate-300'/>
                            
                            
                            <div>
                            <h2 className='font-bold mb-2'>App Budget:</h2>
                            {appBudgetLines?.map((line, index) => (
                                <p className='text-sm mt-4' key={index}>{line}</p>
                            ))}
                            </div>
                   
              
              
                    </div>
  
  
                    
    
                      
                    
                  
  
                   
                  </DialogContent>
                  </Dialog>
  
                 
                  
        
  
    )
  }
  
    return(
  
     
      <Sheet key='bottom'>
      <MuiServerProvider>
        <SheetTrigger asChild>

        <Button variant='text' className={`${montserrat.className} p-3 text-indigo-600 dark:text-indigo-500`}>
          View Submitted Details
        </Button>
          
        </SheetTrigger>
      </MuiServerProvider>
        <SheetContent side='bottom' className='h-[80vh] flex flex-col bg-white dark:bg-black border-none  rounded-t-xl'>
          <SheetHeader className='mb-4'>
            <SheetTitle className='mb-2'>{appName}</SheetTitle>
            <SheetDescription>
            App Details And Budget
            </SheetDescription>
          </SheetHeader>

          <div className='overflow-y-auto flex-grow flex flex-col gap-12'>
                  
                  <div>
                      <h2 className='font-bold mb-2'>App Detail:</h2>
                      
                      
                      {appDetailLines.map((line, index) => (
                      <p className='text-sm mt-4' key={index}>{line}</p>
                      ))}
  
                  </div>
                  
                  
                  
                      <Divider className='dark:bg-slate-300'/>
                      
                      
                      <div>
                      <h2 className='font-bold mb-2'>App Budget:</h2>
                      {appBudgetLines?.map((line, index) => (
                          <p className='text-sm mt-4' key={index}>{line}</p>
                      ))}
                      </div>
             
        
        
              </div>

  
         
        
        </SheetContent>
      </Sheet>
    
      
  
    )


}
