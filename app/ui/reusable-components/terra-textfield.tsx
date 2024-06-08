'use client';


import { useTheme } from 'next-themes';
import { useReducer,useState,useEffect } from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { montserrat } from '@/app/ui/fonts';


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





//----------------------------------------text field---------------------------------------------------------------------------------------

type UltraTextFieldProps = {
    
    label:string,
    error?:boolean,
    helperText?:string,
    inputProps?:{
        maxLength:number
    },
    autoFocus?:boolean,
    name:string,
    type:string,
    value:string,
    multiline?:boolean,
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void,


}


export default function TerraTextField({label,error,helperText,inputProps,autoFocus,name,type,value,onChange,multiline}:UltraTextFieldProps){
    const { resolvedTheme } = useTheme();
    const [showPassword,setPassword] = useState(false);

    //initial text field state
    const initialTextFieldUi = {
        textColor:'',
        borderColor:'',
        labelFocusedColor:'',
        helperTextColor:'',
    }

    //textfield ui reducer state
    const [textFieldState, dispatchUI] = useReducer(TextFieldUIReducer,initialTextFieldUi);

    useEffect(() => {
        if(resolvedTheme == 'light'){
            dispatchUI({type:'textColor',payload:'#0f172a'})
            dispatchUI({type:'borderColor',payload:'#6366f1'})
            dispatchUI({type:'labelFocusedColor',payload:'#6366f1'})
            dispatchUI({type:'helperTextColor',payload:'#4b5563'})
       
        }else{
            dispatchUI({type:"textColor",payload:'#fff'})
            dispatchUI({type:'borderColor',payload:'#fff'})
            dispatchUI({type:'labelFocusedColor',payload:'#fff'})
            dispatchUI({type:'helperTextColor',payload:'#fff'})    
        }
    }, [resolvedTheme]);


    switch (type) {
        case 'text':{
            return (
                <TextField label={label} variant='outlined' fullWidth
                // className='font-app'
                autoComplete='off'
                error= {error}
                helperText= {helperText}
                required
                inputProps={inputProps}
                autoFocus={autoFocus}
                name={name}
                value={value}
                onChange={onChange}
                multiline={multiline}
                maxRows={multiline?20:undefined}
                sx={{
                    
                    marginBottom:3,
                    
               
                    //customizations from material ui texfield docs
                    '& .MuiOutlinedInput-root':{
                        fontFamily:`${montserrat.style.fontFamily}`,
                        color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor:textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                        
                        '& textarea': {
                            outline: 'none !important', // removing the outline on multiline textfield
                        },
                    
                        
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
                    },
                    '& label': {
                        fontFamily:`${montserrat.style.fontFamily}`,
                        color: '#71717a',
                    },
                    
                    

                   
                    

                   
                    
                    }}/>
            )
        }

        case 'password':{
            return(

                <TextField label={label} type={showPassword?'text':'password'} variant="outlined"  fullWidth
                
                error={error}
                helperText={helperText}
                required
                name={name}
                value={value}
                onChange={onChange}

             
                 
                sx={{

                    marginBottom:2,

                    '& .MuiFormHelperText-root':{
                        color:error? null :textFieldState.helperTextColor
                    },
                    
                    '& .MuiOutlinedInput-root':{
                         color:textFieldState.textColor,
                        '&.Mui-focused fieldset': {borderColor: textFieldState.borderColor,},
                        '&:hover fieldset': {borderColor: textFieldState.borderColor,},
                        '& fieldset': {
                            borderColor: '#94a3b8',
                            borderRadius:'15px',
                        },
                    },
                    '& label.Mui-focused': {
                        color: textFieldState.labelFocusedColor,
                    },
                    '& label': {
                        color: '#71717a',
                    },

                    



                }}

               InputProps={{
                endAdornment:<InputAdornment position='end'>
                             
                               <IconButton onClick={()=> setPassword(!showPassword)}>
                                  {showPassword?

                                  
                                  <VisibilityIcon  className="text-slate-700 dark:text-white"/>
                                 
                                  
                                  :
                                  
                                  
                                  <VisibilityOffIcon  className="text-slate-700 dark:text-white"/>
                                  
                                  
                                  }
                                  
                               </IconButton>
                               
                             </InputAdornment>
                             
               }}
                
               />

            )
        }

        
    
        default:
            throw Error(`unknown textfield type,expected password or text but instead got ${type}`);
    }


    


    
}

