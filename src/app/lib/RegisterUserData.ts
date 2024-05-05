'use server'

import { NameSchema,EmailSchema, PasswordSchema } from './authDataValidation'; 


type RegisterData = {
    firstName:string,
    lastName:string,
    emailAddress:string,
    password:string,
    repeatPassword:string
}
export async function validateAndPass(data:RegisterData):Promise<any> {
    
    // Validate the data with Zod
    const userNameResult = NameSchema.safeParse({
        firstName:data.firstName,
        lastName:data.lastName
    });
    const emailResult = EmailSchema.safeParse({
        email:data.emailAddress
    });
    const passwordResult = PasswordSchema.safeParse({
        password:data.password,
        repeatPassword:data.repeatPassword
    });


    
   
    // If the data is invalid, return zod validation result
    if (!emailResult.success || !passwordResult.success || !userNameResult.success) {
        return { message: 'we cannot proceed to register you,please fix the errors below',success:false,statusCode:409};
    }

    

    const response = await fetch('http://localhost:3000/api/registerUsers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });


    return response.json();


    

    

    
}


