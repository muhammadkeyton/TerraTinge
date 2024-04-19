'use client';
import { useState } from 'react';

import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import ChatStartBox from './ChatStartBox';
import ChatTextBox from './ChatTextBox';

export default function ChatSection() {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [startChat, setStartChat] = useState<boolean>(false);

  return (
    <div className='w-screen max-w-screen-2xl mx-auto fixed bottom-0 right-0 left-0 top-20 sm:top-32 pointer-events-none'>
      <div className='z-50 flex flex-col justify-end gap-5 max-w-md ml-auto sm:px-10 absolute bottom-0 right-0 left-0 sm:bottom-5 h-full max-h-128'>
        {/* Chat box */}
        {openChat && (startChat ? <ChatTextBox setOpenChat={setOpenChat} setStartChat={setStartChat} /> : <ChatStartBox setOpenChat={setOpenChat} setStartChat={setStartChat} />)}

        {/* Chat button */}
        <Button
          className={`group bg-black text-white dark:text-black dark:bg-white flex rounded-full self-end pointer-events-auto mx-5 sm:mx-0 mb-5 sm:mb-0 ${openChat ? 'hidden' : ''}`}
          onClick={() => setTimeout(() => setOpenChat((cur) => !cur), 200)}
        >
          {!openChat && (
            <div className='text-sm text-left w-0 h-0 overflow-hidden group-hover:pl-7 group-hover:w-auto group-hover:h-auto flex flex-col gap-1 justify-center transition-all'>
              <h2 className='font-bold'>Need help?</h2>
              <p>Click to chat with us!</p>
            </div>
          )}
          <div className='p-5 text-2xl md:text-3xl'>{openChat ? <CloseIcon fontSize='inherit' /> : <ChatIcon fontSize='inherit' />}</div>
        </Button>
      </div>
    </div>
  );
}
