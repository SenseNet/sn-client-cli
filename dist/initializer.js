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
const Path = require("path");
const pathhelper_1 = require("./utils/pathhelper");
const snconfigreader_1 = require("./utils/snconfig/snconfigreader");
const stage_1 = require("./utils/stage");
class Initializer {
    static get Stage() {
        return this.stage;
    }
    static get PathHelper() {
        return this.pathHelper;
    }
    static get SnConfigReader() {
        return this.configReader;
    }
    static Init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pathHelper = new pathhelper_1.PathHelper(process.cwd(), `${__dirname}${Path.sep}..`);
            this.stage = new stage_1.Stage(this.pathHelper);
            yield this.stage.PrepareAsync();
            this.configReader = new snconfigreader_1.SnConfigReader(this.pathHelper.PackageRootPath);
            this.configReader.ReadConfigFile();
        });
    }
}
exports.Initializer = Initializer;
//# sourceMappingURL=initializer.js.map