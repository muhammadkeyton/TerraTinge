'use client';
import { useState } from 'react';

import { Button, TextField, FormControl, FormLabel } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatSection() {
  const [openChat, setOpenChat] = useState(false);

  return (
    <div className='fixed bottom-5 right-5 flex flex-col gap-5 max-w-64'>
      {/* Chat box */}
      {openChat && (
        <div className='bg-black text-white dark:text-black dark:bg-white w-full  rounded-2xl overflow-hidden'>
          <div className='bg-gray-200 text-black dark:text-white dark:bg-gray-800 p-4 flex flex-col gap-2'>
            <h2 className='text-xl font-bold'>Welcome to UltraWave Chat</h2>
            <p className='text-sm'>Let us know how we can help!</p>
          </div>
          <FormControl fullWidth className='p-4'>
            <FormLabel>Name (Optional)</FormLabel>
            <TextField />
            <FormLabel>Email (Optional)</FormLabel>
            <TextField />
            <Button variant='contained' endIcon={<SendIcon />} sx={{ color: 'blue' }} classes='bg-black'>
              Start Chat
            </Button>
          </FormControl>
        </div>
      )}

      {/* Chat button */}
      <Button className='group bg-black text-white dark:text-black dark:bg-white flex rounded-full self-end' onClick={() => setTimeout(() => setOpenChat((cur) => !cur), 200)}>
        {!openChat && (
          <div className='text-sm text-left w-0 h-0 overflow-hidden group-hover:pl-7 group-hover:w-auto group-hover:h-auto flex flex-col gap-1 justify-center transition-all'>
            <h2 className='font-bold'>Need help?</h2>
            <p>Click to chat with us!</p>
          </div>
        )}
        <div className='p-5 text-2xl'>{openChat ? <CloseIcon fontSize='inherit' /> : <ChatIcon fontSize='inherit' />}</div>
      </Button>
    </div>
  );
}
