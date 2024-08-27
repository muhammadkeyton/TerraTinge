


import NextAuth from 'next-auth';

import { FirestoreAdapter } from "@auth/firebase-adapter"
import { authConfig } from '@/auth.config';

import { Role } from "@/app/lib/definitions";


import Google from "next-auth/providers/google"

import Email from '@/emails/login-email'

import Resend from "next-auth/providers/resend"

import { Resend as LoginEmail } from 'resend';


import { adminFirestore } from './app/firebase/adminFirebase';



import { updateUserRole} from '@/app/firebase/firestore';







export const { handlers, signIn, signOut, auth} = NextAuth({
  adapter: FirestoreAdapter({
    

    firestore:adminFirestore


    

    
    
    
  }),
  session:{strategy:'jwt'},
  secret:process.env.AUTH_SECRET,

  ...authConfig,


  
  providers:[
    
    Google({
      allowDangerousEmailAccountLinking:true 
    }),

    Resend({
      from:'login@terratinge.com',
      async sendVerificationRequest({
        identifier,
        url,

        provider

      }) {

        const resend = new LoginEmail(provider.apiKey);
        
        const { data, error } = await resend.emails.send({
          from: 'login@terratinge.com',
          to: identifier,
          subject:'TerraTinge Secure Login',
          react: Email({url})
        });

        if (error){
          throw new Error(`Resend error:${data}`)
        }else{
          console.log(data);
        }
       


      },


      
     
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
        console.log(token)
        session.user.id = token.sub as string;
        session.user.role = token.role as Role;
      
      }
        
     
      
     
      return session;
    },





    
  }


  

  


  
 

});



