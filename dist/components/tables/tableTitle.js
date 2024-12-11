"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../..");
exports.TableTitle = function (_a) {
    var subTitle = _a.subTitle, title = _a.title;
    return (React.createElement("div", { className: __1.ClassHelpers.classNames("table-titles") },
        title && React.createElement("div", { className: __1.ClassHelpers.classNames("title") }, title),
        subTitle && (React.createElement("div", { className: __1.ClassHelpers.classNames("sub-title") }, subTitle))));
};
