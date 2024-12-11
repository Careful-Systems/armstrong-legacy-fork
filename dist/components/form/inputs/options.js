"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../../utilities/utils");
function buildOptions(label, items, valueFactory, labelFactory, enableOptionLabel) {
    if (enableOptionLabel === void 0) { enableOptionLabel = false; }
    var options = [React.createElement("option", { key: "blank", value: "", disabled: !enableOptionLabel }, label)];
    if (items) {
        utils_1.utils.array.each(items, function (d, idx) {
            options.push(React.createElement("option", { key: idx, value: valueFactory(d) }, labelFactory(d)));
        });
    }
    return options;
}
exports.buildOptions = buildOptions;
