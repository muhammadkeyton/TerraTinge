

import { FieldName } from "./partnerRegisterConstants"
import * as EmailValidator from 'email-validator';




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
    firstName: {
        text:string,
        error?:boolean,
        helperText?:string
    },
    companyName: {
        text:string,
        error?:boolean,
        helperText?:string
    },
    emailAddress: {
        text:string,
        error?:boolean,
        helperText?:string
    },
    industry:{
        text: string,
        error?:boolean,
        helperText?:string
    },
    role:{
        text: string,
        error?:boolean,
        helperText?:string
    }
    submitEnabled:boolean,
    errorIds:Array<string>


} & {[key:string]:any}

//this validates data as user types so we can't show errors
function validateFieldData({field, text}:{ field: string, text: string}):{updatedText: string} {
    
    switch (field){
        case 'firstName': {  
            //this matches any character that is not an uppercase or lowercase letter
            let regex = /[^a-zA-Z]/g;
            let cleanedText = text.replace(regex, '');
            //then return the cleaned first name with the first character being capitalized
            return {updatedText:cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1)}
        }
        case 'companyName': {
            //this also matches any character that is not an uppercase or lowercase letter but allows space to be added
            let regex = /[^a-zA-Z ]/g;
            let cleanedText = text.replace(regex, '');
            //then return the cleaned last name with the first character being capitalized
            return {updatedText:cleanedText.charAt(0).toUpperCase() + cleanedText.slice(1)}

        }
        case 'emailAddress': {
            return {updatedText:text.trim()}
        }
        case 'industry': {
            return {updatedText:text.trim()}
        }
        case 'role': {
            return {updatedText:text.trim()}
        }

        
             

        default:{
            throw Error('unknown field has been provide: '+field);
        }
    }
}

//checks if all fields have data and returns a boolean this is used to enable our create account button
function allFieldsHaveData( state: RegisterDataState ): boolean {

    for (const stateData in state){
       if( stateData === 'submitEnabled' ) break;

       if(state[ stateData ].text.length === 0) return false;

    }

    return true;
}

//validate all fields check if email is valid,if passwords match and return an array of all errors to be fed to the state
function validateAllFields (state:RegisterDataState):Array<{field:string,error:boolean,helperText:string}>{
    let result:Array<{field:string,error:boolean,helperText:string}> = Object.keys(state).map(field => ({field, error: false, helperText: ''}));

    function updateResult(newData:{field:string,error:boolean,helperText:string}){
        let newResult = result.map((data)=>{
            if(data.field === newData.field){
                return newData;
            }else{
                return data;
            }
        });

        result = newResult;
    }


    for (const field in state){
        
        switch(field){
            case 'firstName':{
                if(state[field].text.length === 0){
                    let error = {field:'firstName',error:true, helperText:'first name is required!'}
                    updateResult(error)
                }else{
                    let noError = {field:'firstName',error:false,helperText:''}
                    updateResult(noError)
                }
                break
                
            }

            case 'companyName':{
               
                if(state[field].text.length === 0){
                    let error = {field:'companyName',error:true,helperText:'company name is required!'}
                    updateResult(error)
                }else{
                    let noError = {field:'companyName',error:false,helperText:''}
                    updateResult(noError) 
                }
                break
            }

            case 'emailAddress':{
                const validEmail = EmailValidator.validate(state[field].text);
                if(state[field].text.length === 0){
                    let error = {field:'emailAddress',error:true,helperText:'email is required!'}
                    updateResult(error)
                }else if (state[field].text.length > 0 && validEmail){
                    let noError = {field:'emailAddress',error:false,helperText:''}
                    updateResult(noError) 
                }else{
                    let error = {field:'emailAddress',error:true,helperText:'hmmm🤔,this email does not look valid!'}
                    updateResult(error)
                }

            }

            case 'submitEnabled':{
                break
            }

            case 'errorIds':{
                break
            }


            default:{
                throw Error('unknown field')
            }
                
        }

    }

    console.log(result)

    return result.slice(0, -2);


}


//our register state reducer that gives us back a state
export function RegisterDataReducer( state:RegisterDataState, action:RegisterDataAction) : RegisterDataState{
    if( action.type == 'DataFieldUpdate' ) {
        
        
        let { field, text } = action.payload!;
        const updatedText = validateFieldData(action.payload!).updatedText;
        text = updatedText;

        const newState = {
            ...state,
            [ field ]:{
             ...state[ field ],
             text: text,
            },
        }

        let fieldsHaveData =  allFieldsHaveData(newState);
        
        

        return {
            ...newState,
            submitEnabled:fieldsHaveData
        }

    }else if ( action.type == 'ValidateBeforeSubmit' ) {
        const results = validateAllFields( state );
        
         let newState = {...state}; 

        for (let result of results) {
            const {field, error, helperText} = result; 
    
            // update the field in the newState
            newState[field] = {
                ...newState[field],
                error: error,
                helperText: helperText
                
            };
        }
    
        return newState;
       
        
    }else{
        throw Error('unknown action at registerReducer');
    }
}








//--------------------------------reducer used to update the textfield ui style when theme is changed-----------------------------

type UIAction={
    type:string,
    payload:any
};


type UIState = {
    textColor:string,
    borderColor:string,
    labelFocusedColor: string,
    helperTextColor:string
};


export function TextFieldUIReducer(state:UIState,action:UIAction):UIState{
    return {
        ...state,
        [action.type]:action.payload
    }
}

