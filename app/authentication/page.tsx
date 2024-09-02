import LoginPage from "@/app/ui/login-page/login";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Login",
    description: "Login to submit a project description and build your dream app with us",
};

export default function Authentication(){
    return <LoginPage/>
}