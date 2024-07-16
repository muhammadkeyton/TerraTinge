
import { auth} from "@/auth"

import { redirect } from 'next/navigation'

import { Role } from "@/app/lib/definitions";

import { logout } from "../server-actions/authentication/logout";

export default async function DashBoard(){
    const session = await auth();

    switch (session?.user?.role) {
        case Role.unknown:{
            return redirect('/newuser')
        }

        case Role.client:{
            
            return (
                redirect('/dashboard/client')
                
            )
        }

        case Role.partner:{
            return (
                <h1>we will have this soon</h1>
            )
        }

        case Role.developer:{
            return (redirect('/dashboard/developer'))
        }


        default:{

            
                

            return (
                <div className='h-full p-4 flex flex-col items-center justify-center'>
                   <h4 className='font-bold text-red-500 text-lg'>Dear User, we've detected a 'Role Error' with your account. Please try logging out and back in. If the issue persists, email us for immediate assistance. We apologize for any inconvenience caused. Thank you.</h4>
                </div>
            );
           
        }
        
    }


    
   
}