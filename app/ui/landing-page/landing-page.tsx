import Divider from '@mui/material/Divider';
import MuiServerProvider from '../mui-providers/mui-server-provider';

import NavBar from './components/navbar-section';
import HeroSection from './components/hero-section';
import WhyUs from './components/whyus-section';
import AppDevelopment from './components/app-development';
import Faqs from './components/faqs-section';
import Footer from './components/footer-section';
import ChatSection from './components/chat-section';

import { PageWrapper } from '../page-animater';

function ContentLineBreak() {
  return <Divider className='dark:bg-slate-300' />;
}

export default function LandingPage() {
  return (
    <div className='relative'>
      <MuiServerProvider>
        <NavBar />

        <PageWrapper>
          <HeroSection />
          <ContentLineBreak />
          <WhyUs />
          <ContentLineBreak />
          <AppDevelopment />
          <ContentLineBreak />
          <Faqs />
          <ContentLineBreak />
        </PageWrapper>

        <ChatSection />

        <Footer />
      </MuiServerProvider>
    </div>
  );
}
