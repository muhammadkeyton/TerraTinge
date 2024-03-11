import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';


const cardContent = [
    {   
        'icon':<ViewQuiltIcon className="text-4xl text-black"/>,
        'heading':'Beautiful User Interfaces',
        'text':'We create visually appealing, intuitive apps for a seamless user experience, ensuring customer satisfaction'
    },
    {
        'icon':<SpeedIcon className="text-4xl text-black"/>,
        'heading':'High Performance Apps',
        'text':'Our apps are optimized for speed and performance, providing a responsive, efficient user experience in today’s digital world.'
    },
    {
        'icon':<span className="relative flex h-6 w-6">
        <span className="duration-1000 animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-6 w-6 bg-indigo-700"></span>
      </span>,
        'heading':'Interactive and Engaging Apps',
        'text':'Our functional apps captivate users with their interactivity, providing a unique, enjoyable experience that keeps them coming back.'
        
    },

    {
        "icon":<SupportAgentIcon className="text-4xl text-black"/>,
        "heading":'24/7 support',
        "text":'In case of app issues, we’re ready for swift solutions. We strive for a seamless experience. Reach out anytime, we’re available 24/7'
    }
]

interface WhyCardPropTypes{
    heading:string,
    text:string,
    icon:any
}

function WhyCard({heading,text,icon}:WhyCardPropTypes){
    return(

       
        <div className="bg-inherit space-y-4 p-6 text-left shadow-lg hover:shadow-indigo-500/50 rounded">
            <div className='flex justify-center items-center w-20 h-20 rounded-full bg-gray-200'>
                {icon}
            </div>
            <h4 className="text-lg font-semibold dark:text-white">{heading}</h4>
            <p className="text-gray-700 dark:text-gray-300">{text}</p>
        </div>
        
    )
}


export default function WhyUs(){
    return(
        <div id="section0"  className="space-y-12 my-10  xl:mx-24">
            <h1 className='dark:text-white text-2xl font-bold text-center underline decoration-wavy decoration-2 underline-offset-4 decoration-indigo-700'>why choose us?</h1>

            <div className='grid md:grid-cols-2   lg:grid-cols-4 gap-4'>
                 
                {
                    cardContent.map(
                        (content,i) =>  <WhyCard key={i} heading={content.heading} text={content.text} icon={content.icon}/>
                   )
                }

            </div>


        </div>
    )
}