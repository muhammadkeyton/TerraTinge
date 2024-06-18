'use server';

import { Resend } from 'resend';
import Email from '@/emails';
import { EmailSchema, NameSchema } from "@/app/lib/data-validation";
import { InquiryDataServer } from "@/app/lib/definitions";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendMessage = async(inquiry:InquiryDataServer):Promise<boolean>=>{

    const {name,email,message} = inquiry;
    const nameResult = NameSchema.safeParse({name:name});
    const emailResult = EmailSchema.safeParse({email:email});
    const badMessage = message.length > 1000 || message.length < 1;


    if (!nameResult.success || !emailResult.success || badMessage){
        console.error('server data not accepted')
        return false;

    }

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'muhammadkeyton@gmail.com',
        subject: `${name} sent a new inquiry message to TerraTinge`,
        react: Email({name,email,message})
    });


    if(error){
        return false
    }else{
        console.log(data)
        return true
        
    }


        

}