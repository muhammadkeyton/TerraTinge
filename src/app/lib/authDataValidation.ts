

import { z } from 'zod';


//this validates our user's first name and last name as they type
export const NameSchema = z.object({
    firstName: z.string().min(1,{ message: 'First name is required' })
    .transform(text => {
        // This matches any character that is not an uppercase or lowercase letter
        let regex = /[^a-zA-Z]/g;
        let cleanedText = text.replace(regex, '');

        

        // Then return the cleaned first name with the first character being capitalized
        return cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1);
       
    }),
    lastName: z.string().min(1,{ message: 'Last name is required' })
    .transform(text => {
       // This matches any character that is not an uppercase or lowercase letter but allows space to be added
        let regex = /[^a-zA-Z ]/g;
        let cleanedText = text.replace(regex, '');

        // Replace multiple spaces with a single space
        cleanedText = cleanedText.replace(/\s+/g, ' ');

        // Then return the cleaned last name with the first character of each word being capitalized
        return cleanedText.replace(/\b\w/g, char => char.toUpperCase());
    }),
   
});


// this validates the email that the user gives us
export const EmailSchema = z.object({
    email: z.string()
           .min(1,{ message: 'Email is required' })
           .email({ message: '🤔hmm..this email looks invalid,please double check' }),
});



//this validates our passwords
export const PasswordSchema = z.object({
    password: z.string()
               .min(1,{ message: 'Password cannot be empty' })
               .min(8,{ message: 'Password must be atleast 8 characters long' })
               ,
    repeatPassword: z.string()
                     .min(1,{ message: 'Password cannot be empty' })
                     .min(8,{ message: 'Password must be atleast 8 characters long' }),
}).refine(data => data.password === data.repeatPassword, {
message: "passwords don't match!,please double check both passwords",
path: ['password', 'repeatPassword'], 
});


