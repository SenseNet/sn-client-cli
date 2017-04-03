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
const Chai = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const snconfigbehavior_1 = require("../src/utils/snconfig/snconfigbehavior");
const snconfigfieldmodel_1 = require("../src/utils/snconfig/snconfigfieldmodel");
const snconfigfieldmodelstore_1 = require("../src/utils/snconfig/snconfigfieldmodelstore");
const expect = Chai.expect;
let SnConfigTests = class SnConfigTests {
    ConfigEntryCtor() {
        const fieldModel = new snconfigfieldmodel_1.SnConfigFieldModel();
        expect(fieldModel.Behavior).to.be.eq(snconfigbehavior_1.SnConfigBehavior.Default);
    }
    StoreMissing() {
        const find = () => { snconfigfieldmodelstore_1.SnConfigFieldModelStore.Get('exampleFieldName'); };
        expect(find).to.throw(Error);
    }
    StoreDuplicate() {
        const add = () => { snconfigfieldmodelstore_1.SnConfigFieldModelStore.Add({ FieldName: 'Example', Question: 'ExampleQuestion', Behavior: snconfigbehavior_1.SnConfigBehavior.Default }); };
        add(); // add once
        expect(add).to.throw(Error);
    }
    GetCmmandOptions() {
        const commands = snconfigfieldmodelstore_1.SnConfigFieldModelStore.GetCommandOptions();
        commands.forEach((command) => {
            const isAllowed = (command.Behavior & snconfigbehavior_1.SnConfigBehavior.AllowFromCommandLine) === snconfigbehavior_1.SnConfigBehavior.AllowFromCommandLine;
            expect(isAllowed).to.eq(true);
        });
    }
};
__decorate([
    mocha_typescript_1.test('SnConfigFieldModel Should be constructed with SnConfigBehavior.Default'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigTests.prototype, "ConfigEntryCtor", null);
__decorate([
    mocha_typescript_1.test('SnConfigFieldModelStore Should throw error if entity isn\'t in the store '),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigTests.prototype, "StoreMissing", null);
__decorate([
    mocha_typescript_1.test('SnConfigFieldModelStore Should throw an error if you try to add a field that already exists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigTests.prototype, "StoreDuplicate", null);
__decorate([
    mocha_typescript_1.test('GetCommandOptions should return only commands that has AllowFromCommandLine flag'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigTests.prototype, "GetCmmandOptions", null);
SnConfigTests = __decorate([
    mocha_typescript_1.suite('SnConfig Tests')
], SnConfigTests);
exports.SnConfigTests = SnConfigTests;
//# sourceMappingURL=SnConfigTests.js.map