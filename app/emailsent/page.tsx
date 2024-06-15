'use client';

import confettiSideCannons from "@/app/ui/landing-page/magic-ui/confetti"

import { useEffect } from "react";

export default function CheckEmailPage() {

   
    useEffect(()=>{
      confettiSideCannons();
    },[]);
   
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div
          
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
            🎊Confirmed,login link sent🎊
          </h5>
          <div className="font-normal text-gray-700 dark:text-gray-400">
            Please check your email now,click on the link we sent you and you will be logged in.
          </div>
        </div>
      
      </div>
    )
  }