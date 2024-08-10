'use client';

import { useState,ChangeEvent } from 'react';

import TerraTextField from '@/app/ui/reusable-components/terra-textfield';

import MuiServerProvider from '../../../../../mui-providers/mui-server-provider';

import Button from '@mui/material/Button';

import CircularProgress from '@mui/material/CircularProgress';

import { AppCostSchema, NameSchema,PercentageSchema } from "@/app/lib/data-validation";

import { montserrat } from '@/app/ui/fonts';


import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { Checkbox } from '@/app/ui/dashboard/shadcn-components/checkbox';

import { useRouter } from 'next/navigation';

import useWindowWidth from '../../../../reuseable-components/hooks/detect-window-width';

import clsx from 'clsx';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
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
    DialogFooter
  } from '../../../../shadcn-components/dialog'
import { submitUpdateProject } from '@/app/server-actions/in-app/developer/all-work';
import { VersionStage } from '@/app/lib/definitions';


export default function EditProject({appName,appDetail,appCost,percentage,projectId,projectLink,versionStage}:{appName:string,appDetail:string,projectId:string,appCost:string,percentage:string,projectLink:string | null,versionStage:VersionStage}){

    const router = useRouter();
    const {isDesktop,windowWidth} = useWindowWidth()
  
  
    const [loading,setLoading] = useState(false);
   
    const [appData,setData] = useState({
        appName:{
            text:appName ?? '',
            error:false,
            helperText:''
        },
       

        projectLink:{
          helperText:'',
          error:false,
          text:projectLink ?? '',
        },

        completed: versionStage === VersionStage.stage4
        
        
    });
  
  
    //used by the submit button if no appdata is available button is disabled
    const emptyField =appData.appName.text.length < 1;
  
    function trackAppData(event:ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;
  
        
  
        
        if(name === 'appName'){
          
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
            
        }else if (name === 'projectLink'){
          setData({
            ...appData,
            projectLink:{
              text:value,
              error:false,
              helperText:''
  
            }
          })
        }
  
    }
  
  
    const validateAppData = (data:any):boolean=>{
        
        const nameResult = NameSchema.safeParse({name:data.appName.text});
  
        
       if(nameResult.success){
         return true;
       }else{
            setData({
                ...data,
                appName:{
                    ...data.appName,
                    error:!nameResult.success,
                    helperText: nameResult.success?'':nameResult.error.errors[0].message
                }
  
            })
  
            
        }
        return false
    }
  
  
    if(isDesktop || windowWidth >= 768){
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
                      Edit Client Project Detail and Payment
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
                               
                               projectLink:appData.projectLink.text,
                             
                               completed:appData.completed
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
                    label='project link(if available)'
                    type='text'
                    name='projectLink'
                    onChange={trackAppData}
                    error={appData.projectLink.error}
                    helperText={appData.projectLink.helperText}
                    value={appData.projectLink.text}
                    
                    
                  />
                   

                   <div className='flex flex-row items-center space-x-4'>
                    <Checkbox checked={appData.completed} onCheckedChange={()=>{
                      setData({
                        ...appData,
                        completed:!appData.completed
                      })
                    }} />
                    <h4 className='text-sm font-semibold'>check when project is completed</h4>
                   </div>
                   
  
  
  
                   
  
                    
                  
                
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
                    >Save Changes
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
              Edit Client Project Detail and Payment
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
                    
                    projectLink:appData.projectLink.text,
                   
                    completed:appData.completed
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
                    label='project link(if available)'
                    type='text'
                    name='projectLink'
                    onChange={trackAppData}
                    error={appData.projectLink.error}
                    helperText={appData.projectLink.helperText}
                    value={appData.projectLink.text}
                    
                    
                  />


                  <div className='flex flex-row items-center space-x-4'>
                    <Checkbox checked={appData.completed} onCheckedChange={()=>{
                      setData({
                        ...appData,
                        completed:!appData.completed
                      })
                    }} />
                    <h4 className='text-sm font-semibold'>check when project is completed</h4>
                   </div>
  
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
                    >Save Changes
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
  