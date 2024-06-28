import type { NextAuthConfig } from 'next-auth';


export const authConfig = {
    pages: {
      signIn: '/authentication',
      error:'/error',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;

          const url = nextUrl.clone();
          const pathname = url.pathname.toLowerCase();

          
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          const isOnNewUserPage = nextUrl.pathname.startsWith('/newuser');
          const isApiRequest = nextUrl.pathname.startsWith('/api');
          const staticFiles = url.pathname.startsWith('/_next/static');

          
          //allowing our users to access dashboard and newuser page if they are logged in
          if (isOnDashboard || isOnNewUserPage) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          }
          //if we are logged in and our request is not from an api route we redirect to dashboard 
          else if (isLoggedIn &&  !isApiRequest ) {
            return Response.redirect(new URL('/dashboard', nextUrl));
            

          } 
          //this takes care of url route case sensitivity and if we are not logged in and our request is not from
          //api,we check if the url matches,if the have different casing they will not match so fix it by using the lower case url
          else if(!isApiRequest && !staticFiles && !isLoggedIn){
            
            if (url.pathname !== pathname) {
              url.pathname = pathname;
              return Response.redirect(url);
            }  
            
          }
     
          //allow all other requests that do not match the above logic,ie(api requests)
          return true;
        },
      },
      providers: []
} satisfies NextAuthConfig;

