




type DashBoardProps = {
    SideNav:() => Promise<React.JSX.Element>;
    Content:()=>JSX.Element;
    //accepts children
    NavigationProvider:({children}:{children: JSX.Element | JSX.Element[]}) => JSX.Element;
}

export default function DashBoard({SideNav,Content,NavigationProvider}:DashBoardProps){
    return(
        <NavigationProvider>

            <div className='bg-slate-100 dark:bg-black h-screen gap-6 flex  flex-col md:flex-row md:p-6' >
            


           
            
            <div className='md:w-64 z-10 w-full fixed bottom-0  left-0 right-0 md:static backdrop-blur-md  md:p-0   border-none outline-none'>
            <SideNav/>
            </div>


            
            <div className='h-full bg-white md:shadow-md dark:bg-black dark:md:border-2 dark:md:border-slate-500  overflow-y-auto flex flex-col flex-grow md:rounded-xl justify-center gap-12 items-center '>
             <Content/>
            </div>

            

            </div>
        </NavigationProvider>
    )
}