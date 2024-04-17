'use client';
import { useState } from 'react';

import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import ChatStartBox from './ChatStartBox';
import ChatTextBox from './ChatTextBox';

export default function ChatSection() {
  const [openChat, setOpenChat] = useState(false);
  const [startChat, setStartChat] = useState(false);

  return (
    <div className='z-10 fixed bottom-5 right-5 flex flex-col gap-5 max-w-64'>
      {/* Chat box */}
      {openChat && (startChat ? <ChatTextBox setOpenChat={setOpenChat} setStartChat={setStartChat} /> : <ChatStartBox setOpenChat={setOpenChat} setStartChat={setStartChat} />)}

      {/* Chat button */}
      <Button className='group bg-black text-white dark:text-black dark:bg-white flex rounded-full self-end' onClick={() => setTimeout(() => setOpenChat((cur) => !cur), 200)}>
        {!openChat && (
          <div className='text-sm text-left w-0 h-0 overflow-hidden group-hover:pl-7 group-hover:w-auto group-hover:h-auto flex flex-col gap-1 justify-center transition-all'>
            <h2 className='font-bold'>Need help?</h2>
            <p>Click to chat with us!</p>
          </div>
        )}
        <div className='p-5 text-2xl md:text-3xl'>{openChat ? <CloseIcon fontSize='inherit' /> : <ChatIcon fontSize='inherit' />}</div>
      </Button>
    </div>
  );
}
