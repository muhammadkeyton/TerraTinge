
import Divider from '@mui/material/Divider';
import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';

import NavBar from '@/app/ui/landing-page/components/navbar-section';
import HeroSection from '@/app/ui/landing-page/components/hero-section';
import WhyUs from '@/app/ui/landing-page/components/whyus-section';
import AppDevelopment from '@/app/ui/landing-page/components/app-development';
import Faqs from '@/app/ui/landing-page/components/faqs-section';
import Footer from '@/app/ui/landing-page/components/footer-section';
import ChatSection from '@/app/ui/landing-page/components/chat-section';
import Reviews from '@/app/ui/landing-page/components/reviews-section';

import { PageWrapper } from '../page-animater';

function ContentLineBreak() {
  return <Divider className='dark:bg-slate-300' />;
}

export default function LandingPage() {
  return (
    <div className='relative px-4'>
      <MuiServerProvider>
        <NavBar />

        <PageWrapper>
          <HeroSection />
          <ContentLineBreak />
          <WhyUs />
          <ContentLineBreak />
          <Reviews/>
          <ContentLineBreak />
          <AppDevelopment />
          <ContentLineBreak />
          <Faqs />
          <ContentLineBreak />
        </PageWrapper>

        
      </MuiServerProvider>

      {/* <ChatSection /> */}

      

      <MuiServerProvider>
       <Footer />
      </MuiServerProvider>
    </div>
  );
}
