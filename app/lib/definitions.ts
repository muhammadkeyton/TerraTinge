

//-----------------client and server definitions start------------------------------------------------------------------


//used to extend our sessions,tokens,users
export enum Role {
  client = 'client',
  partner = 'partner',
  developer = 'developer',
  unknown = 'unknown'
}


//used to represent the status of a project
export enum ProjectPayment {
  initial = 'initial',
  pending = 'pending',
  paid = 'paid!',
  processing = 'processing'
}


export enum PaymentOption{
  full = 'full',
  third = 'third',
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



//server project DataType
export type AppDataServer = {
  appName:string,
  appDetail:string,
  appBudget:string
};


export type ReviewedProjectType = {
  appName:string,
  paymentStatus:ProjectPayment,
  appCost:number,
  appDetail:string,
  reviewed:boolean,
  paymentAmount:number

}


//-----------------client and server definitions end------------------------------------------------------------------




//--------------------------data received from database definitions start--------------------------------------------------------------


export type Project = {
  //the project id is added as we fetch data from the database
  projectId:string,

  appName:string,
  appDetail:string,
  appCost:number,
  clientId:string,
  clientEmail:string,
  clientImage:string,
  paymentStatus:ProjectPayment,
  createdAt:string,
  paymentAmount:number,
  reviewed:boolean,

  
}
























//--------------------------database data received definitions end--------------------------------------------------------------