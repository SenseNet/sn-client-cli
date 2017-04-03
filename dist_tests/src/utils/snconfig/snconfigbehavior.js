"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This type represents an SnConfig field behavior
 */
var SnConfigBehavior;
(function (SnConfigBehavior) {
    /**
     * Default, no special behavior defined. Not allowed to store in a Config file, will be asked as a plain text value
     */
    SnConfigBehavior[SnConfigBehavior["Default"] = 0] = "Default";
    /**
     * Allows a config entry to be stored in a config file. Recommended for non-confidential values
     */
    SnConfigBehavior[SnConfigBehavior["AllowFromConfig"] = 1] = "AllowFromConfig";
    /**
     * Allows a config entry to be specified via command line option. Recommended for non-confidential values
     */
    SnConfigBehavior[SnConfigBehavior["AllowFromCommandLine"] = 2] = "AllowFromCommandLine";
    /**
     * The console input will be hidden, when a value is asked.
     * Recommended for confidential values (e.g. password for authentication)
     */
    SnConfigBehavior[SnConfigBehavior["HideConsoleInput"] = 4] = "HideConsoleInput";
})(SnConfigBehavior = exports.SnConfigBehavior || (exports.SnConfigBehavior = {}));
//# sourceMappingURL=snconfigbehavior.js.map