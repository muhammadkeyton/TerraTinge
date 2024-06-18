import Link from 'next/link'
import Image from 'next/image';
import { montserrat } from '@/app/ui/fonts';
import Button from '@mui/material/Button';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';
export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen px-4'>

      <div className='flex flex-col space-y-6 my-6'>
      <Image className='rounded-full mb-4' priority={true} src='/not-found.jpg' width={300} height={300} alt='notfound'/>
      <h2 className='font-bold text-2xl'>☹️ Not Found, 404</h2>
      <p className='max-w-sm'>We could not find that page you are looking for</p>
      
       <Link href='/' tabIndex={-1} className='bg-red-500 w-36 h-10 rounded-full'>
          <MuiServerProvider>
          <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-36 h-10 rounded-full normal-case`}>
            Return Home
          </Button>
          </MuiServerProvider>
        </Link>
      </div>
    </div>
  )
}