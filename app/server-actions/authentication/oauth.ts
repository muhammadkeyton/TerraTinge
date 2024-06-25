'use server';


import { signIn } from "@/auth";



export const oAuthSignIn = async(provider: string = 'google') =>{
   

  
    try {
    await signIn(provider,{redirectTo:'/dashboard'});
    } catch (error) {
        throw error;
    }

  


    

        
  



}