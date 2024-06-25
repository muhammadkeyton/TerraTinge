import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
    pages: {
      signIn: '/authentication',
      error:'/error',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;

          
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          const isOnNewUserPage = nextUrl.pathname.startsWith('/newuser');
          const isApiRequest = nextUrl.pathname.startsWith('/api');
          if (isOnDashboard || isOnNewUserPage) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } 
          else if (isLoggedIn &&  !isApiRequest ) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
      },
      providers: []
} satisfies NextAuthConfig;

