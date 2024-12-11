"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../..");
var icon_1 = require("../display/icon");
function TableOptions(_a) {
    var download = _a.download, filter = _a.filter, onDownload = _a.onDownload, onFilter = _a.onFilter, onPrint = _a.onPrint, print = _a.print;
    return (React.createElement("div", { className: __1.ClassHelpers.classNames("table-options") },
        download && (React.createElement(icon_1.Icon, tslib_1.__assign({}, icon_1.getIconProps("Icomoon", "download"), { icon: icon_1.Icon.Icomoon.download, onClick: onDownload }))),
        print && React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.printer, onClick: onPrint }),
        filter && React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.filter, onClick: onFilter })));
}
exports.TableOptions = TableOptions;
