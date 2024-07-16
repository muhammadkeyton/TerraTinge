
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
export default async function DeveloperWork(){
    
    const session = await auth()


    if(session?.user?.role !== Role.developer){
        return redirect('/dashboard');
    }

    return (<h1 className='text-center p-12'>Hi dev,welcome to your work!</h1>);
}