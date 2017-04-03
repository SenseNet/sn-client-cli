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
const ask_1 = require("../src/utils/ask");
const expect = Chai.expect;
let AskTests = class AskTests {
    TextAsync() {
        const promise = ask_1.Ask.TextAsync('Text');
        expect(promise).to.be.instanceOf(Promise, 'Should return a promise');
    }
    PasswordAsync() {
        const promise = ask_1.Ask.PasswordAsync('Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }
    createQuestionFromConfig() {
        const q = ask_1.Ask.createPromptQuestionFromConfigName('RepositoryUrl');
        expect(q.name).to.be.eq('RepositoryUrl');
    }
    MissingConfigs() {
        const promise = ask_1.Ask.MissingConfigs();
        expect(promise).to.be.an.instanceOf(Promise);
    }
};
__decorate([
    mocha_typescript_1.test('should return an awaitable Promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AskTests.prototype, "TextAsync", null);
__decorate([
    mocha_typescript_1.test('should return an awaitable Promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AskTests.prototype, "PasswordAsync", null);
__decorate([
    mocha_typescript_1.test('should create Prompt question from config field name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AskTests.prototype, "createQuestionFromConfig", null);
__decorate([
    mocha_typescript_1.test('should return an awaitable Promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AskTests.prototype, "MissingConfigs", null);
AskTests = __decorate([
    mocha_typescript_1.suite('Ask Tests')
], AskTests);
exports.AskTests = AskTests;
//# sourceMappingURL=AskTests.js.map