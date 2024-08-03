
import Image from 'next/image';



type  AppNameImageDateFeedBackTextProps = {
    appName:string,
    createdAt:string
}

export default function AppNameImageDateFeedBackText({appName,createdAt}:AppNameImageDateFeedBackTextProps){
    return(
        <div>
            <h2 className='text-xl font-bold '>{appName}</h2>
            <p className='text-sm my-4 font-medium'>Date: {createdAt}</p>

            <Image  className="rounded-md text-center bg-slate-100 dark:bg-slate-800 my-4" priority={true} unoptimized src='/team-discussion.gif' width={250} height={200} alt='project' />
            <code className="text-xs bg-indigo-700  text-white p-1 rounded-sm">Awaiting Review</code>

            <p className='text-sm max-w-xs mt-4'>Thank you for entrusting us with your project! A Terratinge team member is now assigned to work with you. They are currently reviewing the project details and will reach out to you via email within the next 24 hours. This will allow both of you to review the project together and schedule a virtual meeting. We appreciate your patience and look forward to collaborating with you!</p>
        </div>
    )
}