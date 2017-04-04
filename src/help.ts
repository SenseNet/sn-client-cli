import * as CommandLineUsage from 'command-line-usage';
import { SnConfigFieldModel } from "./utils/snconfig/snconfigfieldmodel";

export class Help {

    public static Show(validOptions: SnConfigFieldModel[]) {
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
        console.log(CommandLineUsage(definitionDocs));
    }
}
