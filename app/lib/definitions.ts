export enum Role {
  client = 'client',
  partner = 'partner',
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

