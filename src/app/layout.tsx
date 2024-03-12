import type { Metadata } from "next";
import "./globals.css";
import {montserrat} from '@/app/ui/fonts';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';


import { Providers } from './providers'




export const metadata: Metadata = {
  title: "Ultrawave Technologies",
  description: "Building Beautiful,user friendly and performant web and mobile applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className}  antialiased transition-colors duration-200 bg-white dark:bg-black`}>
       <div className="max-w-screen-2xl mx-auto px-4">

      
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          
        <Providers>
          {children}
        </Providers>
 
         
        </AppRouterCacheProvider>

        </div>
        
        
      
      </body>
      
    </html>
  );
}
