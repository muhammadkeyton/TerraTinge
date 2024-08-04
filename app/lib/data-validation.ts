


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
    .min(1,{ message: 'Name is required' })
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


export const AppCostSchema = z.object({
    appCost: z.string()
    .min(1,{ message: 'app cost is required' })
    .transform(text => {
        // This matches any character that is not a number
        let regex = /[^0-9]/g;
        let cleanedText = text.replace(regex, '');

        // Then return the cleaned app cost as a number
        return cleanedText;
    }),
});


export const PercentageSchema = z.object({
    percentage: z.string()
    .min(1,{ message: 'percentage is required to cover payment processing fees' })
    .transform(text => {
        // This matches any character that is not a number
        let regex = /[^0-9]/g;
        let cleanedText = text.replace(regex, '');

        // Then return the cleaned percentage as a number
        return cleanedText;
    }),
});














