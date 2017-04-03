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
const download_1 = require("../src/utils/download");
const expect = Chai.expect;
let DownloadTests = class DownloadTests {
    before() {
        this.download = new download_1.Download('demo.sensenet.com', 'index.html');
    }
    EmptyHeaders() {
        expect(Object.keys(this.download['headers']).length).to.be.eq(0);
    }
    BasicAuthHeaders() {
        this.download.Authenticate('username', 'password');
        expect(this.download['headers']['Authorization']).to.be.eq('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
    }
    GetAsBufferAsync() {
        const buffer = this.download.GetAsBufferAsync();
        expect(buffer).to.be.an.instanceOf(Promise);
    }
};
__decorate([
    mocha_typescript_1.test('Shouldn\'t have custom headers by default'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DownloadTests.prototype, "EmptyHeaders", null);
__decorate([
    mocha_typescript_1.test('Should have a proper base64 encoded Basic Authorization header after setting up Authenticate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DownloadTests.prototype, "BasicAuthHeaders", null);
__decorate([
    mocha_typescript_1.test('Should return the file as awaitable Promise on GetAsBufferAsync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DownloadTests.prototype, "GetAsBufferAsync", null);
DownloadTests = __decorate([
    mocha_typescript_1.suite('Download tests')
], DownloadTests);
exports.DownloadTests = DownloadTests;
//# sourceMappingURL=DownloadTests.js.map