'use client';

import { NameSchema,EmailSchema } from "@/app/lib/data-validation";
import { InquiryData } from "@/app/lib/definitions";
import { ChangeEvent, useState } from "react";




export default function useChatState(){
    const [openChat, setOpenChat] = useState(false);

    const [loading,setLoading] = useState(false);

    const [inquiryData,setData] = useState<InquiryData>({
        name:{
            text:'',
            error:false,
            helperText:''
        },
        email:{
            text:'',
            error:false,
            helperText:''
        },
        message:{
            helperText:'',
            error:false,
            text:'',
        },
       
    });
    
    const emptyField = inquiryData.email.text.length < 1 || inquiryData.name.text.length < 1 || inquiryData.message.text.length < 1;

    function trackInquiryData(event:ChangeEvent<HTMLInputElement>){

       
        const {name,value} = event.target;

      

        if(name === 'message'){
            let limitReached = false;

            
            if(value.length >= 1000) {
                limitReached = true;
            }
            setData({
                ...inquiryData,
                message:{
                    error:limitReached,
                    helperText:limitReached?'character limit reached!':'',
                    text:value,
                }
                
            })
        } else if(name === 'name'){
          
            const {data,success,error} = NameSchema.safeParse({name:value});

            if(success){
                setData({
                    ...inquiryData,
                    name:{
                        error:false,
                        text:data.name,
                        helperText:''

                    }
                });
            }else{
                setData({
                    ...inquiryData,
                    name:{
                        text:value,
                        error:true,
                        helperText:error.errors[0].message

                    }
                });

            }
            
        }else{
            setData({
                ...inquiryData,
                [name]:{
                    text:value,
                    error:false,
                    helperText:''
                }
            });
            
        }

    }



    
    const validateInquiryData = (data:InquiryData):boolean=>{
        const emailResult = EmailSchema.safeParse({email:data.email.text});
        const nameResult = NameSchema.safeParse({name:data.name.text});

        const emptyMessage = data.message.text.length < 1;
       
        

       


       if(!emptyMessage && emailResult.success && nameResult.success){
         return true;
       }else{
            setData({
                message:{
                    ...data.message,
                    error:emptyMessage,
                    helperText: emptyMessage?'this field is required':''
                },
                email:{
                    ...data.email,
                    error:!emailResult.success,
                    helperText: emailResult.success?'':emailResult.error.errors[0].message


                },
                name:{
                    ...data.name,
                    error:!nameResult.success,
                    helperText: nameResult.success?'':nameResult.error.errors[0].message
                }

            })

            
        }
        return false
    }





    return {
        openChat,
        setOpenChat,
        inquiryData,
        trackInquiryData,
        validateInquiryData,
        emptyField,
        loading,
        setLoading
    }

}