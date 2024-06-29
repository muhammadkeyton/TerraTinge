
import ThemeSwitch from '@/app/ui/landing-page/mui-components/theme-switch';


function NavBar() {
 
  
  return (
   
    
        <div className='block md:hidden z-10 rounded-xl pr-2 pl-4  shadow-lg h-14  backdrop-blur-md  bg-inherit dark:border-2 outline-none flex flex-row justify-between items-center '>
        
        <h1 className='font-black text-lg block md:hidden'>TerraTinge</h1>
          

          <ThemeSwitch />
        </div>
      

  );
}

export default NavBar;