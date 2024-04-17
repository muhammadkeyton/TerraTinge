import React from 'react';

import { Button, TextField, FormControl, FormLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ChatStartBox({ setOpenChat, setStartChat }: { setOpenChat: Function; setStartChat: Function }) {
  return (
    <div className=' bg-white w-full  rounded-2xl overflow-hidden shadow-lg'>
      <div className='text-white bg-gray-800 p-4 flex flex-col gap-2'>
        <h2 className='text-xl font-bold w-3/4'>Welcome to Ultrawave Chat</h2>
        <p className='text-sm'>Let us know how we can help!</p>
      </div>
      <div className='p-4 flex flex-col gap-6'>
        <FormControl fullWidth className='flex flex-col gap-1'>
          <FormLabel className='text-black'>Name (Optional)</FormLabel>
          <TextField className='border-2 rounded border-black p-1' />
          <FormLabel className='text-black'>Email (Optional)</FormLabel>
          <TextField className='border-2 rounded border-black p-1' />
        </FormControl>

        <Button variant='contained' className='bg-black text-white p-1' onClick={() => setTimeout(() => setStartChat(true), 200)}>
          Start Chat
        </Button>
      </div>
      <IconButton className='absolute top-1 right-1 p-3' onClick={() => setTimeout(() => setOpenChat(false), 200)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
