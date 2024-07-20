

//-----------------client and server definitions start------------------------------------------------------------------


//used to extend our sessions,tokens,users
export enum Role {
  client = 'client',
  partner = 'partner',
  developer = 'developer',
  unknown = 'unknown'
}


//Frontend Developer Application DataType
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
      error:boolean,
      helperText:string,
      text: string;
  };
  resume:{
    file: File | null,
    error:boolean
  }
  
};



//server Developer Application Data Type
export type ApplicationDataServer = {
  name:string,
  email:string,
  about: string,
  resume:FormData
  
};



//frontend clients inquiry message DataType
export type InquiryData = {
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
  message: {
      error:boolean,
      helperText:string,
      text: string;
  };
  
  
};



//server clients inquiry message DataType
export type InquiryDataServer = {
  name:string,

  email:string,
  message: string;

  
  
};



//frontend clients project DataType

export type AppDataFrontend = {
  appName:{
    text:string,
    error:boolean,
    helperText:string
  };
  appDetail:{
    text:string,
    error:boolean,
    helperText:string
  };
  appBudget: {
      error:boolean,
      helperText:string,
      text: string;
  };
 
  
};



//server clients project DataType
export type AppDataServer = {
  appName:string,
  appDetail:string,
  appBudget:string
};


//-----------------client and server definitions end------------------------------------------------------------------




//--------------------------database data received definitions start--------------------------------------------------------------


export type Project = {
  appName:string,
  appDetail:string,
  appBudget:string,
  clientId:string,
  clientEmail:string
}





















//--------------------------database data received definitions end--------------------------------------------------------------