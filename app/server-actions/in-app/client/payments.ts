'use server';


import { ProjectPayment } from "@/app/lib/definitions";
import { doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { revalidatePath } from 'next/cache';
export async function handlePaymentSuccess({projectId,paymentAmount}:{projectId:string,paymentAmount:number}):Promise<void>{



    const projectDocumentRef = doc(db, "projects", projectId);
  
    try{
      const docSnap = await getDoc(projectDocumentRef);
  
      if (docSnap.exists()) {
        await updateDoc(projectDocumentRef,{paymentAmount:paymentAmount,paymentStatus:ProjectPayment.paid});
        revalidatePath('/dashboard/client');
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
        revalidatePath('/dashboard/client');
        console.log(`updated project payment processing for id:${projectId} successfully`)
  
        //send confirmation email to client,email should contain project name,client name,and payment amount
    } else {
        return;
    }
  
    }catch(e){
      console.error(e)
    }


  
  }