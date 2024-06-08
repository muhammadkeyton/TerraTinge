


import { z } from 'zod';




// this validates the email that the user gives us
export const EmailSchema = z.object({
    email: z.string()
           .min(1,{ message: 'Email is required' })
           .email({ message: 'email looks invalid,please double check and enter a real email address' })
           .transform(email => email.toLowerCase().trim())
});


export const NameSchema = z.object({
    name: z.string()
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

