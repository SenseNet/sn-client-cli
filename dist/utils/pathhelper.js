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
     * @param SnCliPath {string} The absolute path for the sn-client-cli package directory (e.g.: c:/temp/my-package/node_modules/sn-client-cli)s
     * @constructs PathHelper
     */
    constructor(PackageRootPath, SnClientPath, SnCliPath) {
        this.PackageRootPath = PackageRootPath;
        this.SnClientPath = SnClientPath;
        this.SnCliPath = SnCliPath;
        this.PackageRootPath = Path.normalize(this.PackageRootPath);
        this.SnClientPath = Path.normalize(this.SnClientPath);
        this.SnCliPath = Path.normalize(this.SnCliPath);
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
     * @returns the absolute path (e.g.: c:/temp/my-package/node_modules/sn-client-js/my-dir)
     */
    GetRelativeToSnClientPath(relativePath) {
        return Path.join(this.SnClientPath, relativePath);
    }
    /**
     * Returns an absolute path based on a provided relative (from the sn-client-cli root) one
     * @param relativePath {string} A relative path to the Sn CLI root e.g. './my-dir'
     * @returns the absolute path (e.g.: c:/temp/my-package/node_modulessn-client-cli/my-dir)
     */
    GetRelativeToSnCliPath(relativePath) {
        return Path.join(this.SnCliPath, relativePath);
    }
}
exports.PathHelper = PathHelper;
//# sourceMappingURL=pathhelper.js.map