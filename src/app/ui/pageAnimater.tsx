'use client';

import {motion,AnimatePresence} from "framer-motion";


export const PageWrapper=({children}:Readonly<{
    children: React.ReactNode;
}>) => (
    <>
       <AnimatePresence>
            <motion.div
            initial={{opacity:0,x:-15}}
            animate={{opacity:1,x:0}}
            exit={{opacity:0,x:-15}}
            transition={{delay:0.10}}
            >
            {children}
            </motion.div> 
       </AnimatePresence>
        
    </>
   
);