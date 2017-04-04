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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chai = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const snconfigmodel_1 = require("../src/utils/snconfig/snconfigmodel");
const snconfigreader_1 = require("../src/utils/snconfig/snconfigreader");
const expect = Chai.expect;
let SnConfigReaderTests = class SnConfigReaderTests {
    before() {
        this.reader = new snconfigreader_1.SnConfigReader(process.cwd());
    }
    Read() {
        const promise = this.reader.ReadConfigFile();
        expect(promise).to.be.an.instanceOf(Promise);
    }
    ReadNonExisting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.reader.ReadConfigFile('invalidConfig.js');
            expect(this.reader.Config).to.be.instanceof(snconfigmodel_1.SnConfigModel);
        });
    }
    ValidatePromise() {
        const promise = this.reader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
        expect(promise).to.be.an.instanceOf(Promise);
    }
    ValidateResolve() {
        return __awaiter(this, void 0, void 0, function* () {
            this.reader.Config = {
                RepositoryUrl: 'url',
                UserName: 'username',
                Password: 'password',
            };
            const cfg = yield this.reader.ValidateAsync('RepositoryUrl');
            expect(cfg.RepositoryUrl).to.be.eq('url');
        });
    }
    ValidateShouldThrowWhenNotAllowed(done) {
        this.reader.Config = {
            RepositoryUrl: '',
            UserName: 'user',
            Password: 'password',
        };
        this.reader.ValidateAsync('Password')
            .then(() => {
            done('Exception expcected');
        })
            .catch(() => done());
    }
    OverrideConfigTest() {
        this.reader.Config = {
            RepositoryUrl: 'url',
            UserName: 'username',
            Password: 'password',
        };
        expect(this.reader.Config.RepositoryUrl).to.be.eq('url');
        this.reader.OverrideConfig({
            RepositoryUrl: 'localhost'
        });
        expect(this.reader.Config.RepositoryUrl).to.be.eq('localhost');
    }
};
__decorate([
    mocha_typescript_1.test('ReadConfigFile should return an awaitable promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigReaderTests.prototype, "Read", null);
__decorate([
    mocha_typescript_1.test('Should create a new config if not exists'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SnConfigReaderTests.prototype, "ReadNonExisting", null);
__decorate([
    mocha_typescript_1.test('ValidateAsync should return an awaitable promise'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigReaderTests.prototype, "ValidatePromise", null);
__decorate([
    mocha_typescript_1.test('Shouldn resolve when all fields are provided'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SnConfigReaderTests.prototype, "ValidateResolve", null);
__decorate([
    mocha_typescript_1.test('Should throw an error if a field is provided but disallowed form config by behavior'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SnConfigReaderTests.prototype, "ValidateShouldThrowWhenNotAllowed", null);
__decorate([
    mocha_typescript_1.test('OverrideConfig should override provided value'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SnConfigReaderTests.prototype, "OverrideConfigTest", null);
SnConfigReaderTests = __decorate([
    mocha_typescript_1.suite('SnConfigReader tests')
], SnConfigReaderTests);
exports.SnConfigReaderTests = SnConfigReaderTests;
//# sourceMappingURL=SnConfigReaderTests.js.map