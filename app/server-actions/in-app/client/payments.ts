'use server';

import { Resend } from 'resend';
import { ProjectPayment } from "@/app/lib/definitions";
import { doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";

import Email from '@/emails/payment-receipt';
const resend = new Resend(process.env.AUTH_RESEND_KEY);
export async function handlePaymentSuccess({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{



    const projectDocumentRef = doc(db, "projects", projectId);
  
    try{
      const docSnap = await getDoc(projectDocumentRef);
  
      if (docSnap.exists()) {
        await updateDoc(projectDocumentRef,{paymentAmount:paymentAmount,paymentStatus:ProjectPayment.paid});

        const clientRef = doc(db, "users", docSnap.data()?.clientId);
        
        const user = (await getDoc(clientRef)).data();


        let clientName = user?.name ?? user?.email?.split('@')[0];
        let clientEmail = user?.email;
        let balance = (docSnap.data()?.appCost - paymentAmount) === 0?'No Balance':`$${((docSnap.data()?.appCost - paymentAmount)/100).toLocaleString()}USD`;
        let paymentStatus = (docSnap.data()?.appCost - paymentAmount) === 0?'Fully Paid!':'Initial Payment';
        let totalCost = `$${((docSnap.data()?.appCost)/100).toLocaleString()}USD`;
        let projectName = docSnap.data()?.appName;
        let appId = projectId;
        let amountPaid = `$${(paymentAmount/100).toLocaleString()}USD`;
        
        //payment date
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        };
        const formattedDate = date.toLocaleDateString('en-US', options);

        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'muhammadkeyton@gmail.com',
          subject: `TerraTinge Payment Notification`,
          react: Email(
            {clientName:clientName,
             clientEmail:clientEmail,
             balance:balance,
             date:formattedDate,
             paymentAmount:amountPaid,
             paymentStatus:paymentStatus,
             projectId:appId,
             projectName:projectName,
             totalCost:totalCost
            
            }
          )
        });

        if(data?.id){
          console.log(`payment receipt has been sent for projectId${appId}`)
        }else{
          console.log(`payment receipt not sent due to this error:${error}`)
        }



     
        console.log(`updated project payment success for id:${projectId} successfully`)
        //send confirmation email to client,email should contain project name,client name,and payment amount
    } else {
        return;
    }
  
    }catch(e){
      console.error(e)
    }
}




export async function handlePaymentProcessing({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{


    const projectDocumentRef = doc(db, "projects", projectId);
  
  
    try{
      const docSnap = await getDoc(projectDocumentRef);
  
      if (docSnap.exists()) {
        await updateDoc(projectDocumentRef,{paymentStatus:ProjectPayment.processing});
       
        console.log(`updated project payment processing for id:${projectId} successfully`)
  
        //send confirmation email to client,email should contain project name,client name,and payment amount
    } else {
        return;
    }
  
    }catch(e){
      console.error(e)
    }


  
  }