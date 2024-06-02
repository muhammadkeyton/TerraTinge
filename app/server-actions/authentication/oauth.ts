'use server';


import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export const oAuthSignIn = async(provider: string = 'google') =>{
   

  
    try {
       await signIn(provider);
    } catch (error) {
        throw error;
    }

  


    

        
  



}