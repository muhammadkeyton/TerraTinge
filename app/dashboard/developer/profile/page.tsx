import Profile from "@/app/ui/dashboard/reuseable-components/profile";
import { Role } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
export default async function DevProfile(){

    const session = await auth()
    if(session?.user?.role !== Role.developer){
        return redirect('/dashboard');
    }
    return(
        <Profile/>
    )
}