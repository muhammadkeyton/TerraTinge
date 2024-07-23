'use client';

import { useState,useEffect, ChangeEvent } from 'react';
import Divider from '@mui/material/Divider';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-components/dialog';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../shadcn-components/sheet"

import Image from 'next/image';
import { Role } from '@/app/lib/definitions';
import Button from '@mui/material/Button';
import MuiServerProvider from '../../mui-providers/mui-server-provider';
import { montserrat } from '../../fonts';


type ProjectCardProps = {
  appName:string,
  role:Role,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appBudget:string,
  appDetail:string
}



function ViewProject({appName,appBudget,appDetail}:{appName:string,appBudget:string,appDetail:string}){
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDesktop,setIsDesktop] = useState<MediaQueryList>();

  const appDetailLines = appDetail.split('\n');
  const appBudgetLines = appBudget.split('\n');

  //this checks if we are in desktop or mobile and allows us to render either dialog or sheet
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
  return(
    <div className='flex flex-row justify-around items-center space-x-4 my-12'>

                 <Dialog>
                  <MuiServerProvider>
                  <DialogTrigger asChild>
                   
                      <Button variant='text' className={`${montserrat.className} text-indigo-700  dark:text-indigo-500`}>
                        View
                      </Button>
                    
                  </DialogTrigger>
                  </MuiServerProvider>
                <DialogContent className="max-w-lg h-[80vh] flex flex-col bg-white dark:bg-black">
                  <DialogHeader className='mb-4'>
                    <DialogTitle className='mb-2'>{appName}</DialogTitle>
                    <DialogDescription >
                      Project&apos;s Details and Budget
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
                        {appBudgetLines.map((line, index) => (
                          <p className='text-sm mt-4' key={index}>{line}</p>
                        ))}
                      </div>
                  
                  
                  </div>

                  
                 
  
  
  
                   
  
                    
                  
                

                 
                </DialogContent>
                </Dialog>
               
                 <Button variant="contained" className={`${montserrat.className} bg-indigo-700 text-white`}>Edit</Button>
                 <Button variant="text" className='text-red-600'>Delete</Button>
      </div>

  )
}

  return(

    <div className='flex flex-row justify-around items-center space-x-4 my-12'>
    <Sheet key='bottom'>
    <MuiServerProvider>
      <SheetTrigger asChild>
        <Button variant='text' className={`${montserrat.className} text-indigo-700 dark:text-indigo-500`}>
          View
        </Button>
      </SheetTrigger>
    </MuiServerProvider>
      <SheetContent side='bottom' className='h-[90vh] flex flex-col bg-white dark:bg-black border-none rounded-t-xl'>
        <SheetHeader className='mb-4'>
          <SheetTitle className='mb-2'>{appName}</SheetTitle>
          <SheetDescription>
          Project&apos;s Details and Budget
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
                    {appBudgetLines.map((line, index) => (
                      <p className='text-sm mt-4' key={index}>{line}</p>
                    ))}
                  </div>
              
              
              </div>
        
      
      </SheetContent>
    </Sheet>

  <Button variant="contained" className={`${montserrat.className} bg-indigo-700 text-white`}>Edit</Button>
  <Button variant="text" className='text-red-600'>Delete</Button>
  </div>
  )
    
}

export default function ProjectCard({appName,role,clientEmail,clientImage,createdAt,appBudget,appDetail}:ProjectCardProps){
    // let appDetailLines = appDetail.split('\n');


    
  
    
   

    return(
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>
  
        
       
  
       <h2 className={`text-xl font-bold ${role === Role.developer && 'mb-4'}`}>{appName}</h2>

       <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>


      



       {
        role === Role.client
        &&
       <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src='/team-discussion.gif' width={250} height={200} alt='project' />

       }
  
  
       <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">{role === Role.client? 'TerraTinge Team Reviewing' :'Awaiting Review'}</code>


      
      
      
      
       
       
  
       
      
  
  
       
       
       
  
      
      {
        (()=>{
          switch (role) {
            case Role.client:{
              return( <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! Our dedicated team is currently reviewing the details with great care. We understand how important this is for you. Please expect an email from us within the next 24 hours as we gather our insights and feedback. We appreciate your patience and look forward to moving ahead together!</p>)
            }


            case Role.developer:{
              return (
                <ViewProject appName={appName} appBudget={appBudget} appDetail={appDetail}/> 
              )
            }
              
              
          
            default:
              break;
          }
        })()
      }



      
      <div className='flex flex-row items-center gap-4 mt-6'>
      <Image  className="rounded-full" src={clientImage} width={40} height={40} alt='user profile' />

      <div>
        <h3 className='text-xs font-light mb-2'>App Founder</h3>
        <p className='text-sm font-semibold'>{role === Role.client? clientEmail.split('@')[0] : clientEmail}</p>
      </div>
     
      </div>
  
       
  
       {/* <>
         {appDetailLines.map((line, index) => (
            <p className='text-sm max-w-xs mt-4' key={index}>{line}</p>
          ))}
       </> */}
       
       
  
  
      </div>
    )
  }