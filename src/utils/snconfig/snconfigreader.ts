import * as Path from 'path';
import { Config } from "sn-client-js";
import { Ask } from '../ask';
import { SnCliConfigModel } from "./snconfigmodel";

/**
 * This class reads, verifies and extends a configuration file from the specified project directory.
 */
export class SnConfigReader<TConfigModel> {

    private readonly SN_CONFIG_NAME: string = 'sn.config.js';

    public Config: TConfigModel = new this.configModelType();

    /**
     * @constructs SnConfigReader
     * @param projectDirectory {string} The directory to look sn.config.js for
     */
    constructor(private readonly configModelType: { new(): TConfigModel}, private projectDirectory: string) { }

    /**
     * Reads an sn.config.js file from the project directory, warns the user if there is no sn.config.js available
     * @returns {Promise<any>} An awaitable promise that will be resolved when the
     * reading is completed or the new Config model is constructed.
     */
    public async ReadConfigFile(fileName: string = this.SN_CONFIG_NAME): Promise<any> {
        let cfg: TConfigModel;
        try {
            cfg = require(this.projectDirectory + Path.sep + fileName);
        } catch (error) {
            console.log(`No '${this.SN_CONFIG_NAME}' file found in the project root.`);
            cfg = new this.configModelType();
        }
        this.Config = cfg;
    }

    /**
     * Validates a specified option set and asks the user if there are some missing option values
     * @param requiredValues The config fields to be provided and to be asked for
     * @returns {Promise<Readonly<SnConfigModel>>} An awaitable promise with the
     * readonly SnAdminConfigModel that will contain all specified values
     */
    public async ValidateAsync<K extends keyof TConfigModel>(...requiredValues: K[]): Promise<Readonly<TConfigModel>> {
        for (const fieldName of requiredValues) {
            const fieldModel = Config.SnConfigFieldModelStore.Get(`${this.configModelType.name}.${fieldName}`);
            const value = this.Config[fieldModel.FieldName];

            if (value && value.length && !(fieldModel.Behavior & Config.SnConfigBehavior.AllowFromConfig)) {
                throw Error(`Field '${fieldName}' is not allowed in snconfig file!`);
            }

            if (!value || !value.length) {
                this.Config[fieldModel.FieldName] =
                    (fieldModel.Behavior & Config.SnConfigBehavior.HideConsoleInput)
                        ?
                        await Ask.PasswordAsync(fieldModel.Question) :
                        await Ask.TextAsync(fieldModel.Question);
            }
        }

        return this.Config;
    }

    /**
     * Overrides the current config with the provided values
     * @param newConfig {Partial<SnCnofigModel>} The new config values
     */
    public OverrideConfig(newConfig: Partial<SnCliConfigModel>) {
        for (const field in newConfig) {
            if (newConfig[field]) {
                this.Config[field] = newConfig[field];
            }
        }
    }
}
