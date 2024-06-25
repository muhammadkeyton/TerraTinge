
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextRequest } from 'next/server';



export default NextAuth(authConfig).auth;


//regex copied from clerk
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};