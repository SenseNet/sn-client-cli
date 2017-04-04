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
const AdmZip = require("adm-zip");
const Path = require("path");
const initializer_1 = require("./initializer");
const download_1 = require("./utils/download");
/**
 * Executeable node.js file for fetching / updating pre-generated
 *  Typescript proxy classes from a Sense/Net Content Repository
 */
const SN_REPOSITORY_URL_POSTFIX = '/Root/System/Schema/Metadata/TypeScript/meta.zip';
function DoFetchTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Sn-Fetch-Types starting...');
            console.log('Checking sn.config.js...');
            const cfg = yield initializer_1.Initializer.SnConfigReader.ValidateAsync('RepositoryUrl', 'UserName', 'Password');
            console.log('Downloading type definitions...');
            const zipBuffer = yield new download_1.Download(cfg.RepositoryUrl, SN_REPOSITORY_URL_POSTFIX)
                .Authenticate(cfg.UserName, cfg.Password)
                .GetAsBufferAsync();
            const zip = AdmZip(zipBuffer);
            console.log('Download completed, extracting...');
            zip.extractAllTo(initializer_1.Initializer.Stage.TempFolderPath + Path.sep + 'src', true);
            console.log('Files extracted, running Build...');
            yield initializer_1.Initializer.Stage.CompileAsync();
            console.log('All done.');
        }
        catch (error) {
            console.error('There was an error during fetching types.');
            console.error(error);
        }
    });
}
exports.DoFetchTypes = DoFetchTypes;
//# sourceMappingURL=sn-fetch-types.js.map