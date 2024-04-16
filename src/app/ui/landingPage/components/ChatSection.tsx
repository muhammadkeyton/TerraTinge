import { Button } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

export default function ChatSection() {
  return (
    <Button className='fixed bottom-5 right-5 group transition-all bg-black text-white dark:text-black dark:bg-white flex rounded-full'>
      <div className='text-sm text-left w-0 h-0 overflow-hidden group-hover:pl-7 group-hover:w-auto group-hover:h-auto flex flex-col gap-1 justify-center'>
        <h2 className='font-semibold'>Need help?</h2>
        <p>Click to chat with us!</p>
      </div>
      <div className='p-5 text-2xl'>
        <ChatIcon fontSize='inherit' />
      </div>
    </Button>
  );
}
