

import { z } from 'zod';




// this validates the email that the user gives us
export const EmailSchema = z.object({
    email: z.string()
           .min(1,{ message: 'Email is required' })
           .email({ message: 'email looks invalid,please double check and enter a real email address' })
           .transform(email => email.toLowerCase().trim())
});



// //this validates our passwords
// export const PasswordSchema = z.object({
//     password: z.string()
//                .min(1,{ message: 'Password cannot be empty' })
//                .min(8,{ message: 'this password is incorrect' })
// });