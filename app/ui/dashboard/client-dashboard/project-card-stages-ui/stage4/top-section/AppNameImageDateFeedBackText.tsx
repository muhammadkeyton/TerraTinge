
'use client';

import {useState,useEffect} from 'react';
import Image from 'next/image';

import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';


type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    paymentDate:string,
    completionDate:string,
    maintainanceEndDate:Date,
    appCostAndFee:number,
    paymentAmount:number,
    projectLink:string | null,
    promo?:string,
    discountedAppCostAndFee?:number
}

export default function AppNameImageDateFeedBackText({appName,paymentDate,projectLink,appCostAndFee,paymentAmount,completionDate,maintainanceEndDate,discountedAppCostAndFee,promo}:AppNameImageDateFeedBackTextProps){
    
    const [remainingTime, setRemainingTime] = useState<string>('');

    useEffect(() => {
        const endDate = maintainanceEndDate;

        const updateCountdown = () => {
            const remainingTime = calculateRemainingTime(endDate);
            setRemainingTime(remainingTime);
        };

        const timerInterval = setInterval(updateCountdown, 1000);

        return () => clearInterval(timerInterval);
    }, [maintainanceEndDate]);


    const imageToShow = (()=>{

        if(promo){
            if((discountedAppCostAndFee as number - paymentAmount) === 0){
                return '/handshake.gif'
            }else{
                return '/secure-payment.gif'
            }

        }else{
            if((appCostAndFee - paymentAmount) === 0){
                return '/handshake.gif'
            }else{
                return '/secure-payment.gif'
            }
        }
        
    })();

    const calculateRemainingTime = (endDate: Date) => {
        const now = new Date();
        const timeDifference = endDate.getTime() - now.getTime();
    
        if (timeDifference <= 0) {
            return 'Maintenance Duration Ended';
        }
    
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
    
    return(
        <>
            <div>
                <h2 className='text-xl font-bold '>{appName}</h2>
                <p className='text-sm my-4 font-medium'>Completion Date: {completionDate} </p>
                <p className='text-sm my-4 font-medium'>Start Date: {paymentDate}</p>
                <p className='text-sm my-4 font-medium'>Maintainance Period: 
                <span className='ml-2'><code className="text-lg bg-green-600 text-white p-1 rounded-sm">{remainingTime}</code></span>  
                </p>


                

                <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src={imageToShow} width={250} height={200} alt='project' />

                



                
                {

                (()=>{

                    if(promo && (discountedAppCostAndFee as number - paymentAmount)!== 0){
                        return (

                            <p className='mb-4 text-sm'>Balance Due: 
                                <span className='ml-4'>
                                <code className="text-xs bg-slate-200 text-black dark:text-white dark:bg-gray-600 p-1 rounded-sm">
                                {((discountedAppCostAndFee as number - paymentAmount)/100).toLocaleString()} USD
                                </code>
                                </span>
                            </p>

                        )

                    }else if(!promo && (appCostAndFee - paymentAmount) !== 0){


                        return (

                            <p className='mb-4 text-sm'>Balance Due: 
                                <span className='ml-4'>
                                <code className="text-xs bg-slate-200 text-black dark:text-white dark:bg-gray-600 p-1 rounded-sm">
                                {((appCostAndFee - paymentAmount)/100).toLocaleString()} USD
                                </code>
                                </span>
                            </p>

                        )

                        





                        
                    }

                })()




                }


                {
                    projectLink?
                    <a className='text-sm underline italic text-blue-600 dark:text-blue-400' href={projectLink} target='_blank'>View WebApp</a>

                    :

                    <code className="text-xs bg-slate-200 dark:bg-gray-600 dark:text-white  text-black p-1 rounded-sm">
                     project complete ✅
                    </code>
                    
                 }

                

                {


                   (()=>{


                    if(promo && (discountedAppCostAndFee as number - paymentAmount)!== 0){
                        return(
                            <p className='text-sm max-w-sm mt-4'>Your project is now complete! We are awaiting the final payment. Once received, we will assist you in deploying it to your domain, hosting, and app stores if applicable. We will also provide the full source code and guide you on which API keys to keep secret.</p>  
                        )
                    }else{
                        return (
                            <p className='text-sm max-w-sm mt-4'>Thank you for your business! Your project is now complete and fully paid up. We will help you deploy it, provide the full source code, and give you full access to your app. You have the freedom to work with other developers or with us. Your app, code, and hosting are fully yours, and we will only access it with your permission. We respect your ownership and value your trust. Additionally, you have 2 months of complimentary maintenance</p>
                        )
                    }



                   })()




                    
                }

               
            </div>

            <MuiServerProvider>
            <Divider className='dark:bg-slate-300 my-4'/>
            </MuiServerProvider>

        </>
    )
}