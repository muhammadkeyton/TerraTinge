
'use client';

import { useRouter,usePathname } from 'next/navigation';


import AppBar from '@mui/material/AppBar';
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
      <AppBar className='mb-16 backdrop-blur-md bg-inherit border-none outline-none w-full flex flex-row justify-center'>
        <div className='flex flex-row px-3 py-3 justify-between items-center w-full sm:max-w-screen-xl'>
        
          <Button onClick={()=>{
            if(pathname == '/authentication' || pathname == '/partnership'){
              router.push('/');
            }else{
              router.back();
            }
          }} tabIndex={-1} startIcon={<ArrowBackIcon className='text-3xl' />} className={`${montserrat.className} text-slate-800 dark:text-white`}></Button>
          

          <ThemeSwitch />
        </div>
      </AppBar>
    </MuiServerProvider>
  );
}

export default NavBar;
