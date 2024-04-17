'use client';
import React, { useState, useRef, ReactNode, RefObject, ReactElement } from 'react';

import { Button, IconButton, FormControl } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

function UltraWaveText({ children }: { children: ReactNode }) {
  return (
    <div className='text-black bg-gray-200 p-2 rounded before:block before:absolute before:top-1.5 before:-left-1 before:h-2 before:w-2 before:rotate-45 before:bg-gray-200 before:z-20 z-40 relative w-fit max-w-3/4'>
      {children}
    </div>
  );
}

function CustomerText({ children }: { children: ReactNode }) {
  return (
    <div className='self-end text-black bg-blue-200 p-2 rounded before:block before:absolute before:top-1.5 before:-right-1 before:h-2 before:w-2 before:rotate-45 before:bg-blue-200 before:z-20 z-40 relative w-fit max-w-3/4'>
      {children}
    </div>
  );
}

export default function ChatTextBox({ setOpenChat, setStartChat }: { setOpenChat: Function; setStartChat: Function }) {
  const [chatHistory, setChatHistory] = useState([
    { author: 'ultrawave', content: 'Hello, how can we help you today?' },
    // { author: 'customer', content: 'I need a website for my business.' },
  ]);

  const chatInputRef = React.useRef<HTMLTextAreaElement>(null);
  const chatBoxRef = React.useRef<HTMLDivElement>(null);

  function sendMessage() {
    chatInputRef!.current!.value = chatInputRef!.current!.value.trim();
    if (chatInputRef!.current!.value === '') return;
    setChatHistory((cur) => [...cur, { author: 'customer', content: chatInputRef!.current!.value }]);
    chatInputRef!.current!.value = '';
    chatInputRef!.current!.focus();
    console.log(chatBoxRef.current);
    setTimeout(() => {
      chatBoxRef!.current!.scrollTop = chatBoxRef!.current!.scrollHeight - chatBoxRef!.current!.clientHeight;
    }, 200);
  }

  return (
    <div className=' bg-white w-full  rounded-2xl overflow-hidden shadow-lg'>
      <div className='text-white bg-gray-800 p-4 flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>UltraWave Chat</h2>
      </div>
      <div className='p-2 text-sm flex flex-col gap-2 max-h-48 min-h-24 overflow-y-scroll' ref={chatBoxRef}>
        {chatHistory.map((text, i) =>
          text.author === 'ultrawave' ? (
            <UltraWaveText key={i}>
              <p>{text.content}</p>
            </UltraWaveText>
          ) : (
            <CustomerText key={i}>
              <p>{text.content}</p>
            </CustomerText>
          ),
        )}
      </div>
      <div className='p-4 text-sm flex flex-col gap-6'>
        <FormControl fullWidth className='relative flex flex-row items-center mr-2'>
          <TextareaAutosize
            aria-label='empty textarea'
            placeholder='I need help with...'
            className='border-2 rounded border-black text-black bg-white p-1 resize-none pr-20 w-full'
            ref={chatInputRef}
          />
          <Button className='absolute right-0 bottom-0 bg-black text-white p-2 h-8 flex items-center justify-center' onClick={() => setTimeout(sendMessage, 200)}>
            <SendIcon />
          </Button>
        </FormControl>
      </div>
      <IconButton className='absolute top-1 right-1 p-3 text-white' onClick={() => setTimeout(() => setOpenChat(false), 200)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
