import * as CommadLineArgs from 'command-line-args';
import * as CommandLineCommands from 'command-line-commands';
import * as CommandLineUsage from 'command-line-usage';
import { Initializer } from './initializer';
import { SnConfigFieldModelStore } from './utils/snconfig/snconfigfieldmodelstore';
import { SnConfigModel } from "./utils/snconfig/snconfigmodel";

(async () => {
    await Initializer.Init();
    const validCommands = ['init', 'fetch-types', 'help'];
    const validOptions = SnConfigFieldModelStore.GetCommandOptions();
    const definitionDocs = [
        {
            header: 'SN-Client-CLI',
            content: 'Command line tool for [bold]{Sense/NET ECM}',
        },
        {
            header: 'Synopsis',
            content: [
                '$ sn-client [[bold]{command}] [bold]{--}[underline]{[options]} ...',
                '$ sn-client [bold]{help}',
            ]
        },
        {
            header: 'Commands',
            content: [
                {
                    desc: 'init',
                    example: 'Creates an initial \'sn.config.js\' for your project'
                },
                {
                    desc: 'fetch-types',
                    example: 'Downloads type definitions from a [italic]{specified} [bold]{Sense/NET ECM} repository'
                },
                {
                    desc: 'help',
                    example: 'This help screen'
                },
            ]
        },
        {
            header: 'Options',
            content: validOptions.map((f) => {
                return {
                    desc: f.FieldName,
                    example: f.FieldDescription
                };
            })
        },
        {
            header: 'Examples',
            content: [
                {
                    desc: '1. Initializes an sn-client config file. ',
                    example: '$ sn-client init'
                },
                {
                    desc: '2. Fetching type definitions. ',
                    example: '$ sn-client fetch-types'
                }
            ]
        },
        {
            content: 'Project home: [underline]{https://github.com/SenseNet/sn-client-cli}'
        }
    ];

    try {
        const { command, argv } = CommandLineCommands(validCommands);
        console.log('Command: ', command);
        const options: Partial<SnConfigModel> = CommadLineArgs(validOptions.map((op) => {
            return {
                name: op.FieldName
            };
        }));
        console.log('Options: ', options);
    } catch (error) {
        console.log(CommandLineUsage(definitionDocs));
    }

})();
