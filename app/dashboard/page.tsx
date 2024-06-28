import { auth,signOut } from "@/auth"


import { redirect } from 'next/navigation'




import { Role } from "@/app/lib/definitions";

import Client from "@/app/ui/dashboard/client/client";

export default async function DashBoard(){
    const session = await auth();

    switch (session?.user?.role) {
        case Role.unknown:{
            return redirect('/newuser')
        }

        case Role.client:{
            return (
                <Client/>
                
            )
        }

        case Role.partner:{
            return (
                <>
                <h1>Dashboard Role:{JSON.stringify(session?.user?.role)},get us clients and we pay you</h1>
                <p>{JSON.stringify(session.user.email)}</p>
        
        
        
        
        
                 <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                   
                    <div className="hidden md:block">Sign Out</div>
                  </button>
                </form>
        
        
                
                </>
                
            )
        }


        default:{
            return (
                <>
                <h1>role is unrecognized: </h1>
                <p>{JSON.stringify(session)}</p>
                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                   
                    <div className="hidden md:block">Sign Out</div>
                  </button>
                </form>
                </>
            )
        }
        
    }


    
   
}