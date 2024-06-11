
'use client';

import {ChangeEvent, useState} from 'react';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Divider from '@mui/material/Divider';
import WorkIcon from '@mui/icons-material/Work';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { NameSchema,EmailSchema } from "@/app/lib/data-validation";
import {ApplicationData,ApplicationDataServer} from '@/app/lib/definitions';

import { saveAs } from 'file-saver';

import { montserrat } from '@/app/ui/fonts';

import MuiServerProvider from '@/app/ui/mui-providers/mui-server-provider';

import TerraTextField from '@/app/ui/reusable-components/terra-textfield';

import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

import Footer from '../landing-page/components/footer-section';

import clsx from 'clsx';

import { PageWrapper } from '../page-animater';


import NavBar from '../reusable-components/navbar';

import scrollTo  from 'scroll-to-element';

import {submitDeveloperData} from '@/app/server-actions/developer-job-application/submit-developer-data';


interface CareerValueCardProp{
    heading:string,
    text:string,
    color:string,
    icon:any
}

interface JobValueCardProp{
    jobDescription:Record<string, string>,
    icon:any
}


const CareerValueData = [
    {
        'heading':'Creativity at our core',
        'text':'We breathe creativity in building user-friendly mobile and web applications. Our team thrives on innovative thinking and problem-solving. Welcome to the core of innovation.',
        'color':'bg-violet-700',
        'icon':<LightbulbOutlinedIcon className='text-3xl'/>
    },
    {
        'heading':'Collaboration as Our Strength',
        'text':'We believe in the power of teamwork. Our strength lies in our collective expertise and the collaborative spirit that drives us to create top-notch mobile and web applications',
        'color':'bg-orange-700',
        'icon':<Diversity3Icon className='text-3xl'/>
    }
]


const JobValueData = [
    {
        
        "jobDescription": {
            "heading": "Full-Stack Software Developer",
            "skills": "We are seeking a versatile developer with a strong understanding of data structures and algorithms, proficient in technologies such as React Js, Next Js, React Native, Flutter, TypeScript, Dart, Tailwindcss, Material Ui, Shad Cn, and Firebase.",
            "learning": "We value adaptable learners who are not tied to any specific technology but see them as tools to achieve our goals. Be prepared to employ different technologies for each project and always be ready to learn and use better tools.",
            "hiringProcess": "We value demonstrated skills over lengthy interviews. Our unique hiring process involves a practical task that allows us to appreciate your skills in action and gives you a glimpse of the projects you would be working on.",
            "workEnvironment": "Our work environment offers flexibility and autonomy. We operate on a project-based compensation model, meaning you are paid per project completed. This ensures a healthy work-life balance and makes every project an opportunity for growth. We respect your time and expertise. While we do not require you to code every day, we do expect projects to be completed before the deadline. To ensure smooth progress, a project manager will guide you and keep track of your progress on the assigned tasks.",
            "mission": "Our mission is to build innovative startups, and we need your expertise and enthusiasm to make this happen.",
            "callToAction": "If you are passionate about creating cool startups and want to work in a dynamic, rewarding work environment, we would love to hear from you. To join us on this exciting journey, please fill out the form and send us your resume. We are eager to welcome you aboard and can’t wait to see the amazing things we can accomplish together!"
        },
        'icon':<DeveloperModeIcon className='text-2xl'/>
    },
]


function CareerValueCard({heading,text,color,icon}:CareerValueCardProp){
    
       return(

       
        <div className={`${color} basis-1/2  pt-20 pb-6 px-6 rounded-md text-gray-100`}>

            <div className=" mb-4 flex justify-center items-center bg-inherit w-12 h-12 rounded-full border-white border-2">
                {icon}
            </div>
            
            <h3 className="mb-2 text-2xl font-semibold dark:text-white">{heading}</h3>
            <p className='dark:text-gray-200'>{text}</p>
        </div>

)


  
}






function JobValueCard({jobDescription,icon}:JobValueCardProp){
    const [more,setMore] = useState(false);
    

    const [applicationData,setData] = useState<ApplicationData>({
        name:{
            text:'',
            error:false,
            helperText:''
        },
        email:{
            text:'',
            error:false,
            helperText:''
        },
        about:{
            helperText:'',
            error:false,
            text:'',
        },
        resume:{
            file:null,
            error:false
        }
    });

    const emptyField = applicationData.email.text.length < 1 || applicationData.name.text.length < 1 || applicationData.about.text.length < 1;

    


    function trackApplicationData(event:ChangeEvent<HTMLInputElement>){
        const {name,value} = event.target;

        if(name === 'about'){
            let limitReached = false;
            if(value.length == 1000) {
                limitReached = true;
            }
            setData({
                ...applicationData,
                about:{
                    error:limitReached,
                    helperText:limitReached?'character limit reached!':'',
                    text:value,
                }
                
            })
        } else if(name === 'name'){
          
            const {data,success,error} = NameSchema.safeParse({name:value});

            if(success){
                setData({
                    ...applicationData,
                    name:{
                        error:false,
                        text:data.name,
                        helperText:''

                    }
                });
            }else{
                setData({
                    ...applicationData,
                    name:{
                        text:value,
                        error:true,
                        helperText:error.errors[0].message

                    }
                });

            }
            
        }else{
            setData({
                ...applicationData,
                [name]:{
                    text:value,
                    error:false,
                    helperText:''
                }
            });
            
        }

    }


    const validateDeveloperData = (data:ApplicationData):boolean=>{
        const emailResult = EmailSchema.safeParse({email:data.email.text});
        const nameResult = NameSchema.safeParse({name:data.name.text});

        const emptyAbout = data.about.text.length < 1;
        const emptyResume = data.resume.file == null;
        

       


       if(!emptyAbout && !emptyResume && emailResult.success && nameResult.success){
         return true;
       }else{
            setData({
                resume:{
                    ...data.resume,
                    error:emptyResume
                },
                about:{
                    ...data.about,
                    error:emptyAbout,
                    helperText: emptyAbout?'this field is required':''
                },
                email:{
                    ...data.email,
                    error:!emailResult.success,
                    helperText: emailResult.success?'':emailResult.error.errors[0].message


                },
                name:{
                    ...data.name,
                    error:!nameResult.success,
                    helperText: nameResult.success?'':nameResult.error.errors[0].message
                }

            })

            
        }
        return false
    }


    return(

    
     <div className="text-left max-w-screen-md mt-10 p-6 ">
         
         <div className="flex items-center justify-between mb-10">
            
         <div className="flex space-x-4 items-center">
            <div className="flex justify-center items-center bg-inherit w-10 h-10 rounded-full border-black dark:border-white  border-2  ">
                {icon}
            </div>
            
            <h3 className="text-base font-medium dark:text-white">{jobDescription.heading}</h3>
         </div>

         <code className="text-xs bg-slate-200  text-indigo-600 dark:text-indigo-700 p-1 rounded-sm">Remote</code>


         </div>




         <div className='flex flex-col space-y-4'>
         
         <p className='dark:text-gray-200'>{jobDescription.skills}</p>

         {more &&
         <>
            <p className='dark:text-gray-200'>{jobDescription.learning}</p>
            <p className='dark:text-gray-200'>{jobDescription.hiringProcess}</p>
            <p className='dark:text-gray-200'>{jobDescription.workEnvironment}</p>
            <p className='dark:text-gray-200'>{jobDescription.mission}</p>
            <p className='dark:text-gray-200'>{jobDescription.callToAction}</p>
         </>
         }

         <p onClick={()=>{
            setMore(!more);
         }} className='max-w-24 cursor-pointer text-indigo-700 dark:text-indigo-600'>{more ? 'see less':'... see more'}</p>
         </div>

         
         <Divider id='devform' className="dark:bg-slate-300 my-6" />

         <p  className="my-6 font-medium">Developer Application</p>

         <form onSubmit={async(event)=>{
            event.preventDefault()
            scrollTo("#devform");
            const dataOk = validateDeveloperData(applicationData);

            
           
            const newFormData = new FormData();
            if(dataOk && applicationData.resume.file){
                newFormData.append('file', applicationData.resume.file);
                const devData:ApplicationDataServer = {
                    name:applicationData.name.text,
                    email:applicationData.email.text,
                    about:applicationData.about.text,
                    resume:newFormData
                }
                const serverDataOk = await submitDeveloperData(devData);

                if(!serverDataOk){
                    validateDeveloperData(applicationData);
                }
            }
            
          

           
            
            
         }}
         >
            <TerraTextField
             type='text'
             label='Your Name'
             name='name'
             value={applicationData.name.text}
             error={applicationData.name.error}
             helperText={applicationData.name.helperText}
             onChange={trackApplicationData}
             inputProps={
                {
                    maxLength:41
                }
             }

            />

            <TerraTextField
                type='text'
                label='Your Email'
                name='email'
                value={applicationData.email.text}
                error={applicationData.email.error}
                helperText={applicationData.email.helperText}
                onChange={trackApplicationData}
            />

             <TerraTextField
                type='text'
                label='Tell us abit about your software development experience'
                name='about'
                value={applicationData.about.text}
                onChange={trackApplicationData}
                multiline={true}
                inputProps={
                    {
                        maxLength:1000
                    }
                 }
                error={applicationData.about.error}
                helperText={applicationData.about.helperText}
            />
            
          <MuiServerProvider>

           <div className="flex space-x-2 items-center">

           {applicationData.resume.file == null?

           <>
            <Button
            className="text-slate-700 dark:text-slate-200"
            component="label"
            role={undefined}
            variant="text"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
            Upload Resume

            <input accept="application/pdf" type="file" hidden onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                if (e.target.files) {
                    const file = e.target.files[0];
                    
                   
                    setData({
                        ...applicationData,
                        resume:{
                            file:file,
                            error:false
                        }
                    })
                    
                }
            }}/>
            
            </Button>

            {applicationData.resume.error?<h4 className='text-xs italic text-red-500'>we need your resume</h4>:<h4 className='text-xs italic'>only pdf formats accepted</h4>}
            </>

            :
            <Chip  className="text-slate-700 dark:text-slate-200" label={`${applicationData.resume.file.name}`} onClick={()=>{
              
                if(applicationData.resume.file){
                    var blob = new Blob([applicationData.resume.file], {type: "application/pdf"});
                    saveAs(blob, `${applicationData.resume.file.name}`);
                    
                }
                

            }} onDelete={()=>{
                setData({
                    ...applicationData,
                    resume:{
                        file:null,
                        error:false
                    }
                });
                
            }}  deleteIcon={<DeleteIcon className="text-red-500"/>} /> 
            
            }



            </div>

            <Button disabled={emptyField} type='submit' variant="contained"  startIcon={emptyField?<LockIcon className='text-2xl'/> :<LockOpenIcon className='text-2xl'/>} 
                      className={
                        clsx(
                            `my-4 ${montserrat.className} w-full h-10   rounded-full  text-base text-center`,
                            {
                                'bg-slate-950 dark:bg-indigo-950 text-white':!emptyField,
                                'bg-inherit': emptyField
                            }
                        )
                   
                    }
                    >Submit Application
            </Button>

           </MuiServerProvider>

         </form>

         <Divider className="dark:bg-slate-300 my-6" />

     </div>

)



}


export default function CareersPage(){
    return(
    
        <main className="relative pt-20">

            

            <NavBar/>
            
        <div className="flex flex-col justify-center items-center min-h-screen px-4 lg:px-24 mb-10">

           
            <PageWrapper>  
            <div  className='flex space-x-4 items-center mb-12 dark:text-white'>

             <WorkIcon/>
             <h1 className="text-3xl font-black">TerraTinge Careers</h1>

            </div>
            
            

            <div className='flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6 mb-10'>


                {
                    CareerValueData.map((data,index)=>{
                        return <CareerValueCard key={index} heading={data.heading} color={data.color} text={data.text} icon={data.icon}/>
                    })
                }

               


            </div>

            <Divider className="dark:bg-slate-300" />

            <div className='flex flex-col justify-center items-center'>

            
            <h2 className=" text-xl font-semibold mt-10">Join Our Team Of Engineers <span> <code className="text-xs bg-slate-200  text-indigo-600 dark:text-indigo-700 p-1 rounded-sm"> We&apos;re Hiring</code></span></h2>
           
            


            <JobValueCard icon={JobValueData[0].icon}  jobDescription={JobValueData[0].jobDescription} />
           

            </div>
            
            </PageWrapper> 



            
            <Footer/> 
        </div>

        
        

         
       
            
        
            



        </main>
       
    )
}