import { ProjectVersions, VersionStage, VersionStage1 } from "@/app/lib/definitions";





export const isVersionStage1 = (version:ProjectVersions): version is VersionStage1 =>{
    return version.versionStage === VersionStage.stage1;
}




