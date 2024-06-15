'use client';
import { useState } from 'react';

import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import ChatStartBox from './chat-start-box';
import MuiServerProvider from '../../mui-providers/mui-server-provider';

export default function ChatSection() {
  const [openChat, setOpenChat] = useState<boolean>(false);
 

  return (
    <div className='w-screen max-w-screen-2xl mx-auto fixed bottom-0 right-0 left-0 top-0 sm:top-32 pointer-events-none z-20'>
      <div className='z-50 flex flex-col justify-end gap-5 max-w-md ml-auto sm:px-10 absolute bottom-0 right-0 left-0 sm:bottom-5 h-full sm:max-h-128'>
        {/* Chat box */}
        {openChat && <ChatStartBox  />}

        {/* Chat button */}


        <MuiServerProvider>
        <Button
          className={`group bg-black text-white dark:text-black dark:bg-white flex rounded-full self-end pointer-events-auto mx-5 sm:mx-0 mb-5 sm:mb-0 ${openChat ? 'hidden' : ''}`}
          onClick={() => setOpenChat((cur) => !cur) }
        >
          {!openChat && (
            <div className='text-sm text-left w-0 h-0 overflow-hidden group-hover:pl-7 group-hover:w-auto group-hover:h-auto flex flex-col gap-1 justify-center transition-all'>
              <h2 className='font-bold'>Need help?</h2>
              <p>Click to chat with us!</p>
            </div>
          )}
          <div className='p-5 text-2xl md:text-3xl'>{openChat ? <CloseIcon fontSize='inherit' /> : <ChatIcon fontSize='inherit' />}</div>
        </Button>
        </MuiServerProvider>
      </div>
    </div>
  );
}
