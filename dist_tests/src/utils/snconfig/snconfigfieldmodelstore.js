"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigbehavior_1 = require("./snconfigbehavior");
/**
 * Class that stores the model data for the SnConfigModel's fields, filled by the SnConfigField decorator
 */
class SnConfigFieldModelStore {
    /**
     * Adds a new model to the store
     * @param newModel {SnConfigFieldModel} The field model to be added
     * @throws error {Error} if a field with the same name already exists
     */
    static Add(newModel) {
        if (this.Contains(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`);
        }
        this.store[newModel.FieldName] = newModel;
    }
    /**
     * Returns an entry for the specified field
     * @param fieldName {string} The field's name to search for
     * @throws error {error} if the store doesn't contain entry for the field.
     */
    static Get(fieldName) {
        const found = this.store[fieldName];
        if (!found) {
            throw new Error(`No entry found with the field name '${fieldName}'`);
        }
        return this.store[fieldName];
    }
    /**
     * Checks if the store contains value with the specified field
     * @param fieldName fieldName {string} The field's name to search for
     */
    static Contains(fieldName) {
        const found = this.store[fieldName];
        return found !== undefined;
    }
    /**
     * Gets the fields which are available for command line option input
     * @returns {SnCofigFieldModel[]} The listof the fields
     */
    static GetCommandOptions() {
        const items = [];
        for (const field in this.store) {
            if (field && (this.store[field].Behavior & snconfigbehavior_1.SnConfigBehavior.AllowFromCommandLine) === snconfigbehavior_1.SnConfigBehavior.AllowFromCommandLine) {
                items.push(this.store[field]);
            }
        }
        return items;
    }
}
/**
 * An array that contains the field definitions
 */
SnConfigFieldModelStore.store = [];
exports.SnConfigFieldModelStore = SnConfigFieldModelStore;
//# sourceMappingURL=snconfigfieldmodelstore.js.map