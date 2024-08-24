

//-----------------client and server definitions start------------------------------------------------------------------

import { Timestamp } from "firebase/firestore";


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


export enum ProjectState{
  inReview = 'inReview',
  inProgress = 'inProgress',
  done = 'done'
}


export enum VersionStage{
  stage1 = 'stage1',
  stage2 = 'stage2',
  stage3 = 'stage3',
  stage4 = 'stage4'

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
  appCostAndFee:number,
  appDetail:string,
  paymentAmount:number,
  percentage:number

}


export type ReviewedProjectTypeStage3 = {
  appName:string,
  appCost:number,
  appCostAndFee:number,
  appDetail:string,
  percentage:number,
  projectLink: string | null,
  completed:boolean
}

export type ReviewedProjectTypeStage4 = {
  appName:string,
  projectLink: string | null,
  completed:boolean
}


//client fetch projects server action mutation response
export type clientProjectsType = {
  inReview:Project | null,
  inProgress:Project | null,
  done:Project[] | null
}


//developer fetch projects server action mutation response
export type developerProjectsType = {
  inReview:Project[] | null,
  inProgress:Project[] | null,
  done:Project[] | null
}


//partner promoCodes fetch server action mutation response

export type partnerPromoCodesType = {
  inUse: PromoCode[] | null,
  earnings: PromoCode[] | null,
  notUsedYet: PromoCode | null
}


//-----------------client and server definitions end------------------------------------------------------------------




//--------------------------data received from database definitions start--------------------------------------------------------------



export type PromoCode = {
  //this promocode is the id of the promoCode document which is also the promocode itself
  promoCode:string,

  createdAt:Timestamp | string,
  partnerInfo:{
    partnerEmail:string,
    partnerId:string
  },
  projectInfo?:{
    amountPaid?:number,
    paymentStatus:ProjectPayment,
    projectId:string,
    projectName:string,
    versionId:string

  },
  used:boolean
}


export type VersionStage1 = {
  versionId:string,
  versionStage:VersionStage,
  projectInfo:{
    projectState:ProjectState
    appName:string,
    appDetail:string,
    appBudget?:string,
    createdAt:Timestamp | string
  }
}


export type VersionStage2 = {
  versionId:string,
  versionStage:VersionStage,
  projectInfo:{
    projectState:ProjectState
    appName:string,
    appDetail:string,
    paymentStatus:ProjectPayment,
    feePercentage:number,
    appCost:number,
    promoCodeId?:string,
    discountedAppCostAndFee?:number
    partnerInfo?:{
      email:string,
      paymentStatus:ProjectPayment,
      amountPaid?:number
    },

    appCostAndFee:number,
    paymentDate: Timestamp | string,
    paymentAmount:number,
    createdAt:Timestamp | string
  }
}


export type VersionStage3 = {
  versionId:string,
  versionStage:VersionStage,
  projectInfo:{
    projectState:ProjectState
    appName:string,
    appDetail:string,
    paymentStatus:ProjectPayment,
    feePercentage:number,
    appCost:number,
    appCostAndFee:number,
    paymentAmount:number,
    promoCodeId?:string,
    discountedAppCostAndFee?:number,
    partnerInfo?:{
      email:string,
      paymentStatus:ProjectPayment,
      amountPaid?:number
      paymentDate?: string
    },
    projectLink:string | null,
    paymentDate: Timestamp | string,
    createdAt:Timestamp | string,
    completionDate:Timestamp | string | null
  }
}




export type ProjectVersions = VersionStage1 | VersionStage2 | VersionStage3

export type Project={

  //project id is being added as we fetch the data
  projectId:string,


  appName:string,
  projectState:ProjectState,
  versions:ProjectVersions[],
  clientInfo:{
    clientEmail:string,
    clientImage:string,
    clientId:string
  },
  maintainance:{
    active:boolean,
    endDate:Date | null | Timestamp
  }
}








//old database datastructure that failed,keeping it here commented to avoid repeating the same mistake in future projects

// export type Project = {
//   //the project id is added as we fetch data from the database
//   projectId:string,

//   appName:string,
//   appDetail:string,
//   appCost:number,
//   clientId:string,
//   clientEmail:string,
//   clientImage:string,
//   paymentStatus:ProjectPayment,
//   createdAt:string,
//   paymentAmount:number,
//   reviewed:boolean,

//   projectState:ProjectState

//   //might need to remove this,beware
//   appBudget:string,

  
// }
























//--------------------------database data received definitions end--------------------------------------------------------------