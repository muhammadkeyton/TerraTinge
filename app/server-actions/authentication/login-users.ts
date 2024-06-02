'use server';

import { signIn } from "@/auth";
import { EmailSchema } from "@/app/lib/login-data-validation";






type EmailResult={
  error:boolean,
  helperText:string
}

export const magicLink = async(email:string):Promise<EmailResult|void>=>{
  const {success,error} = EmailSchema.safeParse({email:email});

  

  if (!success) {
    return { error: true, helperText: error.errors[0].message};
  }
  
  try{
    await signIn('resend',{email:email,redirect:false});
  }catch(error){


    throw error;
      
  }


 
 
  
}