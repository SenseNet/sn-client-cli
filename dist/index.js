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
const FileSystem = require("fs");
const Path = require("path");
const help_1 = require("./help");
const initialize_config_1 = require("./initialize-config");
const initializer_1 = require("./initializer");
const sn_fetch_types_1 = require("./sn-fetch-types");
const snconfigfieldmodelstore_1 = require("./utils/snconfig/snconfigfieldmodelstore");
const CMD_INIT = 'init';
const CMD_FETCH_TYPES = 'fetch-types';
const CMD_HELP = 'help';
(() => __awaiter(this, void 0, void 0, function* () {
    yield initializer_1.Initializer.Init();
    if (!FileSystem.existsSync(Path.join(initializer_1.Initializer.PathHelper.PackageRootPath, 'package.json'))) {
        throw Error('There is no package.json file in your working directory. Please run the tool from a root of a valid NPM package!');
    }
    if (!FileSystem.existsSync(initializer_1.Initializer.PathHelper.SnClientPath)) {
        throw Error(`sn-client-js package not available at '${initializer_1.Initializer.PathHelper.SnClientPath}'. Please make sure it's installed before using the tool.`);
    }
    if (!FileSystem.existsSync(initializer_1.Initializer.PathHelper.SnCliPath)) {
        throw Error(`sn-client-cli package not available at '${initializer_1.Initializer.PathHelper.SnCliPath}'. Please make sure it's installed before using the tool.`);
    }
    const validCommands = [CMD_INIT, CMD_FETCH_TYPES, CMD_HELP];
    const validOptions = snconfigfieldmodelstore_1.SnConfigFieldModelStore.GetCommandOptions();
    try {
        const { command, argv } = CommandLineCommands(validCommands);
        const options = CommadLineArgs(validOptions.map((op) => {
            return {
                name: op.FieldName
            };
        }));
        initializer_1.Initializer.SnConfigReader.OverrideConfig(options);
        switch (command) {
            case CMD_INIT:
                yield initialize_config_1.DoInitializeConfigs();
                break;
            case CMD_FETCH_TYPES:
                yield sn_fetch_types_1.DoFetchTypes();
                break;
            case CMD_HELP:
                help_1.Help.Show(validOptions);
            default:
                break;
        }
    }
    catch (error) {
        help_1.Help.Show(validOptions);
        process.exit(0);
    }
    process.exit(0);
}))();
//# sourceMappingURL=index.js.map