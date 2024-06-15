import type { Metadata } from "next";
import "./globals.css";
import {montserrat} from '@/app/ui/fonts';
  



import { Providers } from './providers'




export const metadata: Metadata = {
  title: "TerraTinge",
  description: "Building Beautiful,user friendly and performant web and mobile applications",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className}  antialiased  bg-white dark:bg-black`}>
       <div className="max-w-screen-2xl mx-auto">

      
       
          
        <Providers>
          {children}
        </Providers>
 
         
        

        </div>
        
        
      
      </body>
      
    </html>
  );
}
