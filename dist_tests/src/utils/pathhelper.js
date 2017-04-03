"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
/**
 * Helper class for providing full paths from relative ones
 */
class PathHelper {
    /**
     * @param PackageRootPath {string} The absolute path for the current client package directory (e.g.: c:/temp/my-package)
     * @param SnClientPath {string} The absolute path for the sn-client-js package directory (e.g.: c:/temp/my-package/node_modules/sn-client-js)
     * @constructs PathHelper
     */
    constructor(PackageRootPath, SnClientPath) {
        this.PackageRootPath = PackageRootPath;
        this.SnClientPath = SnClientPath;
        this.PackageRootPath = Path.normalize(this.PackageRootPath);
        this.SnClientPath = Path.normalize(this.SnClientPath);
        console.log(`Sn Client package path: ${this.SnClientPath}`);
        console.log(`Package root path: ${this.PackageRootPath}`);
    }
    /**
     * Returns an absolute path based on a provided relative (from the package root) one
     * @param relativePath {string} A relative path to the package root e.g. './my-dir'
     * @returns the absolute path (e.g.: c:/temp/my-package/my-dir)
     */
    GetRelativeToPackageRootPath(relativePath) {
        return Path.join(this.PackageRootPath, relativePath);
    }
    /**
     * Returns an absolute path based on a provided relative (from the sn-client-js root) one
     * @param relativePath {string} A relative path to the package root e.g. './my-dir'
     * @returns the absolute path (e.g.: c:/temp/my-package/node_modules/my-dir)
     */
    GetRelativeToSnClientPath(relativePath) {
        return Path.join(this.SnClientPath, relativePath);
    }
}
exports.PathHelper = PathHelper;
//# sourceMappingURL=pathhelper.js.map