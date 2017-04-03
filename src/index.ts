import * as CommadLineArgs from 'command-line-args';
import * as CommandLineCommands from 'command-line-commands';
import { Help } from './help';
import { Initializer } from './initializer';
import { DoFetchTypes } from './sn-fetch-types';
import { SnConfigFieldModelStore } from './utils/snconfig/snconfigfieldmodelstore';
import { SnConfigModel } from "./utils/snconfig/snconfigmodel";

const CMD_INIT = 'init';
const CMD_FETCH_TYPES = 'fetch-types';
const CMD_HELP = 'help';

(async () => {
    await Initializer.Init();
    const validCommands = [CMD_INIT, CMD_FETCH_TYPES, CMD_HELP];
    const validOptions = SnConfigFieldModelStore.GetCommandOptions();

    try {
        const { command, argv } = CommandLineCommands(validCommands);
        const options: Partial<SnConfigModel> = CommadLineArgs(validOptions.map((op) => {
            return {
                name: op.FieldName
            };
        }));
        Initializer.SnConfigReader.OverrideConfig(options);

        switch (command) {
            case CMD_INIT:
                console.error('Not implemented yet! :(');
                break;
            case CMD_FETCH_TYPES:
                DoFetchTypes();
                break;
            case CMD_HELP:
                Help.Show(validOptions);
            default:
                break;
        }

    } catch (error) {
        Help.Show(validOptions);
    }

})();
