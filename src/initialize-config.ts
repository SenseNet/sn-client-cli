import * as Path from 'path';
import { Initializer } from './initializer';

/**
 * This function initializes a new 'sn.config.js' configuration file into an NPM package's root folder.
 */
export async function DoInitializeConfigs(initializer: Initializer = Initializer.Current) {
    console.log('Copying default config...');
    try {
        await initializer.Stage.InitializeConfigAsync();
        console.log(`Copied to ${initializer.PathHelper.PackageRootPath}${Path.sep}sn.config.js`);
    } catch (error) {
        console.error('There was an error initializing the config file.');
        console.error(error);
    }
}
