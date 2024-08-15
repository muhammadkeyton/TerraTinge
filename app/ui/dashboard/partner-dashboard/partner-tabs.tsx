'use client';


import {useState} from 'react';
import MuiServerProvider from '../../mui-providers/mui-server-provider';

import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn-components/tabs";


import { montserrat } from '../../fonts';




export default function PartnerTabs(){
    const [currentTab,setTab] = useState('Generate');

    const [promoCode,setPromo] = useState<string|null>(null);
    const [copied,setCopied] = useState(false);



    return (
        <Tabs value={currentTab} className="h-full overflow-y-auto p-2 md:py-4 flex flex-col gap-4 ">
                      <TabsList className='shadow-lg bg-slate-100 py-6 md:px-3 dark:bg-slate-800 md:self-center md:gap-12'>
                    
                        <TabsTrigger className={`${currentTab === 'Generate' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="Generate" onClick={()=> setTab("Generate")}>Generate</TabsTrigger>
                        <TabsTrigger className={`${currentTab === 'Earnings' ? 'bg-white dark:bg-gray-500':'bg-none'}`} value="Earnings" onClick={()=> setTab("Earnings")}>Earnings</TabsTrigger>
                       
                      </TabsList>



                    <TabsContent className='grow w-full grid grid-cols-1 justify-items-center content-center' value={currentTab}>

                      {
                        (()=>{
                            switch(currentTab){
                                case 'Generate':{
                                    return (
                                    

                                    
                                    <div>
                                        
                                        {
                                            !promoCode ?

                                       
                                        <div className='flex flex-col items-center'>
                                        <h1 className='font-semibold text-md text-center mb-6'>Welcome to TerraTinge! Start earning now, generate and share your promo code!</h1>
                                            
                                            <MuiServerProvider>
                                                <Button onClick={
                                                    ()=>{
                                                        setPromo('TerraTinge-56456njksahdsk')
                                                    }
                                                } 
                                                
                                                variant='contained' className={`${montserrat.className} p-3 text-white rounded-full bg-indigo-600 dark:bg-indigo-500`}>
                                                Generate PromoCode
                                                </Button>
                                            </MuiServerProvider>
                                        </div>

                                        :


                                        <div className='flex flex-col items-center'>
                                            <h1 className='font-semibold text-md max-w-md text-center mb-6'>Here&apos;s your promo code. Share it on LinkedIn, TikTok, Facebook, and more. Earn 5% profit from any project built with your code!</h1>
                                            

                                            <div className='flex flex-row items-center space-x-4'>
                                                <code className="text-xs bg-slate-100 text-black dark:bg-gray-700 dark:text-white p-1 rounded-sm">
                                                {promoCode}
                                                </code>
                                                
                                                <MuiServerProvider>

                                                
                                                <IconButton onClick={()=>{
                                                    navigator.clipboard.writeText(promoCode)
                                                    setCopied(true);
                                                  
                                                }} 
                                                aria-label="delete" className="p-3 bg-slate-100 dark:bg-gray-900">
                                                    {!copied?<ContentCopyIcon />:<CheckCircleIcon className='text-green-600'/>}
                                                </IconButton>

                                                </MuiServerProvider>
                                            </div>


                                        </div>

                                        

                                        }

                                    </div>
                                   
                                
                                )
                                }

                                case 'Earnings':{
                                    return 'no earnings yet'
                                }
                            }
                        })()
                      }


                     

                    </TabsContent>


                    

        </Tabs>

    )
}
