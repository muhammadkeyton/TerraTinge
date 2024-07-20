import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
export default async function DeveloperWork(){
    
    const session = await auth()


    if(session?.user?.role !== Role.partner){
        return redirect('/dashboard');
    }

    return (<h1 className='text-center p-12'>Hi partner,welcome and advertise us!</h1>);
}