import * as Delete from 'del';
import * as FileSystem from 'fs-extra';
import * as Gulp from 'gulp';
import * as Promisify from 'gulp-promisify';
import * as GulpRun from 'gulp-run';
import { PathHelper } from './pathhelper';

import * as Path from 'path';

/**
 * This class is used to handle the new incoming types from the repository in a transactional way.
 * Usage:
 *  - clean up environment (temp folder)
 *  - copy the existing client-related Typescript modules and test files (some of them will be overwritten the new ones from the repository)
 *  - build the module
 *  - run the unit tests
 *  - (if the build and the unit tests has been succeeded) copy the files back to the package root
 *  - clean up the temporary environment
 */
export class Stage {

    private readonly TEMP_FOLDER_NAME: string = 'tmp';

    /**
     * @param paths {PathHelper} Contextual path options
     * @constructs Stage
     */
    constructor(private paths: PathHelper) {
        Promisify(Gulp);
    }

    /**
     * @returns The absolute path of the Temporary folder
     */
    public get TempFolderPath(): string {
        return `${this.paths.SnClientPath}${Path.sep}${this.TEMP_FOLDER_NAME}`;
    }

    /**
     * Prepare the specified temporary folder
     * - Cleans up if neccessary
     * - Copies the existing Typescript source files and testss
     */
    public async PrepareAsync() {
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
        await task.resume();
    }

    public async UpdateModuleAsync() {
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
        await task.resume();
    }

    public async InitializeConfigAsync() {
        const filename = 'sn.config.js';
        return new Promise((resolve, reject) => {
            FileSystem.copy(this.paths.GetRelativeToSnCliPath(filename), this.paths.GetRelativeToPackageRootPath(filename), (err) => {
                if (err) {
                    reject(err);
                } else { resolve(); }
            });
        });
    }

    public async CallGulpRunAsync(command: string, workingDir: string): Promise<any> {
        return new Promise((resolve, reject) => {
            GulpRun(command, {
                cwd: workingDir,
                verbosity: 3,
            }).exec((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * Cleans up (deletes) the specified temporary folder
     */
    public Cleanup() {
        Delete.sync(this.TempFolderPath, { force: true });
    }
}
