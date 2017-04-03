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
const Prompt = require("prompt");
const snconfigbehavior_1 = require("./snconfig/snconfigbehavior");
const snconfigfieldmodelstore_1 = require("./snconfig/snconfigfieldmodelstore");
/**
 * This class is a wrapper for command-line data input in Node.Js console applications
 */
class Ask {
    /**
     * Prompts a question to the console and awaits a text input. The typings will be displayed as a plain text.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    static TextAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question);
        });
    }
    /**
     * Prompts a question to the console and awaits a text input. The typing won't be displayed in the console.
     * @param question {string} A question to be asked before reading the data
     * @returns {Promise<string>} A promise that will be resolved when the user press ENTER key
     */
    static PasswordAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question, true);
        });
    }
    /**
     *
     * @param question The string that will be displayed before the user input
     * @param hide {boolean} Indicates if the user input needs to be hidden
     */
    static Ask(question, hide = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
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
        });
    }
    static createPromptQuestionFromConfigName(fieldName) {
        const cfg = snconfigfieldmodelstore_1.SnConfigFieldModelStore.Get(fieldName);
        return {
            description: cfg.Question,
            hidden: cfg.Behavior | snconfigbehavior_1.SnConfigBehavior.HideConsoleInput,
            name: cfg.FieldName,
        };
    }
    /**
     * Asks about a list of provided config values
     * @param missingConfigs {K[]} A keys from SnConfigModel's fields which has to be asked
     */
    static MissingConfigs(...missingConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Prompt.start();
                const configs = missingConfigs.map(this.createPromptQuestionFromConfigName);
                Prompt.get(configs, (err, res) => {
                    resolve();
                });
            });
        });
    }
}
exports.Ask = Ask;
//# sourceMappingURL=ask.js.map