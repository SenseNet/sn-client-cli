import * as Path from 'path';
import { Initializer } from './initializer';

export async function DoInitializeConfigs() {
    console.log('Copying default config...');
    try {
        await Initializer.Stage.InitializeConfigAsync();
        console.log(`Copied to ${Initializer.PathHelper.PackageRootPath}${Path.sep}sn.config.js`);
    } catch (error) {
        console.error('There was an error initializing the config file.');
        console.error(error);
    }

}
