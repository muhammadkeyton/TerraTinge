
import Image from 'next/image';


type AppFounderProps = {
    clientImage:string,
    clientEmail:string
}

export default function AppFounder({clientImage,clientEmail}:AppFounderProps){
    return(
        <div className='flex flex-row items-center gap-4'>
        <Image  className="rounded-full" src={clientImage} width={40} height={40} alt='user profile' />
  
        <div>
          <h3 className='text-xs font-light mb-2'>App Founder</h3>
          <p className='text-sm font-semibold'>{clientEmail.split('@')[0]}</p>
        </div>
       
        </div>
    )
}