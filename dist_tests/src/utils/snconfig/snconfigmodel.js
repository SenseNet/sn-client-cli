"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigbehavior_1 = require("./snconfigbehavior");
const snconfigfielddecorator_1 = require("./snconfigfielddecorator");
/**
 * Class that represents a typed model for the Sense/Net related configuration for an NPM Package
 */
class SnConfigModel {
}
__decorate([
    snconfigfielddecorator_1.SnConfigField({
        Behavior: snconfigbehavior_1.SnConfigBehavior.AllowFromConfig | snconfigbehavior_1.SnConfigBehavior.AllowFromCommandLine,
        FieldDescription: 'URL to the repository (e.g.: demo.sensenet.com)',
        Question: 'Please enter your Sense/Net Site URL(e.g.:demo.sensenet.com):',
    }),
    __metadata("design:type", String)
], SnConfigModel.prototype, "RepositoryUrl", void 0);
__decorate([
    snconfigfielddecorator_1.SnConfigField({
        Behavior: snconfigbehavior_1.SnConfigBehavior.AllowFromConfig,
        FieldDescription: 'Name for a user',
        Question: 'Please enter the username: ',
    }),
    __metadata("design:type", String)
], SnConfigModel.prototype, "UserName", void 0);
__decorate([
    snconfigfielddecorator_1.SnConfigField({
        Behavior: snconfigbehavior_1.SnConfigBehavior.HideConsoleInput,
        Question: 'Please enter the password for the user',
    }),
    __metadata("design:type", String)
], SnConfigModel.prototype, "Password", void 0);
exports.SnConfigModel = SnConfigModel;
//# sourceMappingURL=snconfigmodel.js.map