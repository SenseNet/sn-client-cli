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
const Path = require("path");
const pathhelper_1 = require("../src/utils/pathhelper");
const stage_1 = require("../src/utils/stage");
const expect = Chai.expect;
let StageTests = class StageTests {
    before() {
        this.pathHelper = new pathhelper_1.PathHelper('c:/temp/snclienttest', 'c:/temp/snclienttest/node_modules/sn-client-js');
        this.stage = new stage_1.Stage(this.pathHelper);
    }
    TempFolderPath() {
        expect(this.stage.TempFolderPath).to.be.eq(Path.join(this.pathHelper.SnClientPath, 'tmp'));
    }
    PreparePromise() {
        const promise = this.stage.PrepareAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }
    CompilePromise() {
        const promise = this.stage.CompileAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }
    UpdatePromise() {
        const promise = this.stage.UpdateModuleAsync();
        expect(promise).to.be.an.instanceOf(Promise);
    }
};
__decorate([
    mocha_typescript_1.test('Should have a proper temp folder path'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StageTests.prototype, "TempFolderPath", null);
__decorate([
    mocha_typescript_1.test('Prepare Should return an awaitable promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StageTests.prototype, "PreparePromise", null);
__decorate([
    mocha_typescript_1.test('Compile Should return an awaitable promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StageTests.prototype, "CompilePromise", null);
__decorate([
    mocha_typescript_1.test('UpdateModule Should return an awaitable promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StageTests.prototype, "UpdatePromise", null);
StageTests = __decorate([
    mocha_typescript_1.suite('Stage tests')
], StageTests);
exports.StageTests = StageTests;
//# sourceMappingURL=StageTests.js.map