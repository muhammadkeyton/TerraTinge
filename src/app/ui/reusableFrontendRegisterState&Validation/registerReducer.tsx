

import { FieldName } from './registerFieldConstants';
import scrollTo  from 'scroll-to-element';

import { NameSchema,EmailSchema,PasswordSchema} from "../../lib/authDataValidation";


//---------------------------reducer for the register data state and some data checking functionality------------------------



type RegisterDataAction={
    type:string,
    payload?:{
        field:FieldName,
        text:string,
        error?:boolean,
        helperText?:string
    }
}

type RegisterDataState = {
    firstName:{
        text:string,
        error?:boolean,
        helperText?:string
    },
    lastName:{
        text:string,
        error?:boolean,
        helperText?:string
    },
    emailAddress:{
        text:string,
        error?:boolean,
        helperText?:string
    },
    password:{
        text:string,
        error?:boolean,
        helperText?:string
    },
    repeatPassword:{
        text:string,
        error?:boolean,
        helperText?:string
    },
    
    
    submitButtonEnabled:boolean,
    submitNow:boolean,


} & {[key:string]:any}


//checks if all fields have data and returns a boolean this is used to enable our create account button
function allFieldsHaveData(state:RegisterDataState):boolean{
   
    for (const stateData in state){
       if(stateData === 'submitButtonEnabled') break;

       if(state[stateData].text.length === 0) return false;

    }

    return true;
}

function validateAndReturnState(schema:any, state:RegisterDataState, field:FieldName):RegisterDataState {
 
    const result = schema.safeParse(state[field].text);

    if (result.success) {
        state[field] = {
            ...state[field],
            error: false,
            helperText: ''
        };
    } else {
        state[field] = {
            ...state[field],
            error: true,
            helperText: result.error.errors[0].message
        };
    }

    return state;
}

//our register state reducer that gives us back a state
export function RegisterDataReducer(state:RegisterDataState,action:RegisterDataAction):RegisterDataState{
    if(action.type == 'DataFieldUpdate'){
         
        let {field,text} = action.payload!;

        let updatedText;

        if (field === 'firstName' || field === 'lastName'){
            //keyof typeof RegistrationDataSchema.shape this tells our typescript compiler that our field name matches the types in zodschema
            const {data} = NameSchema.shape[field as keyof typeof NameSchema.shape].safeParse(text);
            updatedText = data !== undefined ? data:'';    
        }else{
            updatedText = text;
        }

      
        const newState = {
            ...state,
            [field]:{
             ...state[field],
             text:updatedText,
            },
        }

        let fieldsHaveData =  allFieldsHaveData(newState);
        
        

        return {
            ...newState,
            submitButtonEnabled:fieldsHaveData
        }

    }else if (action.type == 'ValidateBeforeSubmit') {
        scrollTo('#registerform');
        


        
        let newState = {...state};

        //firstname validation
        newState = {...newState,...validateAndReturnState(NameSchema.shape.firstName,newState,'firstName')}

        //lastname validation
        newState = {...newState,...validateAndReturnState(NameSchema.shape.lastName,newState,'lastName')}

        //email validation
        newState = {...newState,...validateAndReturnState(EmailSchema.shape.email,newState,'emailAddress')}

        //passwords validation
        let passwordResult = PasswordSchema.safeParse({
            password:newState.password.text,
            repeatPassword:newState.repeatPassword.text

        })

        const passwordErrorMessage = passwordResult.error?.errors[0].message;
        const passwordErrorPath = passwordResult.error?.errors[0].path;
        
        newState = passwordResult.success ? 
            {
                ...newState,
                password: {
                    ...newState.password,
                    error: false, // No error
                    helperText: '' // Clear the error message
                },
                repeatPassword: {
                    ...newState.repeatPassword,
                    error: false, // No error
                    helperText: '' // Clear the error message
                }
            } : 
            {
                ...newState,
                password: {
                    ...newState.password,
                    error: passwordErrorPath?.includes('password'),
                    helperText:passwordErrorPath?.includes('password')? passwordErrorMessage:''
                },
                repeatPassword: {
                    ...newState.repeatPassword,
                    error: passwordErrorPath?.includes('repeatPassword'),
                    helperText:passwordErrorPath?.includes('repeatPassword')? passwordErrorMessage : ''
                }
            };

        if(!newState.firstName.error && !newState.lastName.error && !newState.emailAddress.error && !newState.password.error && !newState.repeatPassword.error){
            
            newState = {
                ...newState,
                submitNow:true

            }
        }else{
            newState = {
                ...newState,
                submitNow:false

            } 
        }

        
        return newState;
       
        
    }else if(action.type === 'SetSubmitNowToFalse'){
        return {...state,submitNow:false}
    }
    
    
    else{
        throw Error('unknown action type at registerReducer');
    }
}


