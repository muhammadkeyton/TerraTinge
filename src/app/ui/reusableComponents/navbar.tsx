
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { montserrat } from '@/app/ui/fonts';
import ThemeSwitch from '../landingPage/Mui Components/ThemeSwitch';


function NavBar() {

    return (
  
       
        <AppBar sx={{paddingLeft:0}} className="backdrop-blur-md bg-inherit border-none outline-none w-full flex flex-row justify-center">
            
            <div className="flex flex-row px-3 py-4 justify-between items-center w-full sm:max-w-screen-xl">
                <Link href='/'>
                        <Button startIcon={<ArrowBackIcon/>} className={`${montserrat.className} text-slate-800 dark:text-white`}>
                            Go Back
                        </Button>
                </Link>


                

                <ThemeSwitch/>
            </div>
           
            
     
        </AppBar>
        
        
 
    );
  }
  
  
  
  export default NavBar;