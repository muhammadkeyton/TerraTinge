


import NextAuth from 'next-auth';

import { FirestoreAdapter } from "@auth/firebase-adapter"
import { authConfig } from '@/auth.config';

import { Role } from "@/app/lib/definitions";


import Google from "next-auth/providers/google"



import Resend from "next-auth/providers/resend"

import { cert } from "firebase-admin/app"

import { updateUserRole} from '@/app/firebase/firestore';



export const { handlers, signIn, signOut, auth} = NextAuth({
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
    
    Google({
      allowDangerousEmailAccountLinking:true 
    }),

    Resend({
      from:'onboarding@resend.dev',


      
     
    })
  ],

  callbacks:{

    async jwt({token,user,trigger,session}){

      if(user){
        if(!user.role){
          token.role = Role.unknown as Role;
        }else{
          token.role = user.role;
        }
      }


      if(trigger === 'update' && session){
        await updateUserRole(session.user.id,session.user.role);
        token = {...token,role:session.user.role}
        return token;
      }
      
     

      return token;
    },

    async session({session,token}){
      
      if(token){
        session.user.id = token.sub as string;
        session.user.role = token.role as Role;
      }
        
     
      
     
      return session;
    }



    
  }


  

  


  
 

});



