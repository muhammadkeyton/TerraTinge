import React from 'react';

import { Button, TextField, FormControl, FormLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatStartBox({ setOpenChat, setStartChat }: { setOpenChat: Function; setStartChat: Function }) {
  return (
    <div className=' bg-white text-black dark:text-white dark:bg-black w-full  rounded-2xl overflow-hidden shadow-lg dark:shadow-lg-white relative pointer-events-auto'>
      <div className='text-white dark:text-black dark:bg-white bg-gray-800 p-4 flex flex-col gap-2'>
        <h2 className='text-xl font-bold w-3/4'>Welcome to Ultrawave Chat</h2>
        <p className='text-sm'>Let us know how we can help!</p>
      </div>
      <div className='p-4 flex flex-col gap-6'>
        <FormControl fullWidth className='flex flex-col gap-1 text-white'>
          <FormLabel className='text-black dark:text-white'>Name (Optional)</FormLabel>
          <input type='text' className='border-2 rounded border-black dark:border-white p-1 text-black bg-white dark:bg-black dark:text-white' />
          <FormLabel className='text-black dark:text-white'>Email (Optional)</FormLabel>
          <input type='email' className='border-2 rounded border-black dark:border-white p-1 text-black bg-white dark:bg-black dark:text-white' />
        </FormControl>

        <Button variant='contained' className='text-white p-1 bg-indigo-700' onClick={() => setTimeout(() => setStartChat(true), 200)}>
          Start Chat
        </Button>
      </div>
      <div>
        <p className='text-gray-400 pb-2 text-center text-sm'>Powered by UltraWave</p>
      </div>
      <IconButton className='absolute top-1 right-1 p-3 text-white dark:text-black' onClick={() => setTimeout(() => setOpenChat(false), 200)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
