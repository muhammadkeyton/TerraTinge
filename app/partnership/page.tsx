import PartnershipLoginPage from "@/app/ui/partnership-login-page/partnership-login-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "TerraTinge Partnership",
    description: "Become our partner,create a partner account and start earning with us",
};

export default function PartnerShip(){
    return (
        <PartnershipLoginPage/>
    )
}