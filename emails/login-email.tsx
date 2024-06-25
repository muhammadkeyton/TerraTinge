import { Html,Heading,Tailwind,Container,Text,Button,Row,Column,Section} from "@react-email/components";
import * as React from "react";

type LoginEmail = {
   url:string,
}


export default function Email({url}:LoginEmail) {

    return (
    
      <Html lang="en">
      
        <Tailwind>
  
        <Container>
  
        
        <Heading as="h2" className='text-slate-900 font-bold text-3xl text-center'>Login To TerraTinge</Heading>
  
        <Section className=' p-6 rounded border-solid border-2 border-stone-200 mb-6'>
         
         
          
        <Text className='mb-12 text-center text-lg'>Greetings👋, Your secure login link is ready. Click the login button below for swift access. </Text>
        

        <Row>
            <Column align="center">
                <Button href={url} target="_blank" className='text-center bg-slate-950 text-white hover:bg-indigo-500 w-36 py-3 rounded-full' >
                    Login
                </Button>
             </Column>
        </Row>

       

        

             

        
    
       
        
        </Section>

        <Text className='text-center'>If you didn't request this,you can safely ignore it</Text>
  
        </Container>
  
        
        </Tailwind>
      </Html>
      
    );
  }
  
  