import React from 'react';

import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TerraTextField from '../../../reusable-components/terra-textfield';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useChatState from './state';
import { montserrat } from '@/app/ui/fonts';
import clsx from 'clsx';

type ChatStartBoxProps = {
  chatControl: () => void;
};
export default function ChatStartBox({chatControl}:ChatStartBoxProps) {
  const {emptyField,inquiryData,trackInquiryData,validateInquiryData} = useChatState();
  return (
    <div className='border-solid border-2 border-slate-200 dark:border-indigo-400 bg-white text-black dark:text-white dark:bg-black w-full sm:max-h-fit rounded-b-none rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-lg dark:shadow-indigo-500/50 relative pointer-events-auto'>
      <div className='text-white dark:text-black dark:bg-white bg-gray-800 p-4 flex flex-col gap-4'>
        <h2 className='text-xl font-bold w-3/4'>Welcome to TerraTinge</h2>
        <p className='text-sm'>Your questions are vital to us. Ask freely, and expect our swift response. You are our priority.</p>
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <form>
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
        
      </div>
      <div>
        <p className='text-gray-400 pb-2 text-center text-sm'>Powered by TerraTinge</p>
      </div>

      <MuiServerProvider>
      <IconButton className='absolute top-1 right-1 p-3 text-white dark:text-black' onClick={chatControl}>
        <CloseIcon />
      </IconButton>
      </MuiServerProvider>
    </div>
  );
}
