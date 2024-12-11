"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utilities/utils");
/** The core 'checkbox' input value converter (always requires a boolean) */
var CheckboxValueConverter = /** @class */ (function () {
    function CheckboxValueConverter(trueValue, falseValue) {
        this.trueValue = trueValue;
        this.falseValue = falseValue;
    }
    CheckboxValueConverter.prototype.convert = function (data) {
        return data === this.trueValue;
    };
    CheckboxValueConverter.prototype.convertBack = function (value) {
        if (value) {
            return this.trueValue;
        }
        return this.falseValue;
    };
    return CheckboxValueConverter;
}());
exports.CheckboxValueConverter = CheckboxValueConverter;
/** The Default pass-through Value converter */
var DefaultValueConverter = /** @class */ (function () {
    function DefaultValueConverter() {
    }
    DefaultValueConverter.prototype.convert = function (data) {
        return data;
    };
    DefaultValueConverter.prototype.convertBack = function (value) {
        return value;
    };
    DefaultValueConverter.instance = new DefaultValueConverter();
    return DefaultValueConverter;
}());
exports.DefaultValueConverter = DefaultValueConverter;
/** A Numeric Value converter to handle converting typed text to a number */
var NumericValueConverter = /** @class */ (function () {
    function NumericValueConverter(options) {
        this.options = options;
    }
    NumericValueConverter.prototype.convert = function (data) {
        var v;
        if (utils_1.utils.object.isNullOrUndefined(data)) {
            v = null;
        }
        if (typeof data === "string") {
            if (data === "") {
                v = null;
            }
            else {
                v = parseFloat(data);
            }
        }
        if (typeof data === "number") {
            v = data.toFixed(this.options && this.options.decimals);
        }
        return v;
    };
    NumericValueConverter.prototype.convertBack = function (value) {
        try {
            if (!value.length) {
                return null;
            }
            if (value.length === 1 && value === "-") {
                return 0;
            }
            if (value.length === 2 && value === "-.") {
                return 0;
            }
            var v = parseFloat(value);
            if (isNaN(v)) {
                return null;
            }
            if (this.options) {
                if (!utils_1.utils.object.isNullOrUndefined(this.options.max)) {
                    v = Math.min(v, this.options.max);
                }
                if (!utils_1.utils.object.isNullOrUndefined(this.options.min)) {
                    v = Math.max(v, this.options.min);
                }
            }
            return v;
        }
        catch (e) {
            return null;
        }
    };
    NumericValueConverter.instance = new NumericValueConverter();
    return NumericValueConverter;
}());
exports.NumericValueConverter = NumericValueConverter;
var MultipleNumericValueConverter = /** @class */ (function () {
    function MultipleNumericValueConverter() {
    }
    MultipleNumericValueConverter.prototype.convert = function (data) {
        return data.map(function (d) { return MultipleNumericValueConverter.converter.convert(d); });
    };
    MultipleNumericValueConverter.prototype.convertBack = function (value) {
        return value.map(function (d) { return MultipleNumericValueConverter.converter.convertBack(d); });
    };
    MultipleNumericValueConverter.converter = NumericValueConverter.instance;
    MultipleNumericValueConverter.instance = new MultipleNumericValueConverter();
    return MultipleNumericValueConverter;
}());
exports.MultipleNumericValueConverter = MultipleNumericValueConverter;
