'use client';

import { useReducer,useEffect,useState } from 'react';

import {RegisterDataReducer} from './registerReducer';

import { FieldName } from './registerFieldConstants';

//lib file containing code that checks our data before giving it to our registerUsers Api
import { validateAndPass } from '@/app/lib/RegisterUserData';




/**
 * `useRegistration` is a custom Ultrawave hook that encapsulates the registration logic
 * It returns an object with the following properties:
 *
 * @property {Object} registerData - The current state of the registration data.
 * @property {Function} updateRegisterData - A function to update the registration data,this is for updating the state as the user types into the textfields.
 * @property {Function} validateAllDataAndUpdateState - A function that dispatches an action type that is used to validate registration data on the frontend.
 * @property {string} serverErrorMessage - Error message that maybe generated from the server.
 *
 * @returns {Object} An object containing `registerData`, `updateRegisterData`, `validateAllDataAndUpdateState`, and `serverErrorMessage`.
 */
export function useRegistration() {

const [serverErrorMessage,setServerErrorMessage] = useState('');
const initialRegisterData = {
    firstName:{
        text:"",
        
    },
    lastName:{
        text:"",
        
    },
    emailAddress:{
        text:"",
        
    },
    password:{
        text:"",
        helperText:'we recommend you create a password that is atleast 8 characters long and has a combination of upperCase letters & numbers & symbols,this will make your password more secure.'
        
    },
    repeatPassword:{
        text:"",
        
    },
    
    submitButtonEnabled:false,
    submitNow:false
}



const [registerData,dispatchData] = useReducer(RegisterDataReducer,initialRegisterData);

function updateRegisterData(event:React.ChangeEvent<HTMLInputElement>){
    const {name,value} = event.target;
    dispatchData({type:"DataFieldUpdate",payload:{field:name as FieldName,text:value}})  
}

async function validateAllDataAndUpdateState(){
    console.log('frontend validation')
    dispatchData({type:"ValidateBeforeSubmit"})
}



//passes registration to our server if our frontend validation has no error and submitNow is true,it also calls our frontend validation if our server validation fails
useEffect(() => {
    console.log('useeffect called for server validation and possible route handler actions')
    if (registerData.submitNow) {
        const submitRegistrationData = async () => {
            
                const response = await validateAndPass({
                    firstName: registerData.firstName.text,
                    lastName: registerData.lastName.text,
                    emailAddress: registerData.emailAddress.text,
                    password: registerData.password.text,
                    repeatPassword: registerData.repeatPassword.text
                });
        
                if(!response.success){
                    dispatchData({type:"ValidateBeforeSubmit"})
                    setServerErrorMessage(response.message);
                    console.log('failure')
                    console.log(response)
                }else{
                    dispatchData({type:"ValidateBeforeSubmit"})
                    setServerErrorMessage(response.message);
                    console.log('success')
        
        
                    console.log(response)
                }



                //we need this in order to allow our submit if the user makes changes to the generated errors
                dispatchData({type:"SetSubmitNowToFalse"})
            
        };

        submitRegistrationData();
    }


}, [registerData.submitNow]);


return{
    registerData,
    serverErrorMessage,
    updateRegisterData,
    validateAllDataAndUpdateState
}

}

