import * as Prompt from 'prompt';
import { Config } from "sn-client-js";
import { SnCliConfigModel } from './snconfig/snconfigmodel';

/**
 * This class is a wrapper for command-line data input in Node.Js console applications
 */
export class Ask {

    /**
     * Prompts a question to the console and awaits a text input. The typings will be displayed as a plain text.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    public static async TextAsync(question: string): Promise<string> {
        return Ask.Ask(question);
    }

    /**
     * Prompts a question to the console and awaits a text input. The typing won't be displayed in the console.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    public static async PasswordAsync(question: string): Promise<string> {
        return Ask.Ask(question, true);
    }

    /**
     *
     * @param question The string that will be displayed before the user input
     * @param hide {boolean} Indicates if the user input needs to be hidden
     */
    private static async Ask(question: string, hide: boolean = false): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            Prompt.start();
            Prompt.get([
                {
                    hidden: hide,
                    name: question,
                    required: true,
                },
            ], (err, res) => {
                resolve(res[question]);
            });
        });
    }

    public static createPromptQuestionFromConfigName(fieldName: string) {
        const cfg = Config.SnConfigFieldModelStore.Get(fieldName);
        return {
            description: cfg.Question,   // ??
            hidden: cfg.Behavior | Config.SnConfigBehavior.HideConsoleInput,
            name: cfg.FieldName,
        };
    }

    /**
     * Asks about a list of provided config values
     * @param missingConfigs {K[]} A keys from SnConfigModel's fields which has to be asked
     */
    public static async MissingConfigs<K extends keyof SnCliConfigModel>(...missingConfigs: K[]): Promise<Partial<SnCliConfigModel>> {
        return new Promise<Partial<SnCliConfigModel>>((resolve, reject) => {
            Prompt.start();
            const configs = missingConfigs.map((cfg) => {
                this.createPromptQuestionFromConfigName(cfg);
            });
            Prompt.get(configs, (err, res) => {
                resolve();
            });
        });
    }
}
