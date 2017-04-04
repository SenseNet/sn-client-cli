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
const Delete = require("del");
const Gulp = require("gulp");
const Promisify = require("gulp-promisify");
const GulpRun = require("gulp-run");
const Path = require("path");
const TEMP_FOLDER_NAME = 'tmp';
/**
 * This class is used to handle the new incoming types from the repository in a transactional way.
 * Usage
 *  - make a clean environment (temp folder)
 *  - copy the existing client-related Typescript modules and test files (some of them will be overwritten the new ones from the repository)
 *  - build the module
 *  - run the unit tests
 *  - (if the build and the unit tests has been succeeded) copy the files back to the package root
 *  - clean up the temporary environment
 */
class Stage {
    /**
     * @param paths {PathHelper} Contextual path options
     * @constructs Stage
     */
    constructor(paths) {
        this.paths = paths;
        Promisify(Gulp);
    }
    /**
     * @returns The absolute path of the Temporary folder
     */
    get TempFolderPath() {
        return `${this.paths.SnClientPath}${Path.sep}${TEMP_FOLDER_NAME}`;
    }
    /**
     * Prepare the specified temporary folder
     * - Cleans up if neccessary
     * - Copies the existing Typescript source files and testss
     */
    PrepareAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            this.Cleanup();
            const task = Gulp.src([
                `./src/**/*.ts`,
                `./test/**/*.ts`,
                `!./src/SN.d.ts`,
                `./tsconfig.json`,
            ], {
                base: this.paths.SnClientPath,
                cwd: this.paths.SnClientPath,
            })
                .pipe(Gulp.dest(this.TempFolderPath));
            yield task.resume();
        });
    }
    UpdateModuleAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const task = Gulp.src([
                `./src/**/*.ts`,
                `./test/**/*.ts`,
                `!./src/SN.d.ts`,
                `./tsconfig.json`,
            ], {
                base: this.TempFolderPath,
                cwd: this.TempFolderPath,
            })
                .pipe(Gulp.dest(this.paths.SnClientPath));
            yield task.resume();
        });
    }
    InitializeConfigAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Gulp.src([
                './sn.config.js'
            ], {
                base: this.paths.SnCliPath,
                cwd: this.paths.SnCliPath
            })
                .pipe(Gulp.dest(this.paths.PackageRootPath))
                .resume();
        });
    }
    CallGulpRunAsync(command, workingDir) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                GulpRun(command, {
                    cwd: workingDir,
                    verbosity: 3,
                }).exec((err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    /**
     * Cleans up (deletes) the specified temporary folder
     */
    Cleanup() {
        Delete.sync(this.TempFolderPath, { force: true });
    }
}
exports.Stage = Stage;
//# sourceMappingURL=stage.js.map