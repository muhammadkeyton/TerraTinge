

import Divider from '@mui/material/Divider';




import NavBar from "./components/NavbarSection";
import HeroSection from "./components/HeroSection";
import WhyUs from "./components/WhyusSection";
import AppDevelopment from './components/AppDevelopment';
import Faqs from './components/FaqsSection';
import Footer from './components/FooterSection';

function ContentLineBreak(){
    return  (<Divider className="dark:bg-slate-300" />)
}
export default function LandingPage(){
    return(

   
        <div>
            <NavBar />
            <HeroSection/>
            <ContentLineBreak/>
            <WhyUs />
            <ContentLineBreak/>
            <AppDevelopment/>
            <ContentLineBreak/>
            <Faqs/>
            <ContentLineBreak/>
            <Footer/> 
        </div>
   
    
        
    )
}