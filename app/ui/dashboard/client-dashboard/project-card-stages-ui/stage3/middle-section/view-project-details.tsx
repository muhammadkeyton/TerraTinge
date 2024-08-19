import useWindowWidth from "@/app/ui/dashboard/reuseable-components/hooks/detect-window-width";
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { montserrat } from "@/app/ui/fonts";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../../../../shadcn-components/dialog';
  
  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "../../../../shadcn-components/sheet"
import { ProjectPayment } from "@/app/lib/definitions";



type ViewProjectDetails = {
    appName:string,
    appCostAndFee:number,
    paymentAmount:number,
    appDetail:string,
    paymentStatus:ProjectPayment,
    promo?:string,
    discountedAppCostAndFee?:number
    
}

export default function ViewProjectDetails({appName,appCostAndFee,paymentAmount,appDetail,paymentStatus,discountedAppCostAndFee,promo}:ViewProjectDetails){
  const {isDesktop,windowWidth} = useWindowWidth();

  const noPromoCost = (appCostAndFee/100).toLocaleString();
  const promoCost = (discountedAppCostAndFee as number / 100).toLocaleString();
  const initialPayment = (paymentAmount/100).toLocaleString();

  const noPromobalance = ((appCostAndFee - paymentAmount)/100).toLocaleString();
  const promoBalance = ((discountedAppCostAndFee as number - paymentAmount)/100).toLocaleString();


  

  const appDetailLines = appDetail.split('\n');
  

  if(isDesktop || windowWidth >= 768){
    return(
     
  
                   <Dialog>
                   <MuiServerProvider>
                    <DialogTrigger asChild>
                     
                        <Button variant='text' className={`${montserrat.className} p-3 text-indigo-600 dark:text-indigo-500`}>
                        App Details & Payment Status
                        </Button>
                      
                    </DialogTrigger>
                    </MuiServerProvider>
                  <DialogContent className="max-w-lg h-[80vh] flex flex-col bg-white dark:bg-black">
                    <DialogHeader className='mb-4'>
                      <DialogTitle className='mb-2'>{appName}</DialogTitle>
                      <DialogDescription >
                        Features And Payment Status
                      </DialogDescription>
                    </DialogHeader>
  
  
                    <div className='overflow-y-auto flex-grow flex flex-col gap-12'>

                    <div className='flex flex-col gap-4'>
                          <h2 className='font-bold mb-2 text-sm'>{appName} Payment Status:</h2>

                          <div className='flex flex-row space-x-4 items-center'>
                            <p>total cost:</p>

                            <div className='flex flex-row space-x-2'>
                            <p className={`text-md p-1 ${promo && 'line-through decoration-2 decoration-red-500'} rounded-sm`}>${noPromoCost} USD</p>
                            {promo && <p className="text-md p-1 rounded-sm">${promoCost} USD</p>}
                            </div>
                            

                          </div>



                          {
                           paymentStatus !== ProjectPayment.pending &&
                          <>
                          <div className='flex flex-row space-x-4 items-center'>
                            <p>initial payment:</p>
                            <div className="text-md p-1 rounded-sm">${initialPayment} USD</div>

                          </div>


                          <div className='flex flex-row space-x-4 items-center'>
                            <p>remaining balance:</p>
                            <div className="text-md p-1 rounded-sm">${promo?promoBalance:noPromobalance} USD</div>

                          </div>
                          </>


                         }











                          <div className='flex flex-row space-x-4 items-center'>
                            <p>payment status:</p>

                            {(()=>{

                              switch ( paymentStatus) {
                                case ProjectPayment.pending:{
                                  return ( <code className="text-md bg-orange-600  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.initial:{
                                  return ( <code className="text-md bg-indigo-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.paid:{
                                  return ( <code className="text-md bg-green-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.processing:{
                                  return ( <code className="text-md bg-violet-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }
                                  
                                 
                              
                                default:
                                  throw new Error(`${ paymentStatus} is unrecognized,this is unexpected`)
                              }

                            })()
                            
                            }
                            

                          </div>
                          
                        </div>

                        <Divider className='dark:bg-slate-300'/>
                    
                        <div>
                          <h2 className='font-bold mb-2 text-sm'>{appName} Features:</h2>
                          
                           
                          {appDetailLines.map((line, index) => (
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
          App Details & Payment Status
        </Button>
          
        </SheetTrigger>
      </MuiServerProvider>
        <SheetContent side='bottom' className='h-[80vh] flex flex-col bg-white dark:bg-black border-none  rounded-t-xl'>
          <SheetHeader className='mb-4'>
            <SheetTitle className='mb-2'>{appName}</SheetTitle>
            <SheetDescription>
            Features And Payment Status
            </SheetDescription>
          </SheetHeader>
  
          <div className='overflow-y-auto flex-grow flex flex-col gap-12'>
                    
                     <div className='flex flex-col gap-4'>
                          <h2 className='font-bold mb-2 text-sm'>{appName} Payment Status:</h2>

                          <div className='flex flex-row space-x-4 items-center'>
                            <p>total cost:</p>

                            <div className='flex flex-row space-x-2'>
                            <p className={`text-md p-1 ${promo && 'line-through decoration-2 decoration-red-500'} rounded-sm`}>${noPromoCost} USD</p>
                            {promo && <p className="text-md p-1 rounded-sm">${promoCost} USD</p>}
                            </div>
                            

                          </div>



                          {
                           paymentStatus !== ProjectPayment.pending &&
                          <>
                          <div className='flex flex-row space-x-4 items-center'>
                            <p>initial payment:</p>
                            <div className="text-md p-1 rounded-sm">${initialPayment} USD</div>

                          </div>


                          <div className='flex flex-row space-x-4 items-center'>
                            <p>remaining balance:</p>
                            <div className="text-md p-1 rounded-sm">${promo?promoBalance:noPromobalance} USD</div>

                          </div>
                          </>


                         }










                          <div className='flex flex-row space-x-4 items-center'>
                            <p>payment status:</p>

                            {(()=>{

                              switch ( paymentStatus) {
                                case ProjectPayment.pending:{
                                  return ( <code className="text-md bg-orange-600  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.initial:{
                                  return ( <code className="text-md bg-indigo-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.paid:{
                                  return ( <code className="text-md bg-green-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }

                                case ProjectPayment.processing:{
                                  return ( <code className="text-md bg-violet-700  text-white p-1 rounded-sm">{ paymentStatus}</code>)
                                }
                                  
                                 
                              
                                default:
                                  throw new Error(`${ paymentStatus} is unrecognized,this is unexpected`)
                              }

                            })()
                            
                            }
                            

                          </div>
                          
                        </div>

                        <Divider className='dark:bg-slate-300'/>
                    
                        <div>
                          <h2 className='font-bold mb-2 text-sm'>{appName} Features:</h2>
                          
                           
                          {appDetailLines.map((line, index) => (
                            <p className='text-sm mt-4' key={index}>{line}</p>
                          ))}
         
                        </div>

                        
                    



                
                    
                 
                   
                
                
              </div>
          
        
        </SheetContent>
      </Sheet>
    
      
  
    )







}

