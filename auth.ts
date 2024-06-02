


import NextAuth from 'next-auth';

import { FirestoreAdapter } from "@auth/firebase-adapter"
import { authConfig } from '@/auth.config';




import Google from "next-auth/providers/google"



import Resend from "next-auth/providers/resend"




export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter(),
  session:{strategy:'jwt'},

  ...authConfig,
  
  providers:[
    
    Google(
      {
        allowDangerousEmailAccountLinking: true,
        
      }
    ),
    Resend({
      from:'onboarding@resend.dev'
    })
  ],
 

});