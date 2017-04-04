"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigbehavior_1 = require("./snconfigbehavior");
/**
 * Class that represents a model for a field in the SnConfig (usually sn.config.js) module file
 */
class SnConfigFieldModel {
    constructor() {
        /**
         * The behavoir of the field, can be flagged
         * @default SnConfigBehavior.Default
         */
        this.Behavior = snconfigbehavior_1.SnConfigBehavior.Default;
    }
}
exports.SnConfigFieldModel = SnConfigFieldModel;
//# sourceMappingURL=snconfigfieldmodel.js.map