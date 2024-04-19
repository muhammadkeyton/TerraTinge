'use client';
import React, { useState, useRef, ReactNode, RefObject, ReactElement, useEffect } from 'react';

import { Button, IconButton, FormControl } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

function UltraWaveText({ children }: { children: ReactNode }) {
  return (
    <div className='text-black bg-gray-200 dark:bg-gray-300 p-2 rounded before:block before:absolute before:top-1.5 before:-left-1 before:h-2 before:w-2 before:rotate-45 before:bg-gray-200 dark:before:bg-gray-300 before:z-20 z-40 relative w-fit max-w-64'>
      {children}
    </div>
  );
}

function CustomerText({ children }: { children: ReactNode }) {
  return (
    <div className='self-end text-black bg-blue-200 dark:bg-blue-300 p-2 rounded before:block before:absolute before:top-1.5 before:-right-1 before:h-2 before:w-2 before:rotate-45 before:bg-blue-200 dark:before:bg-blue-300 before:z-20 z-40 relative w-fit max-w-64'>
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

  useEffect(() => {
    chatInputRef!.current!.focus();
  }, []);

  function handleKeyPress(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTimeout(sendMessage, 200);
    }
  }

  function sendMessage() {
    chatInputRef!.current!.value = chatInputRef!.current!.value.trim();
    if (chatInputRef!.current!.value === '') return;
    // console.log(chatInputRef!.current!.value);
    updateChatData(chatInputRef!.current!.value);
    chatInputRef!.current!.value = '';
    chatInputRef!.current!.focus();
    // console.log(chatBoxRef.current);
    setTimeout(() => {
      chatBoxRef!.current!.scrollTop = chatBoxRef!.current!.scrollHeight - chatBoxRef!.current!.clientHeight;
    }, 200);
  }

  function updateChatData(text: string) {
    setChatHistory((cur) => [...cur, { author: 'customer', content: text }]);
  }

  return (
    <div className=' bg-white w-full dark:text-white dark:bg-black rounded-2xl overflow-hidden shadow-lg dark:shadow-lg-white relative h-full pointer-events-auto flex flex-col'>
      <div className='text-white dark:text-black dark:bg-white bg-gray-800 p-4 flex flex-col gap-2'>
        <h2 className='text-xl font-bold'>UltraWave Chat</h2>
      </div>
      <div className='py-4 px-2 text-sm flex flex-col gap-2 overflow-y-scroll flex-grow' ref={chatBoxRef}>
        {chatHistory.map((text, i) =>
          text.author === 'ultrawave' ? (
            <UltraWaveText key={i}>
              <p className='overflow-hidden'>{text.content}</p>
            </UltraWaveText>
          ) : (
            <CustomerText key={i}>
              <p className='overflow-hidden'>{text.content}</p>
            </CustomerText>
          ),
        )}
      </div>
      <div className='p-2 sm:p-4 text-sm flex flex-col gap-6'>
        <FormControl fullWidth className='flex flex-row items-center mr-2 gap-2'>
          <TextareaAutosize
            aria-label='empty textarea'
            placeholder='I need help with...'
            className='border-2 rounded border-black text-black bg-white dark:border-white dark:text-white dark:bg-black p-1 resize-none w-full'
            ref={chatInputRef}
            onKeyDown={handleKeyPress}
          />
          <Button className='bg-black text-white dark:bg-white dark:text-black p-2 h-8 flex items-center justify-center self-end' onClick={() => setTimeout(sendMessage, 200)}>
            <SendIcon />
          </Button>
        </FormControl>
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
