import { User as NextAuthUser } from 'next-auth'

export type User = NextAuthUser & {
  name:string,
  password: string,
  email: string,
}






export type ApplicationData = {
  name:{
    text:string,
    error:boolean,
    helperText:string
  };
  email:{
    text:string,
    error:boolean,
    helperText:string
  };
  about: {
      text: string;
      limitReached: boolean;
  };
  resume: File | null;
};

