import * as AdmZip from 'adm-zip';
import * as Path from 'path';
import { Initializer } from './initializer';
import { Download } from "./utils/download";

/**
 * Executeable node.js file for fetching / updating pre-generated
 *  Typescript proxy classes from a Sense/Net Content Repository
 */

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
export async function Exec() {
    console.log('Sn-Fetch-Types starting...');
    await Initializer.Stage.PrepareAsync();
    console.log('Checking sn.config.js...');
    const cfg = await Initializer.SnConfigReader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
    console.log('Downloading type definitions...');
    const zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();
    const zip = AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(Initializer.Stage.TempFolderPath + Path.sep + 'src', true);
    console.log('Files extracted, running Build...');
    await Initializer.Stage.CompileAsync();
    console.log('All done.');
    process.exit(0);
}
