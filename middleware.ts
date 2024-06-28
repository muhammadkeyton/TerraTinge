
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';




export default NextAuth(authConfig).auth;


//regex copied from clerk
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};