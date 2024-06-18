import { Html,Heading,Tailwind,Container,Section,Text} from "@react-email/components";
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

      
      <Heading as="h2" className='text-indigo-700 font-bold text-4xl'>Hey Terra Support,Potential Client Inquiry</Heading>

      <Section className='flex flex-col space-y-6'>
      <Text>Client Name: {name}</Text>
      <Text>Client Email: {email}</Text>
      <Text>{message}</Text>
      
      </Section>
      </Container>

      
      </Tailwind>
    </Html>
  );
}

