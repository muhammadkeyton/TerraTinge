
import ThemeSwitch from '@/app/ui/landing-page/mui-components/theme-switch';


function NavBar() {
 
  
  return (
   
    
        <div className='md:hidden z-10 rounded-b-xl pr-2 pl-4  shadow h-20  backdrop-blur-md bg-inherit dark:border-2 dark:border-slate-500     flex flex-row justify-between items-center '>
        
        <h1 className='font-black text-lg block md:hidden'>TerraTinge</h1>
          

          <ThemeSwitch />
        </div>
      

  );
}

export default NavBar;