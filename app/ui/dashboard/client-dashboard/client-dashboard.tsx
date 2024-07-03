import SideNav from "../reuseable-components/sidenav";


import ClientContent from "./components/client-content";

import { NavigationProvider } from "./navigation-context";

import DashBoard from "../reuseable-components/dashboard";




export default function ClientDashBoard(){
    return(
      <DashBoard Content={ClientContent} SideNav={SideNav} NavigationProvider={NavigationProvider}/>
    )
}