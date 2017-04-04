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
const ask_1 = require("../ask");
const snconfigbehavior_1 = require("./snconfigbehavior");
const snconfigfieldmodelstore_1 = require("./snconfigfieldmodelstore");
const snconfigmodel_1 = require("./snconfigmodel");
const SN_CONFIG_NAME = 'sn.config.js';
/**
 * This class reads, verifies and extends a configuration file from the specified project directory.
 */
class SnConfigReader {
    /**
     * @constructs SnConfigReader
     * @param projectDirectory {string} The directory to look sn.config.js for
     */
    constructor(projectDirectory) {
        this.projectDirectory = projectDirectory;
        this.Config = new snconfigmodel_1.SnConfigModel();
    }
    /**
     * Reads an sn.config.js file from the project directory, warns the user if there is no sn.config.js available
     * @returns {Promise<any>} An awaitable promise that will be resolved when the
     * reading is completed or the new Config model is constructed.
     */
    ReadConfigFile(fileName = SN_CONFIG_NAME) {
        return __awaiter(this, void 0, void 0, function* () {
            let cfg;
            try {
                cfg = require(this.projectDirectory + Path.sep + fileName);
            }
            catch (error) {
                console.log(`No '${SN_CONFIG_NAME}' file found in the project root.`);
                cfg = new snconfigmodel_1.SnConfigModel();
            }
            this.Config = cfg;
        });
    }
    /**
     * Validates a specified option set and asks the user if there are some missing option values
     * @param requiredValues The config fields to be provided and to be asked for
     * @returns {Promise<Readonly<SnConfigModel>>} An awaitable promise with the
     * readonly SnAdminConfigModel that will contain all specified values
     */
    ValidateAsync(...requiredValues) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const fieldName of requiredValues) {
                const fieldModel = snconfigfieldmodelstore_1.SnConfigFieldModelStore.Get(fieldName);
                const value = this.Config[fieldModel.FieldName];
                if (value && value.length && !(fieldModel.Behavior & snconfigbehavior_1.SnConfigBehavior.AllowFromConfig)) {
                    throw Error(`Field '${fieldName}' is not allowed in snconfig file!`);
                }
                if (!value || !value.length) {
                    this.Config[fieldModel.FieldName] =
                        (fieldModel.Behavior & snconfigbehavior_1.SnConfigBehavior.HideConsoleInput)
                            ?
                                yield ask_1.Ask.PasswordAsync(fieldModel.Question) :
                            yield ask_1.Ask.TextAsync(fieldModel.Question);
                }
            }
            return this.Config;
        });
    }
    /**
     * Overrides the current config with the provided values
     * @param newConfig {Partial<SnCnofigModel>} The new config values
     */
    OverrideConfig(newConfig) {
        for (const field in newConfig) {
            if (newConfig[field]) {
                this.Config[field] = newConfig[field];
            }
        }
    }
}
exports.SnConfigReader = SnConfigReader;
//# sourceMappingURL=snconfigreader.js.map