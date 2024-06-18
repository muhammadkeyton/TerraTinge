'use client';

import {useState} from 'react';

import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TerraTextField from '../../../reusable-components/terra-textfield';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useChatState from './state';
import { montserrat } from '@/app/ui/fonts';
import clsx from 'clsx';
import { InquiryDataServer } from '@/app/lib/definitions';
import { sendMessage } from '@/app/server-actions/landingpage-messaging/sendmessage';
import CircularProgress from '@mui/material/CircularProgress';
import confettiSideCannons from '@/app/ui/landing-page/magic-ui/confetti';


type ChatStartBoxProps = {
  chatControl: () => void;
};
export default function ChatStartBox({chatControl}:ChatStartBoxProps) {
  const {emptyField,inquiryData,trackInquiryData,validateInquiryData} = useChatState();

  const [messageProcess,setProcess] = useState({
    text:'',
    loading:false,
    error:false

  });


  return (
    <div className='border-solid border-2 border-slate-200 dark:border-indigo-400 bg-white text-black dark:text-white dark:bg-black w-full sm:max-h-fit rounded-b-none rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-lg dark:shadow-indigo-500/50 relative pointer-events-auto'>
      <div className='text-white dark:text-black dark:bg-white bg-gray-800 p-4 flex flex-col gap-4'>
        <h2 className='text-xl font-bold w-3/4'>Welcome to TerraTinge</h2>
        <p className='text-sm'>Your questions are vital to us. Ask freely, and expect our swift response. You are our priority.</p>
      </div>
      <div className='p-4 flex flex-col gap-4'>
      

        {
        
          (!messageProcess.loading && messageProcess.text.length < 1 ) ?
        
      
      
      
        <form onSubmit={async(event)=>{
           event.preventDefault()
           const dataOk = validateInquiryData(inquiryData);

           if(dataOk){
            
            if(!navigator.onLine){
              alert(`Hi ${inquiryData.name.text},please connect your device to the internet,we are unable to send your message without internet connection!`);
              return;
            }


            //start loading
            setProcess({
              ...messageProcess,
              loading:true
            });

            const messageData:InquiryDataServer = {
              name:inquiryData.name.text,
              email:inquiryData.email.text,
              message:inquiryData.message.text,
              
            }

            const serverDataOk = await sendMessage(messageData);

            if(!serverDataOk){
              let dataOk = validateInquiryData(inquiryData);
              if(dataOk){
                  alert(`Hi ${inquiryData.name.text},something went wrong while trying to send your message,we apologize for the inconvinience,try again later`)
                  setProcess({
                    text:'something went wrong,try again later',
                    loading:false,
                    error:true
                  });
                  
              }
          }else{
            confettiSideCannons();
            setProcess({
              error:false,
              text:`hey ${inquiryData.name.text},we have received your message,and will get back to you within 24 hours`,
              loading:false
            });


           
          }

            


            
           }
        }}>


          <TerraTextField
          name='name'
          label='Your Name'
          type='text'
          error={inquiryData.name.error}
          helperText={inquiryData.name.helperText}
          value={inquiryData.name.text}
          onChange={(event)=>{trackInquiryData(event)}}
          />

        <TerraTextField
          name='email'
          label='Your Email'
          type='text'
          error={inquiryData.email.error}
          helperText={inquiryData.email.helperText}
          value={inquiryData.email.text}
          onChange={(event)=>{trackInquiryData(event)}}
        />


        <TerraTextField
          name='message'
          label='how can we help you?'
          type='text'
          value={inquiryData.message.text}
          error={inquiryData.message.error}
          helperText={inquiryData.message.helperText}
          onChange={(event)=>{trackInquiryData(event)}}
          inputProps={
            {
                maxLength:1000
            }
          }
          multiline={true}
        />
        
        <MuiServerProvider>
        <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':!emptyField,
                                'bg-inherit': emptyField
                            }
                        )
                   
                    }
                    >Send Message
        </Button>
        </MuiServerProvider>



        </form>

        :

        (messageProcess.text.length > 0 && !messageProcess.loading) ?

        <div className="flex flex-col items-center justify-center w-full my-6">
            <div
              
              className="block cursor-pointer max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
            >
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
                {messageProcess.error?'❌Message Not Sent❌':'🎊Message Sent🎊'}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {messageProcess.text}
              </p>
            </div>
          
          </div>

          :

          <MuiServerProvider>
            <div className='flex justify-center items-center my-12'>
            <CircularProgress className='text-indigo-700' size={60}/>
            </div>
          </MuiServerProvider>



        }
        
      </div>
      <div>
        <p className='text-gray-400 pb-2 text-center text-sm'>Powered by TerraTinge</p>
      </div>

      <MuiServerProvider>
      <IconButton disabled={messageProcess.loading} className='absolute top-1 right-1 p-3 text-white dark:text-black' onClick={chatControl}>
        <CloseIcon />
      </IconButton>
      </MuiServerProvider>
    </div>
  );
}
