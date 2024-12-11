"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var autoCompleteMultiInput_1 = require("./autoCompleteMultiInput");
var autoCompleteSingleInput_1 = require("./autoCompleteSingleInput");
exports.AutoCompleteInput = function (p) {
    if (p.multiSelect === "multiple") {
        return React.createElement(autoCompleteMultiInput_1.AutoCompleteMultiInput, tslib_1.__assign({}, p));
    }
    return React.createElement(autoCompleteSingleInput_1.AutoCompleteSingleInput, tslib_1.__assign({}, p));
};
