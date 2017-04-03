"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommadLineArgs = require("command-line-args");
const CommandLineCommands = require("command-line-commands");
const CommandLineUsage = require("command-line-usage");
const initializer_1 = require("./initializer");
const snconfigfieldmodelstore_1 = require("./utils/snconfig/snconfigfieldmodelstore");
(() => __awaiter(this, void 0, void 0, function* () {
    yield initializer_1.Initializer.Init();
    const validCommands = ['init', 'fetch-types', 'help'];
    const validOptions = snconfigfieldmodelstore_1.SnConfigFieldModelStore.GetCommandOptions();
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
        const options = CommadLineArgs(validOptions.map((op) => {
            return {
                name: op.FieldName
            };
        }));
        console.log('Options: ', options);
    }
    catch (error) {
        console.log(CommandLineUsage(definitionDocs));
    }
}))();
//# sourceMappingURL=index.js.map