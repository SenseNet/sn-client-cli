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
const expect = Chai.expect;
let PathHelperTests = class PathHelperTests {
    before() {
        this.PathHelper = new pathhelper_1.PathHelper('c:/temp/package/../package', 'c:/temp/package/../package/node_modules/sn-client-js', 'c:/temp/package/../package/node_modules/sn-client-cli');
    }
    PackageRootPath() {
        expect(this.PathHelper.PackageRootPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package`);
    }
    SnClientPath() {
        expect(this.PathHelper.SnClientPath).to.be.eq(`c:${Path.sep}temp${Path.sep}package${Path.sep}node_modules${Path.sep}sn-client-js`);
    }
    RealiblePackageRoot() {
        expect(this.PathHelper.GetRelativeToPackageRootPath('./alma')).to.be.eq(Path.join(this.PathHelper.PackageRootPath, './alma'));
    }
    RealibleSnClientPath() {
        expect(this.PathHelper.GetRelativeToSnClientPath('./alma')).to.be.eq(Path.join(this.PathHelper.SnClientPath, './alma'));
    }
};
__decorate([
    mocha_typescript_1.test('Should normalize PackageRoot path'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PathHelperTests.prototype, "PackageRootPath", null);
__decorate([
    mocha_typescript_1.test('Should normalize SnClient path'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PathHelperTests.prototype, "SnClientPath", null);
__decorate([
    mocha_typescript_1.test('Should provide realible relative path to PackageRootPath'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PathHelperTests.prototype, "RealiblePackageRoot", null);
__decorate([
    mocha_typescript_1.test('Should provide realible relative path to SnClientPath'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PathHelperTests.prototype, "RealibleSnClientPath", null);
PathHelperTests = __decorate([
    mocha_typescript_1.suite('Path Helper Tests')
], PathHelperTests);
exports.PathHelperTests = PathHelperTests;
//# sourceMappingURL=PathHelperTests.js.map