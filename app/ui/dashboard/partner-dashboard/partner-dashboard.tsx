


import SideNav from "../reuseable-components/sidenav";


import PartnerContent from "./components/partner-content";

import { NavigationProvider } from "./navigation-context";

import DashBoard from "../reuseable-components/dashboard";




export default function PartnerDashBoard(){
    return(
      <DashBoard Content={PartnerContent} SideNav={SideNav} NavigationProvider={NavigationProvider}/>
    )
}