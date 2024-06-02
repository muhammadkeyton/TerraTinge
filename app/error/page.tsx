

"use client"
import { Suspense } from 'react'
import { useSearchParams} from "next/navigation"
import Button from '@mui/material/Button';
import MuiServerProvider from "@/app/ui/mui-providers/mui-server-provider";
import { montserrat } from '@/app/ui/fonts';
import Link from "next/link";
 
enum Error {
  Verification = "Verification",
  Configuration = "Configuration",
}
 
const errorMap = {
  [Error.Verification]: (

    <>
        <code className="text-xs bg-slate-100 dark:text-black p-1 rounded-sm">User Verification Token Used or Expired!</code>
        <p>
       
        For security purpose we only allow the login links to be used just once,tap the button below and you will be taken to the login page where you can request a new login link
        

        
        </p>

        <MuiServerProvider>
        <Link href="/authentication"><Button className={`my-4 ${montserrat.className} w-full h-10 bg-slate-950 dark:bg-indigo-950 text-white  rounded-full  text-base text-center`}>Go to Login</Button></Link>
        </MuiServerProvider>


    </>

    
  ),

  [Error.Configuration]: (

    <>
         <code className="text-xs bg-slate-100 dark:text-black p-1 rounded-sm">Unexpected or google previous request used again</code> 
        <p>
       
        please click the login button below and try logging in again
        

        
        </p>

        
        <MuiServerProvider>
        <Link href="/authentication"><Button className={`my-4 ${montserrat.className} w-full h-10 bg-slate-950 dark:bg-indigo-950 text-white  rounded-full  text-base text-center`}>Go to Login</Button></Link>
        </MuiServerProvider>


    </>

    
  ),

 






}
 
export default function AuthErrorPage() {

  const search = useSearchParams()
  const error = search.get("error") as Error
  


    
 
  return (

    <Suspense>
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div
        
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
          Can not proceed to login with that request
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || `Error ${error}:Please contact us if this error persists,we apologise for any inconviniences.`}
        </div>
      </div>
    
    </div>
    </Suspense>
  )
}