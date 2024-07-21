'use server';

import { fetchAllProjects } from "@/app/firebase/firestore/developer/all-work";
import { DocumentData } from "firebase/firestore";


export const getAllProjects = async ():Promise<null | DocumentData []> => {
    return await fetchAllProjects();
}