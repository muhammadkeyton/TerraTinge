'use client';

import { useState,useEffect, ChangeEvent } from 'react';

import TerraTextField from '@/app/ui/reusable-components/terra-textfield';

import MuiServerProvider from '../../../../mui-providers/mui-server-provider';

import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';

import { NameSchema } from "@/app/lib/data-validation";

import { montserrat } from '@/app/ui/fonts';


import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { createNewProject } from '@/app/server-actions/in-app/client/project';

import { AppDataFrontend } from '@/app/lib/definitions';

import { useRouter } from 'next/navigation'

import clsx from 'clsx';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "../../../shadcn-components/sheet"
  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from '../../../shadcn-components/dialog'



export default function ProjectDrawerDialog(){

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
   
    const [appData,setData] = useState<AppDataFrontend>({
        appName:{
            text:'',
            error:false,
            helperText:''
        },
        appDetail:{
            text:'',
            error:false,
            helperText:''
        },
        appBudget:{
            helperText:'',
            error:false,
            text:'',
        },
        
    });


    //used by the submit button if no appdata is available button is disabled
    const emptyField = appData.appBudget.text.length < 1 || appData.appName.text.length < 1 || appData.appDetail.text.length < 1;

    function trackAppData(event:ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;

        

        if(name === 'appBudget' || name === 'appDetail'){
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
            
        }

    }


    const validateAppData = (data:any):boolean=>{
        
        const nameResult = NameSchema.safeParse({name:data.appName.text});

        const emptyAppDetail = data.appDetail.text.length < 1;
        
        const emptyAppBudget = data.appBudget.text.length < 1;
        
        

       


       if(!emptyAppDetail && !emptyAppBudget && nameResult.success){
         return true;
       }else{
            setData({
                ...data,
                appBudget:{
                    ...data.appBudget,
                    error:emptyAppBudget,
                    helperText: emptyAppBudget?'this field is required':''
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
                   
                      <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500  p-4  font-app rounded-xl normal-case`}>
                        Submit App Description
                      </Button>
                    
                  </DialogTrigger>
                  </MuiServerProvider>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black">
                  <DialogHeader className='mb-4'>
                    <DialogTitle className='mb-2'>App Description</DialogTitle>
                    <DialogDescription >
                      Tell us abit about your App and your budget
                    </DialogDescription>
                  </DialogHeader>
                   
                   {!loading ?
                   <form onSubmit={async(event)=>{
                    event.preventDefault();

                    const appDataOk = validateAppData(appData);

                    if(appDataOk){
                        setLoading(true);
                        const responseOk = await createNewProject({
                            appName:appData.appName.text,
                            appDetail:appData.appDetail.text,
                            appBudget:appData.appBudget.text
                        });

                        console.log(responseOk)

                        if(!responseOk){
                            setLoading(false);
                            validateAppData(appData);
                            alert('something went wrong while trying to create the project,try again later')
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
                    label='what is your budget?'
                    type='text'
                    name='appBudget'
                    onChange={trackAppData}
                    error={appData.appBudget.error}
                    helperText={appData.appBudget.helperText}
                    value={appData.appBudget.text}
                    multiline={true}
                    inputProps={
                        {
                            maxLength:4000
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
                    >Submit For Review
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
                    <Button className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 p-4  font-app rounded-xl normal-case`}>
                      Submit App Description
                    </Button>
          </SheetTrigger>
        </MuiServerProvider>
          <SheetContent side='bottom' className='bg-white dark:bg-black border-none rounded-t-xl'>
            <SheetHeader className='mb-4'>
              <SheetTitle className='mb-2'>App Description</SheetTitle>
              <SheetDescription>
              Tell us abit about your App and your budget
              </SheetDescription>
            </SheetHeader>

            {!loading ?

            <form onSubmit={async(event)=>{
                     event.preventDefault();

                     const appDataOk = validateAppData(appData);
 
                     if(appDataOk){
                         setLoading(true);
                         const responseOk = await createNewProject({
                             appName:appData.appName.text,
                             appDetail:appData.appDetail.text,
                             appBudget:appData.appBudget.text
                         });
 
                         console.log(responseOk)
 
                         if(!responseOk){
                             setLoading(false);
                             validateAppData(appData);
                             alert('something went wrong while trying to create the project,try again later')
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
                  label='what is your budget?'
                  type='text'
                  name='appBudget'
                  onChange={trackAppData}
                  error={appData.appBudget.error}
                  helperText={appData.appBudget.helperText}
                  value={appData.appBudget.text}
                  multiline={true}
                  inputProps={
                      {
                          maxLength:4000
                      }
                   }
                  
                  />
            <SheetFooter>
              {/* <SheetClose asChild> */}
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
                    >Submit For Review
                     </Button>
                  </MuiServerProvider>
              {/* </SheetClose> */}
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
 