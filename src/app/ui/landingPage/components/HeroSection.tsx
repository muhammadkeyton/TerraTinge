import Button from '@mui/material/Button';
import Link from 'next/link';

import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ComputerIcon from '@mui/icons-material/Computer';

import { montserrat } from '@/app/ui/fonts';

interface AppPropType {
  icon: any;
  type: string;
}

function AppType({ icon, type }: AppPropType) {
  return (
    <div className='bg-gray-600 dark:bg-gray-800 flex flex-wrap space-x-1 p-2 rounded-lg items-center'>
      <div className='flex justify-center items-center bg-white dark:bg-gray-600 rounded-full h-12 w-12'>{icon}</div>

      <div>
        <h5 className='text-xs '>{type}</h5>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <div id='hero' className='flex flex-col  space-y-12 md:space-x-4 md:space-y-0 md:flex-row lg:flex-row pt-28 mb-32 justify-around '>
      <div className='basis-1/2 xl:basis-1/3 flex flex-col space-y-4 '>
        <h1 className='text-lg text-gray-600 dark:text-gray-100 font-medium'>Software Development Company</h1>
        <h4 className='text-2xl dark:text-white font-bold  max-w-sm'>Elevate Your Digital Experience with Our Exquisite Software Solutions</h4>
        <p className='text-base text-gray-700 dark:text-gray-300 font-medium max-w-prose'>
          We architect aesthetically pleasing, user-centric mobile and web applications that are a breeze to navigate. Our bespoke software solutions streamline your business
          operations and enhance customer satisfaction. Embark on a transformative digital journey with us.
        </p>

        <Link href='Authentication/Register' tabIndex={-1}>
          <Button variant='contained' className={`${montserrat.className} text-base bg-indigo-700 text-white hover:bg-indigo-500 w-36 h-10 font-app rounded-full normal-case`}>
            Get Started
          </Button>
        </Link>
      </div>

      <div className=' basis-1/2  xl:basis-1/3 grid grid-cols-2 gap-x-3.5'>
        <div className='dark:bg-slate-950 bg-slate-800 text-white rounded-lg px-3.5 py-4 space-y-6'>
          <h4>What We Build</h4>

          <AppType type='Mobile Apps' icon={<SmartphoneIcon className='text-slate-800 dark:text-white text-2xl' />} />

          <AppType type='Web Apps' icon={<ComputerIcon className='text-slate-800 dark:text-white text-2xl' />} />
        </div>

        <div className=' text-white flex flex-col space-y-3'>
          <div className='basis-1/2 bg-slate-200 text-slate-800 rounded-lg flex flex-col items-center py-4 px-8 space-y-4'>
            <h4 className='font-bold text-2xl'>300+</h4>
            <p className='text-xs'>Projects Completed for big brands around the world!</p>
          </div>

          <div className='bg-cover bg-center basis-1/2  rounded-lg' style={{ backgroundImage: `url(/ProgrammingImage.jpg)` }}></div>
        </div>
      </div>
    </div>
  );
}
