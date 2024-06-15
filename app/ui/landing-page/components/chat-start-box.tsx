import React from 'react';

import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TerraTextField from '../../reusable-components/terra-textfield';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';

export default function ChatStartBox() {
  return (
    <div className=' bg-white text-black dark:text-white dark:bg-black w-full  rounded-2xl overflow-hidden shadow-lg dark:shadow-indigo-500/50 relative pointer-events-auto'>
      <div className='text-white dark:text-black dark:bg-white bg-gray-800 p-4 flex flex-col gap-4 mb-4'>
        <h2 className='text-xl font-bold w-3/4'>Welcome to TerraTinge</h2>
        <p className='text-sm'>Your questions are vital to us. Ask freely, and expect our swift response. You are our priority.</p>
      </div>
      <div className='p-4 flex flex-col gap-6'>
        <form>
          <TerraTextField
          name='name'
          label='Your Name'
          type='text'
          value='client name'
          onChange={()=>{}}
          />

        <TerraTextField
          name='email'
          label='Your Email'
          type='text'
          value='client email'
          onChange={()=>{}}
        />


        <TerraTextField
          name='message'
          label='how can we help you?'
          type='text'
          value='client inquiry'
          onChange={()=>{}}
        />



        </form>
        <MuiServerProvider>
          <Button variant='contained' className='text-white p-1 bg-indigo-700' onClick={()=>{}}>
            Send Message
          </Button>
        </MuiServerProvider>
      </div>
      <div>
        <p className='text-gray-400 pb-2 text-center text-sm'>Powered by TerraTinge</p>
      </div>

      <MuiServerProvider>
      <IconButton className='absolute top-1 right-1 p-3 text-white dark:text-black' onClick={() => {}}>
        <CloseIcon />
      </IconButton>
      </MuiServerProvider>
    </div>
  );
}
