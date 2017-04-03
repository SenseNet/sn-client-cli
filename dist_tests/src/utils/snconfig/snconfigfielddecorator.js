"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigfieldmodelstore_1 = require("./snconfigfieldmodelstore");
/**
 * This function has to be used in the SnConfigModel class to provide additional metadata for the SnConfig fields
 * @param model {SnConfigFieldModel} The field model parameters
 * @returns {function(SnConfigModel)} A factory method which fills the SnConfigModelStore
 * with for the decorated field with the provided field model data
 */
function SnConfigField(model) {
    return (target, propertyName) => {
        model.FieldName = propertyName;
        snconfigfieldmodelstore_1.SnConfigFieldModelStore.Add(model);
    };
}
exports.SnConfigField = SnConfigField;
//# sourceMappingURL=snconfigfielddecorator.js.map