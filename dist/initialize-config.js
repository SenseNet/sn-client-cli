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
const Path = require("path");
const initializer_1 = require("./initializer");
/**
 * This function initializes a new 'sn.config.js' configuration file into an NPM package's root folder.
 */
function DoInitializeConfigs(initializer = initializer_1.Initializer.Current) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Copying default config from ${initializer.PathHelper.SnCliPath}${Path.sep}sn.config.js...`);
        try {
            yield initializer.Stage.InitializeConfigAsync();
            console.log(`Copied to ${initializer.PathHelper.PackageRootPath}${Path.sep}sn.config.js`);
        }
        catch (error) {
            console.error('There was an error initializing the config file.');
            console.error(error);
        }
    });
}
exports.DoInitializeConfigs = DoInitializeConfigs;
//# sourceMappingURL=initialize-config.js.map