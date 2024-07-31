import { Html,Heading,Tailwind,Container,Text,Section,Font} from "@react-email/components";

type Detail = {
    clientName:string,
    clientEmail:string,
    paymentAmount:string,
    projectName:string,
    projectId:string,
    totalCost:string,
    balance:string,
    paymentStatus:string,
    date:string
}

export default function Email({clientName,paymentAmount,clientEmail,projectName,projectId,totalCost,balance,paymentStatus,date}:Detail) {

    return (
    
      <Html lang="en">
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      
        <Tailwind>
  
        <Container>
  
        
        <Heading as="h2" className='mb-4 text-slate-900 font-bold text-3xl bg-indigo-700 text-white p-3 rounded-md inline-block'>TerraTinge</Heading>
        <Text className='mb-4 text-sm'>Hello {clientName},your payment of <span className='text-md text-green-700 font-bold'>{paymentAmount} has been processed successfully</span></Text>
  
        <Section className=' p-6 rounded border-solid border-2 border-stone-200 mb-6'>
         
       
          
        
        <Text className='mb-12 text-sm'>Date: <span className='ml-2'>{date}</span></Text>

        <Text className='mb-2 text-md font-bold'>Billed To:</Text>
        <Text className='mb-2 text-sm'>{clientName}</Text>
        <Text className='mb-12 text-sm'>{clientEmail}</Text>

        <Text className='mb-2 text-md font-bold'>Payment Detail:</Text>
        <Text className='mb-2'>Project Name:<span className='ml-2'>{projectName}</span></Text>
        <Text className='mb-2'>Project Id:<span className='ml-2'>{projectId}</span></Text>

        <Text className='mb-2'>Project Total Cost:<span className='ml-2'>{totalCost}</span></Text>

        <Text className='mb-2'>Amount Paid:<span className='ml-2'>{paymentAmount}</span></Text>

        <Text className='mb-2'>Balance:<span className='ml-2 font-semibold'>{balance}</span></Text>


        <Text className='mb-2'>Project Payment Status:<span className='ml-2 text-green-700 font-bold'>{paymentStatus}</span></Text>
        
        
        
        </Section>

        <Text className='text-center'>Thank you for your Payment!</Text>
  
        </Container>
  
        
        </Tailwind>
      </Html>
      
    );
}
  
  