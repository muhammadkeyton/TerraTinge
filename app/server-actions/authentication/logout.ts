'use server';


import { signOut } from "@/auth";


export const logout = async():Promise<void> =>{
   
    try{
        
        await signOut();
        
    }catch(error){
        throw error;
    }
}
    
  
  
  
   
   
    
