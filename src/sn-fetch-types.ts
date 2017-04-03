import * as AdmZip from 'adm-zip';
import * as Path from 'path';
import { Download, PathHelper, Stage } from './utils';
import { SnConfigReader } from './utils/snconfig';

/**
 * Executeable node.js file for fetching / updating pre-generated
 *  Typescript proxy classes from a Sense/Net Content Repository
 */

const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
export async function Exec() {

    console.log('Sn-Fetch-Types starting...');
    const pathHelper = new PathHelper(process.cwd(), `${__dirname}${Path.sep}..`);
    const stage = new Stage(pathHelper);
    await stage.PrepareAsync();
    console.log('Checking sn.config.js...');
    const reader = new SnConfigReader(pathHelper.PackageRootPath);
    await reader.ReadConfigFile();
    const cfg = await reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
    console.log('Downloading type definitions...');
    const zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
        .Authenticate(cfg.UserName, cfg.Password)
        .GetAsBufferAsync();
    const zip = AdmZip(zipBuffer);
    console.log('Download completed, extracting...');
    zip.extractAllTo(stage.TempFolderPath + Path.sep + 'src', true);
    console.log('Files extracted, running Build...');
    await stage.CompileAsync();
    console.log('All done.');
    process.exit(0);
}
