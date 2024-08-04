import { ProjectVersions, VersionStage, VersionStage1,VersionStage2 } from "@/app/lib/definitions";





export const isVersionStage1 = (version:ProjectVersions): version is VersionStage1 =>{
    return version.versionStage === VersionStage.stage1;
}


export const isVersionStage2 = (version:ProjectVersions): version is VersionStage2 =>{
    return version.versionStage === VersionStage.stage2;
}




