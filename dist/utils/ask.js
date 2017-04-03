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
class Ask {
    static TextAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question);
        });
    }
    static PasswordAsync(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return Ask.Ask(question, true);
        });
    }
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
    static MissingConfigs(...missingConfigs) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Prompt.start();
                const configs = missingConfigs.map((fieldName) => {
                    const cfg = snconfigfieldmodelstore_1.SnConfigFieldModelStore.Get(fieldName);
                    return {
                        description: cfg.Question,
                        hidden: cfg.Behavior | snconfigbehavior_1.SnConfigBehavior.HideConsoleInput,
                        name: cfg.FieldName,
                    };
                });
                Prompt.get(configs, (err, res) => {
                    resolve();
                });
            });
        });
    }
}
exports.Ask = Ask;
//# sourceMappingURL=ask.js.map