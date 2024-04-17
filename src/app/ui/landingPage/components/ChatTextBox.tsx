import React from 'react';

import { Button, IconButton, TextField, FormControl } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatTextBox({ setOpenChat, setStartChat }) {
  return (
    <div className=' bg-white w-full  rounded-2xl overflow-hidden shadow-lg'>
      <div className='text-white bg-gray-800 p-4 flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>UltraWave Chat</h2>
      </div>
      <div className='p-2'>
        <p className='text-black bg-gray-200 p-2'>Hello, how can we help you today?</p>
      </div>
      <div className='p-4 flex flex-col gap-6'>
        <FormControl fullWidth className='relative flex flex-row items-center mr-2'>
          <TextareaAutosize aria-label='empty textarea' placeholder='I need help with...' className='border-2 rounded border-black text-black bg-white p-1 resize-none pr-16' />
          <Button className='absolute right-0 top-0 bg-black text-white p-2 h-9 flex items-center justify-center' onClick={() => setTimeout(() => setStartChat(true), 200)}>
            <SendIcon />
          </Button>
        </FormControl>
      </div>
      <IconButton className='absolute top-1 right-1 p-3' onClick={() => setTimeout(() => setOpenChat(false), 200)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
