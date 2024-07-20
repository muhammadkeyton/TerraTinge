import Profile from "@/app/ui/dashboard/reuseable-components/profile";
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function ClientProfile(){

    const session = await auth();
    if(session?.user?.role !== Role.client){
        return redirect('/dashboard');
    }

    return(
        <Profile/>
    )
}