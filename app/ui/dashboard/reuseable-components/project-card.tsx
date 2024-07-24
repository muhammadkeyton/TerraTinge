'use client';

import { useState,useEffect, ChangeEvent } from 'react';
import Divider from '@mui/material/Divider';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-components/dialog';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../shadcn-components/sheet"

import Image from 'next/image';
import { AppDataFrontend, Role } from '@/app/lib/definitions';
import Button from '@mui/material/Button';
import MuiServerProvider from '../../mui-providers/mui-server-provider';
import { montserrat } from '../../fonts';
import { NameSchema,AppCostSchema } from '@/app/lib/data-validation';
import TerraTextField from '../../reusable-components/terra-textfield';
import clsx from 'clsx';
import {submitUpdateProject} from '@/app/server-actions/in-app/developer/all-work';




function EditProject({appName,appDetail,projectId}:{appName:string,appDetail:string,projectId:string}){

  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDesktop,setIsDesktop] = useState<MediaQueryList>();



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


  const [loading,setLoading] = useState(false);
 
  const [appData,setData] = useState({
      appName:{
          text:appName ?? '',
          error:false,
          helperText:''
      },
      appDetail:{
          text: appDetail ?? '',
          error:false,
          helperText:''
      },
      appCost:{
          helperText:'',
          error:false,
          text:'',
      },
      
  });


  //used by the submit button if no appdata is available button is disabled
  const emptyField = appData.appCost.text.length < 1 || appData.appName.text.length < 1 || appData.appDetail.text.length < 1;

  function trackAppData(event:ChangeEvent<HTMLInputElement>){
      const {name,value} = event.target;

      

      if(name === 'appDetail'){
          let limitReached = false;
          if(value.length >= 4000) {
              limitReached = true;
          }
          setData({
              ...appData,
              [name]:{
                  error:limitReached,
                  helperText:limitReached?'character limit reached!':'',
                  text:value,
              }
              
          })
      } else if(name === 'appName'){
        
          const {data,success,error} = NameSchema.safeParse({name:value});

          if(success){
              setData({
                  ...appData,
                  appName:{
                      error:false,
                      text:data.name,
                      helperText:''

                  }
              });
          }else{
              setData({
                  ...appData,
                  appName:{
                      text:value,
                      error:true,
                      helperText:error.errors[0].message

                  }
              });

          }
          
      }else if (name === 'appCost'){
        const {data,success,error} = AppCostSchema.safeParse({appCost:value});

        if(success){
          setData({
              ...appData,
              appCost:{
                  error:false,
                  text:data.appCost,
                  helperText:''

              }
          });


        }else{
          setData({
            ...appData,
            appCost:{
                text:value,
                error:true,
                helperText:error.errors[0].message

            }
        });

        }

        
      }

  }


  const validateAppData = (data:any):boolean=>{
      
      const nameResult = NameSchema.safeParse({name:data.appName.text});

      const emptyAppDetail = data.appDetail.text.length < 1;
      
      const AppCostResult = AppCostSchema.safeParse({appCost:data.appCost.text})
      
      

     


     if(!emptyAppDetail && AppCostResult.success && nameResult.success){
       return true;
     }else{
          setData({
              ...data,
              appCost:{
                  ...data.appBudget,
                  error:!AppCostResult.success,
                  helperText: AppCostResult.success?'':AppCostResult.error.errors[0].message
              },
              appDetail:{
                  ...data.appDetail,
                  error:emptyAppDetail,
                  helperText: emptyAppDetail?'this field is required':''
              },
             
              appName:{
                  ...data.appName,
                  error:!nameResult.success,
                  helperText: nameResult.success?'':nameResult.error.errors[0].message
              }

          })

          
      }
      return false
  }


  if(isDesktop?.matches || windowWidth >= 768){
    return (
           


           
           <Dialog>
                <MuiServerProvider>
                <DialogTrigger asChild>
                 
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500  p-1   rounded-xl normal-case`}>
                      Edit
                    </Button>
                  
                </DialogTrigger>
                </MuiServerProvider>
              <DialogContent className="max-w-lg bg-white dark:bg-black">
                <DialogHeader className='mb-4'>
                  <DialogTitle className='mb-2'>{appData.appName.text}</DialogTitle>
                  <DialogDescription >
                    Edit Client Project Detail and Enable Payment
                  </DialogDescription>
                </DialogHeader>
                 
                 {
                  !loading?
                
                 <form onSubmit={ async(event)=>{
                  event.preventDefault();

                  const appDataOk = validateAppData(appData);

                 
 
                    if(appDataOk){
                         setLoading(true);
                         const responseOk = await submitUpdateProject(projectId,{
                             appName:appData.appName.text,
                             appDetail:appData.appDetail.text,
                             appCost:appData.appCost.text
                         });
 
                         console.log(responseOk)
 
                         if(!responseOk){
                             setLoading(false);
                             validateAppData(appData);
                             alert('something went wrong while trying to update the project,try again')
                         }else{
                             router.push('/dashboard');
                         }
                    }
                 
                 }}>

                 
                  <TerraTextField
                  label='App Name'
                  type='text'
                  autoFocus={true}
                  name='appName'
                  onChange={trackAppData}
                  error={appData.appName.error}
                  helperText={appData.appName.helperText}
                  value={appData.appName.text}
                  inputProps={
                      {
                          maxLength:20
                      }
                   }
                  
                  />

                  <TerraTextField
                  label='Detailed App Description'
                  type='text'
                  name='appDetail'
                  error={appData.appDetail.error}
                  onChange={trackAppData}
                  helperText={appData.appDetail.helperText}
                  value={appData.appDetail.text}
                  multiline={true}
                  inputProps={
                      {
                          maxLength:4000
                      }
                   }
                  />



                 <TerraTextField
                  label='total cost of project?(enter numbers only)'
                  type='text'
                  name='appCost'
                  onChange={trackAppData}
                  error={appData.appCost.error}
                  helperText={appData.appCost.helperText}
                  value={appData.appCost.text}
                  multiline={true}
                  inputProps={
                      {
                          maxLength:7
                      }
                   }
                  
                  />



                 

                  
                
              
                <DialogFooter>
                  <MuiServerProvider>

                  <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                    className={
                      clsx(
                          `my-4 ${montserrat.className} w-full p-3   rounded-xl  text-base text-center normal-case`,
                          {
                              'bg-indigo-700 hover:bg-indigo-500 text-white':!emptyField,
                              'bg-inherit': emptyField
                          }
                      )
                 
                  }
                  >Save & Enable Payment
                   </Button>
                    
                  </MuiServerProvider>
                </DialogFooter>
                </form>

                :

                <MuiServerProvider>
                  <div className='flex justify-center items-center my-12'>
                  <CircularProgress className='text-indigo-700' size={60}/>
                  </div>
                </MuiServerProvider>



                }

              
               
              </DialogContent>
            </Dialog>
    )
  }

  return(
      <Sheet key='bottom'>
      <MuiServerProvider>
        <SheetTrigger asChild>
                  <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 p-1 rounded-xl normal-case`}>
                  Edit
                  </Button>
        </SheetTrigger>
      </MuiServerProvider>
        <SheetContent side='bottom' className='bg-white dark:bg-black border-none rounded-t-xl'>
          <SheetHeader className='mb-4'>
            <SheetTitle className='mb-2'>{appData.appName.text}</SheetTitle>
            <SheetDescription>
            Edit Client Project Detail and Enable Payment
            </SheetDescription>
          </SheetHeader>

       
          {!loading ?
          <form onSubmit={async(event)=>{
            event.preventDefault();

            const appDataOk = validateAppData(appData);

            if(appDataOk){
              setLoading(true);
              const responseOk = await submitUpdateProject(projectId,{
                  appName:appData.appName.text,
                  appDetail:appData.appDetail.text,
                  appCost:appData.appCost.text
              });

              console.log(responseOk)

              if(!responseOk){
                  setLoading(false);
                  validateAppData(appData);
                  alert('something went wrong while trying to update the project,try again')
              }else{
                  router.push('/dashboard');
              }
          }
        }}>
          <TerraTextField
                label='App Name'
                type='text'
                autoFocus={true}
                name='appName'
                onChange={trackAppData}
                error={appData.appName.error}
                helperText={appData.appName.helperText}
                value={appData.appName.text}
                inputProps={
                    {
                        maxLength:20
                    }
                 }
                
                />

                <TerraTextField
                label='Detailed App Description'
                type='text'
                name='appDetail'
                error={appData.appDetail.error}
                onChange={trackAppData}
                helperText={appData.appDetail.helperText}
                value={appData.appDetail.text}
                multiline={true}
                inputProps={
                    {
                        maxLength:4000
                    }
                 }
                />



               
               <TerraTextField
                  label='total cost of project?(enter numbers only)'
                  type='text'
                  name='appCost'
                  onChange={trackAppData}
                  error={appData.appCost.error}
                  helperText={appData.appCost.helperText}
                  value={appData.appCost.text}
                  multiline={true}
                  inputProps={
                      {
                          maxLength:7
                      }
                   }
                  
                  />

          <SheetFooter>
       
                <MuiServerProvider>
                <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                    className={
                      clsx(
                          `my-4 ${montserrat.className} w-full p-3   rounded-xl  text-base text-center normal-case`,
                          {
                              'bg-indigo-700 hover:bg-indigo-500 text-white':!emptyField,
                              'bg-inherit': emptyField
                          }
                      )
                 
                  }
                  >Save & Enable Payment
                   </Button>
                </MuiServerProvider>
          
          </SheetFooter>
          </form>

          :


          <MuiServerProvider>
              <div className='flex justify-center items-center my-12'>
              <CircularProgress className='text-indigo-700' size={60}/>
              </div>
          </MuiServerProvider>


         }
           
    
        </SheetContent>
      </Sheet>
  )


}






type viewProjectPropTypes = {
  appName:string,
  appBudget:string,
  appDetail:string,
  reviewed:boolean
}

function ViewProject({appName,appBudget,appDetail,reviewed}:viewProjectPropTypes){
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDesktop,setIsDesktop] = useState<MediaQueryList>();

  const appDetailLines = appDetail.split('\n');
  let appBudgetLines;
  if(!reviewed){
    appBudgetLines = appBudget?.split('\n');
  }
  

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
  },[]);

  if(isDesktop?.matches || windowWidth >= 768){
  return(
   

                 <Dialog>
                 <MuiServerProvider>
                  <DialogTrigger asChild>
                   
                      <Button variant='text' className={`${montserrat.className} p-1 text-indigo-700  dark:text-indigo-500`}>
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
                      
                      
                      {
                        !reviewed &&
                        <>
                        <Divider className='dark:bg-slate-300'/>
                        
                        
                        <div>
                          <h2 className='font-bold mb-2'>App Budget:</h2>
                          {appBudgetLines?.map((line, index) => (
                            <p className='text-sm mt-4' key={index}>{line}</p>
                          ))}
                        </div>
                        </>

                       }
                  
                  
                  </div>

                  
                 
  
  
  
                   
  
                    
                  
                

                 
                </DialogContent>
                </Dialog>

               
                
      

  )
}

  return(

   
    <Sheet key='bottom'>
    <MuiServerProvider>
      <SheetTrigger asChild>
        <Button variant='text' className={`${montserrat.className} p-1 text-indigo-700 dark:text-indigo-500`}>
          View
        </Button>
      </SheetTrigger>
    </MuiServerProvider>
      <SheetContent side='bottom' className='h-[80vh] flex flex-col bg-white dark:bg-black border-none  rounded-t-xl'>
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
                  
               
                  {
                    !reviewed &&
                    <>
                    <Divider className='dark:bg-slate-300'/>
                    
                    
                    <div>
                      <h2 className='font-bold mb-2'>App Budget:</h2>
                      {appBudgetLines?.map((line, index) => (
                        <p className='text-sm mt-4' key={index}>{line}</p>
                      ))}
                    </div>
                    </>

                    }
              
              
              </div>
        
      
      </SheetContent>
    </Sheet>
  
    

  )
    
}







type ProjectCardProps = {
  appName:string,
  role:Role,
  clientEmail:string,
  clientImage:string,
  createdAt:string,
  appBudget:string,
  appDetail:string,
  projectId:string
  reviewed:boolean
  appCost:number
}


export default function ProjectCard({appName,role,clientEmail,clientImage,createdAt,appBudget,appDetail,projectId,reviewed,appCost}:ProjectCardProps){



    
  
    
   

    return(
      <div className='bg-white dark:bg-neutral-900 p-6 rounded-md shadow-md max-w-sm md:max-w-md '>
  
        
       
  
       <h2 className={`text-xl font-bold ${role === Role.developer && 'mb-4'}`}>{appName}</h2>

       <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>


      



       {
        role === Role.client
        &&
       <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src={reviewed ?'/ideas.gif':'/team-discussion.gif'} width={250} height={200} alt='project' />

       }
  
  
       <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">
        
       

        {
        (()=>{

          switch (role) {
            case Role.client:{
               if(reviewed){
                return 'Reviewed'
               }

               return 'TerraTinge Team Reviewing'
            }


            case Role.developer:{
              if(reviewed){
                return 'Reviewed'
               }

               return 'Awaiting Review'
            }
              
         
          
            
          }

        })()
        
        }

       </code>


      
      
      
      
       
       
  
       
      
  
  
       
       
       
  
      
      {
        (()=>{
          switch (role) {
            case Role.client:{

              if(reviewed){
                return (<p className='text-sm max-w-xs mt-4'>Hello! Your project has passed our review. An email with our insights has been sent to you. We&apos;re excited to collaborate and innovate with you, combining your vision and our expertise for great results.</p>)
              }
              return( <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! Our dedicated team is currently reviewing the details with great care. We understand how important this is for you. Please expect an email from us within the next 24 hours as we gather our insights and feedback. We appreciate your patience and look forward to moving ahead together!</p>)
            }


            case Role.developer:{
              return (
                <div className='flex flex-row justify-around items-center space-x-4 my-12'>
                  <ViewProject appName={appName} appBudget={appBudget} appDetail={appDetail} reviewed={reviewed}/>
                  <EditProject appName={appName}  appDetail={appDetail} projectId={projectId}/>
                  <MuiServerProvider>
                   <Button variant="text" className='p-1 text-red-600' onClick={()=>{
                    console.log('delete requested!');
                   }}>Delete</Button>
                  </MuiServerProvider>
                </div>
                
              )
            }
              
              
          
            default:
              throw Error(`${role} has been received which is unusual,please email us so that we can fix this unexpected issue`)
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
  
       
  
       
       
       
  
  
      </div>
    )
}