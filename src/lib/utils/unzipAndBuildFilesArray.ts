import AdmZip from "adm-zip"
//import path from "path";

/** 
 * Given a zip bugger, extract it and return files[] with path * content 
*/
export function extractFilesFromZipBuffer(zipBuffer: Buffer): {
    path: string;
    content: string;
}[] {
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();

    const files = zipEntries
        .filter(entry => !entry.isDirectory)
        .map(entry => ({
            path: entry.entryName.replace(/^\/?[^/]+\/?/, ""), // remove root folder if present
            content: zip.readAsText(entry),
        }))
        .filter(file => file.path); //remove empty paths
        
    return files;
}