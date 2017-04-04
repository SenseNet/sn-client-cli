import * as CommadLineArgs from 'command-line-args';
import * as CommandLineCommands from 'command-line-commands';
import * as FileSystem from 'fs';
import * as Path from 'path';
import { Help } from './help';
import { DoInitializeConfigs } from './initialize-config';
import { Initializer } from './initializer';
import { DoFetchTypes } from './sn-fetch-types';
import { SnConfigFieldModelStore } from './utils/snconfig/snconfigfieldmodelstore';
import { SnConfigModel } from "./utils/snconfig/snconfigmodel";

const CMD_INIT = 'init';
const CMD_FETCH_TYPES = 'fetch-types';
const CMD_HELP = 'help';

(async () => {
    await Initializer.Init();

    if (!FileSystem.existsSync(Path.join(Initializer.PathHelper.PackageRootPath, 'package.json'))) {
        throw Error('There is no package.json file in your working directory. Please run the tool from a root of a valid NPM package!');
    }

    if (!FileSystem.existsSync(Initializer.PathHelper.SnClientPath)) {
        throw Error(`sn-client-js package not available at '${Initializer.PathHelper.SnClientPath}'. Please make sure it's installed before using the tool.`);
    }

    if (!FileSystem.existsSync(Initializer.PathHelper.SnCliPath)) {
        throw Error(`sn-client-cli package not available at '${Initializer.PathHelper.SnCliPath}'. Please make sure it's installed before using the tool.`);
    }

    const validCommands = [CMD_INIT, CMD_FETCH_TYPES, CMD_HELP];
    const validOptions = SnConfigFieldModelStore.GetCommandOptions();

    try {
        const { command } = CommandLineCommands(validCommands);
        const options: Partial<SnConfigModel> = CommadLineArgs(validOptions.map((op) => {
            return {
                name: op.FieldName
            };
        }));
        Initializer.SnConfigReader.OverrideConfig(options);

        switch (command) {
            case CMD_INIT:
                await DoInitializeConfigs();
                break;
            case CMD_FETCH_TYPES:
                await DoFetchTypes();
                break;
            case CMD_HELP:
                Help.Show(validOptions);
            default:
                break;
        }

    } catch (error) {
        Help.Show(validOptions);
        process.exit(0);
    }

    process.exit(0);

})();
