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
        appDetail:{
            text:appDetail ?? '',
            error:false,
            helperText:''
        },
        appCost:{
            helperText:'',
            error:false,
            text:appCost ?? '',
        },
  
        percentage:{
          helperText:'',
          error:false,
          text:percentage ?? '',
        },

        projectLink:{
          helperText:'',
          error:false,
          text:projectLink ?? '',
        }
        
        
    });
  
  
    //used by the submit button if no appdata is available button is disabled
    const emptyField = appData.appCost.text.length < 1 || appData.appName.text.length < 1 || appData.appDetail.text.length < 1 || appData.percentage.text.length < 1;
  
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
  
          
        }else if (name === 'percentage'){
          const {data,success,error} = PercentageSchema.safeParse({percentage:value});

          if(success){
            setData({
              ...appData,
              percentage:{
                error:false,
                helperText:'',
                text:data.percentage
              }
            })
            
          }else{
            setData({
              ...appData,
              percentage:{
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
  
        const emptyAppDetail = data.appDetail.text.length < 1;
        
        const AppCostResult = AppCostSchema.safeParse({appCost:data.appCost.text})

        const percentageResult = PercentageSchema.safeParse({percentage:data.percentage.text})
        
        
  
       
  
  
       if(!emptyAppDetail && AppCostResult.success && nameResult.success && percentageResult.success){
         return true;
       }else{
            setData({
                ...data,
                appCost:{
                    ...data.appBudget,
                    error:!AppCostResult.success,
                    helperText: AppCostResult.success?'':AppCostResult.error.errors[0].message
                },
                features:{
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
                               appDetail:appData.appDetail.text,
                               appCost:appData.appCost.text,
                               percentage:appData.percentage.text,
                               projectLink:appData.projectLink.text,
                               versionStage:versionStage
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
  
  
                  <TerraTextField
                    label='fee percentage?(enter numbers only)'
                    type='text'
                    name='percentage'
                    onChange={trackAppData}
                    error={appData.percentage.error}
                    helperText={appData.percentage.helperText}
                    value={appData.percentage.text}
                    inputProps={
                        {
                            maxLength:3
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
                    appDetail:appData.appDetail.text,
                    appCost:appData.appCost.text,
                    percentage:appData.percentage.text,
                    projectLink:appData.projectLink.text,
                    versionStage:versionStage
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


                  <TerraTextField
                    label='fee percentage?(enter numbers only)'
                    type='text'
                    name='percentage'
                    onChange={trackAppData}
                    error={appData.percentage.error}
                    helperText={appData.percentage.helperText}
                    value={appData.percentage.text}
                    inputProps={
                        {
                            maxLength:3
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
  