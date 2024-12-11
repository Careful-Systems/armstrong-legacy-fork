"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utilities/utils");
/**
 * Get and Set values in JSON data objects
 * Uses dot notation to access members of the object graph
 * e.g.
 * const name = PropertyPathResolver.getValue(person, "name")
 * const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
 */
var PropertyPathResolver = /** @class */ (function () {
    function PropertyPathResolver() {
    }
    /**
     * Get values in JSON data objects using dot notation to access members of the object graph
     * e.g.
     * const name = PropertyPathResolver.getValue(person, "name")
     * const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
     */
    PropertyPathResolver.getValue = function (data, dataPath) {
        var parts = dataPath.split(".");
        return utils_1.utils.array.reduce(parts, function (result, p, index) {
            if (!result || !p) {
                throw new Error("armstrong-react: Your form binding " + dataPath + " is incorrect! getValue failed on '" + p + "' (part: " + index + ")");
            }
            return result[p];
        }, data);
    };
    /**
     * Set values in JSON data objects using dot notation to access members of the object graph
     * e.g.
     * PropertyPathResolver.setValue(person, "name", "Dave")
     * PropertyPathResolver.setValue(person, "addresses.0.title", "home")
     */
    PropertyPathResolver.setValue = function (data, dataPath, value) {
        var parts = dataPath.split(".");
        var lastIndex = parts.length - 1;
        utils_1.utils.array.each(parts, function (p, index) {
            if (!data || !p) {
                throw new Error("armstrong-react: Your form binding " + dataPath + " is incorrect! setValue failed on '" + p + "' (part: " + index + ")");
            }
            if (index === lastIndex) {
                data[p] = value;
                return;
            }
            data = data[p];
        });
    };
    return PropertyPathResolver;
}());
exports.PropertyPathResolver = PropertyPathResolver;
