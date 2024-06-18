
'use client';

import { useRouter,usePathname } from 'next/navigation';



import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { montserrat } from '@/app/ui/fonts';
import ThemeSwitch from '../landing-page/mui-components/theme-switch';
import MuiServerProvider from '../mui-providers/mui-server-provider';

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <MuiServerProvider>
    
        <div className='z-10 fixed shadow-lg h-14  top-0 left-0 right-0 backdrop-blur-md bg-inherit border-none outline-none flex flex-row justify-between md:px-16 items-center w-screen'>
        
          <Button onClick={()=>{
            if(pathname == '/authentication' || pathname == '/partnership'){
              router.push('/');
            }else{
              router.back();
            }
          }} tabIndex={-1} startIcon={<ArrowBackIcon className='text-3xl' />} className={`${montserrat.className} text-slate-800 dark:text-white`}></Button>
          

          <ThemeSwitch />
        </div>
      
    </MuiServerProvider>
  );
}

export default NavBar;
