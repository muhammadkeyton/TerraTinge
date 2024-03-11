'use client';

import {useState} from 'react';

import { Link as NavScroll} from "react-scroll";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import PersonIcon from '@mui/icons-material/Person';

import ThemeSwitch from '@/app/ui/landingPage/Mui Components/ThemeSwitch';
import { montserrat } from '@/app/ui/fonts';
const drawerWidth = 260;
const navItems = ['Why choose us','App Development','Faqs'];
interface Props {
  window?: () => Window;
}
function NavBar(props:Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  

  

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  





  const drawer = (
    <div onClick={handleDrawerToggle}  className="h-screen bg-white dark:bg-inherit space-y-6 text-center dark:backdrop-blur-lg ">
      <NavScroll
        onClick={handleDrawerToggle}
        activeClass="active"
        to='hero'
        spy={true}
        smooth={true}
        offset={-100}
        duration={500}
        >
          <Typography variant="h6"   className={`${montserrat.className} my-6 cursor-pointer  text-black dark:text-white font-black`}>
          Ultrawave Tech
          </Typography>
      </NavScroll>
              
     
      <Divider className="dark:bg-white" />
      <div className='flex flex-col space-y-6'>
        {navItems.map((item,i) => (

       
            <NavScroll
            key={item} 
            onClick={handleDrawerToggle}
            activeClass="active"
            to={`section${i}`}
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            >  
             <Button  className={`normal-case p-2 text-sm text-slate-800 dark:text-white`}>
                  {item}
              </Button>
            </NavScroll>
         
        
            
        
        ))}
      </div>
      <Divider className="dark:bg-white"/>
      
     
     
      <Button variant="contained" startIcon={<PersonIcon  />} className='text-base bg-slate-800 dark:bg-slate-500 text-white hover:bg-slate-700 w-36 h-10 font-app rounded-full normal-case'>Login</Button>
      
    
      
      
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  

  return (
    <Box>
     
      <AppBar className="backdrop-blur-md bg-inherit  border-none outline-none  flex flex-row justify-center">
          <div className=' flex flex-row px-3 py-4 justify-between items-center bg-inherit w-screen sm:max-w-screen-xl'>

              <NavScroll
              activeClass="active"
              to='hero'
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              >
                <Typography
                variant="h6"
                component="div"
                className={` ${montserrat.className} cursor-pointer  text-slate-800 dark:text-white font-black`}
              >

                Ultrawave Tech
              </Typography>
                
              </NavScroll> 
              


              <div className="block lg:hidden flex space-x-4 mr-2 items-center space-around">
              <ThemeSwitch />
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}

              >
            {mobileOpen? <CloseIcon className='text-slate-800 dark:text-white'/> : <MenuIcon className='text-slate-800 dark:text-white '/>}
              </IconButton>

              </div>

              

              <Box  className='hidden lg:block space-x-4'>
                
                {navItems.map((item,i) => (
                  
                  <NavScroll
                  key={item}
                  activeClass="active"
                  to={`section${i}`}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  > <Button  className="normal-case p-2 text-sm text-black dark:text-white">
                  {item}
                  </Button>
                  </NavScroll>

                
                 
                ))}

              </Box>
              
              <div className="hidden lg:block flex-row space-x-4 items-center">
               <ThemeSwitch />
               <Button  variant="contained" startIcon={<PersonIcon  />} className={`${montserrat.className} text-base text-center bg-slate-800 dark:bg-slate-500 text-white hover:bg-slate-700 w-28 h-10 font-app rounded-full normal-case`}>Login</Button>
              </div>
              
              
          </div>

         
          
   
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:"inherit" },
            
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
    </Box>
  );
}



export default NavBar;