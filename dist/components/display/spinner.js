"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../..");
var icon_1 = require("./icon");
exports.Spinner = function (_a) {
    var children = _a.children, className = _a.className, icon = _a.icon, reversed = _a.reversed, fill = _a.fill, HTMLProps = tslib_1.__rest(_a, ["children", "className", "icon", "reversed", "fill"]);
    return (React.createElement("div", tslib_1.__assign({ className: __1.ClassHelpers.classNames("spinner", className) }, HTMLProps, { "data-reversed": reversed, "data-fill": fill }), children || icon_1.getIconOrJsx(icon)));
};
exports.Spinner.defaultProps = {
    icon: icon_1.Icon.Icomoon.spinner2,
    fill: true
};
