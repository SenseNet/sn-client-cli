import * as AdmZip from 'adm-zip';
import * as Path from 'path';
import { Initializer } from './initializer';
import { Download } from "./utils/download";

/**
 * Executeable node.js file for fetching / updating pre-generated
 *  Typescript proxy classes from a Sense/Net Content Repository
 */
export async function DoFetchTypes(initializer: Initializer = Initializer.Current) {
    try {
        const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';

        console.log('Sn-Fetch-Types starting...');
        console.log('Checking sn.config.js...');
        const cfg = await initializer.SnConfigReader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
        console.log('Downloading type definitions...');
        const zipBuffer = await new Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
            .Authenticate(cfg.UserName, cfg.Password)
            .GetAsBufferAsync();
        const zip = AdmZip(zipBuffer);
        console.log('Download completed, extracting...');
        zip.extractAllTo(initializer.Stage.TempFolderPath + Path.sep + 'src', true);
        console.log('Files extracted, running Build...');

        await initializer.Stage.CallGulpRunAsync('tsc', initializer.Stage.TempFolderPath);
        await initializer.Stage.CallGulpRunAsync('nyc mocha -p tsconfig.json dist/test/index.js', initializer.Stage.TempFolderPath);
        await initializer.Stage.UpdateModuleAsync();
        await initializer.Stage.CleanupAsync();

        console.log('All done.');
    } catch (error) {
        console.error('There was an error during fetching types.');
        console.error(error);
    }
}
