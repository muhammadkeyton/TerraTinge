


import NextAuth from 'next-auth';

import { FirestoreAdapter } from "@auth/firebase-adapter"
import { authConfig } from '@/auth.config';




import Google from "next-auth/providers/google"



import Resend from "next-auth/providers/resend"

import { cert } from "firebase-admin/app"


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY
    }),
  }),
  session:{strategy:'jwt'},
  secret:process.env.AUTH_SECRET,

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