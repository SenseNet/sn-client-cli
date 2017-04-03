"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const snconfigbehavior_1 = require("./snconfigbehavior");
class SnConfigFieldModelStore {
    static Add(newModel) {
        if (this.Contains(newModel.FieldName)) {
            throw new Error(`Field ${newModel.FieldName} for configuration model already in the store!`);
        }
        this.store[newModel.FieldName] = newModel;
    }
    static Get(fieldName) {
        const found = this.store[fieldName];
        if (!found) {
            throw new Error(`No entry found with the field name '${fieldName}'`);
        }
        return this.store[fieldName];
    }
    static Contains(fieldName) {
        const found = this.store[fieldName];
        return found !== undefined;
    }
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
SnConfigFieldModelStore.store = [];
exports.SnConfigFieldModelStore = SnConfigFieldModelStore;
//# sourceMappingURL=snconfigfieldmodelstore.js.map