
import { auth} from "@/auth"

import { redirect } from 'next/navigation'

import { Role } from "@/app/lib/definitions";



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
                redirect('/dashboard/partner')
            )
        }

        case Role.developer:{
            return (redirect('/dashboard/developer'))
        }


        default:{

            
                

            return (
                <div className='h-full p-4 flex flex-col items-center justify-center'>
                   <h4 className='font-bold text-red-500 text-lg'>Dear User, we&apos;ve detected a &apos;Role Error&apos; with your account. Please try logging out and back in. If the issue persists, email us for immediate assistance. We apologize for any inconvenience caused. Thank you.</h4>
                </div>
            );
           
        }
        
    }


    
   
}