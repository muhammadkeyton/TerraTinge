import { User as NextAuthUser } from 'next-auth'

export type User = NextAuthUser & {
  name:string,
  password: string,
  email: string,
}


export type RegisterData = {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  repeatPassword:string
}


export type LoginData={
  emailAddress:string,
  password:string
}

export type AuthenticationResponse = {
  success:boolean,
  message?:string
}
