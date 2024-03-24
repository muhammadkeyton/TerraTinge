
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { montserrat } from '@/app/ui/fonts';
import ThemeSwitch from '../landingPage/Mui Components/ThemeSwitch';
import MuiServerProvider from '../MuiProviders/muiServerProvider';

function NavBar() {

    return (
  
       <MuiServerProvider>
        <AppBar  className="backdrop-blur-md bg-inherit border-none outline-none w-full flex flex-row justify-center">
            
            <div className="flex flex-row px-3 py-3 justify-between items-center w-full sm:max-w-screen-xl">
                <Link href='/'>
                        <Button startIcon={<ArrowBackIcon className="text-3xl"/>} className={`${montserrat.className} text-slate-800 dark:text-white`}>
                        </Button>
                </Link>


                

                <ThemeSwitch/>
            </div>
           
            
     
        </AppBar>
        </MuiServerProvider>
        
        
 
    );
  }
  
  
  
  export default NavBar;