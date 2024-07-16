import UserProfile from "@/app/ui/dashboard/client-dashboard/components/profile"
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function Profile(){

    const session = await auth();
    if(session?.user?.role !== Role.client){
        return redirect('/dashboard');
    }

    return(
        <UserProfile/>
    )
}