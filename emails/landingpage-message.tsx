import { Html,Heading,Tailwind,Container,Text,Link,Section} from "@react-email/components";
import * as React from "react";


type ClientInquiryEmail = {
  name:string,
  email:string,
  message:string
}
export default function Email(props:ClientInquiryEmail) {
  const { name,email,message } = props;
  return (
    <Html lang="en">
    
      <Tailwind>

      <Container>

      
      <Heading as="h2" className='text-slate-900 font-bold text-3xl'>Hey Terra Support,New inquiry below!</Heading>

      <Section className='p-6 rounded border-solid border-2 border-stone-200'>
       
       
        
      <Text className='mb-6'>Client Name: <span className='ml-2'>{name}</span></Text>
  
      <Text className='mb-12'>Client Email: <Link className='ml-2' href={`mailto:${email}`}>{email}</Link></Text>
      <Text>{message}</Text>
      
      </Section>

      </Container>

      
      </Tailwind>
    </Html>
  );
}

