"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var layoutHelpers_1 = require("../../utilities/layoutHelpers");
function sizeErrorMessage(size, sizeValue, controlPath) {
    return "Unsupported " + size + " property '" + sizeValue + "' on " + controlPath + ". If you are using a string, make sure it is either 'auto' or follows the pattern '[number]*'";
}
exports.GridRef = function (props, ref) {
    var className = props.className, debugMode = props.debugMode, fillContainer = props.fillContainer, tagName = props.tagName, attrs = tslib_1.__rest(props, ["className", "debugMode", "fillContainer", "tagName"]);
    var grid = React.useRef(undefined);
    var refCallback = React.useCallback(function () {
        return grid.current;
    }, [grid]);
    React.useImperativeHandle(ref, refCallback, [refCallback]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames(className, "grid", {
        "fill-container": fillContainer,
        "grid-debug": debugMode,
    }); }, [className, fillContainer, debugMode]);
    return React.createElement(tagName, tslib_1.__assign(tslib_1.__assign({}, attrs), { ref: grid, className: classes }));
};
exports.Grid = React.forwardRef(exports.GridRef);
exports.Grid.defaultProps = {
    tagName: "div",
};
function needsFixedHeight(height) {
    if (!height) {
        return false;
    }
    if (typeof height === "number") {
        return true;
    }
    if (height === "auto") {
        return true;
    }
    return false;
}
exports.Row = function (props) {
    var className = props.className, height = props.height, tagName = props.tagName, style = props.style, attrs = tslib_1.__rest(props, ["className", "height", "tagName", "style"]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames(className, "row", needsFixedHeight(height) ? "no-flex" : ""); }, [className, height]);
    var styles = React.useMemo(function () {
        if (height) {
            if (typeof height === "number") {
                return tslib_1.__assign({ height: height + "px" }, style);
            }
            if (height === "auto") {
                return style;
            }
            var starIndex = height.indexOf("*");
            if (starIndex !== -1 && parseFloat(height)) {
                var spans = height.substr(0, starIndex);
                return tslib_1.__assign({ flex: "" + spans }, style);
            }
            // tslint:disable-next-line:no-console
            console.error(sizeErrorMessage("height", height, "Grid > Row"));
        }
    }, [style, height]);
    return React.createElement(tagName, tslib_1.__assign(tslib_1.__assign({}, attrs), { className: classes, style: styles }), React.Children.map(props.children, function (c) {
        return c ? React.cloneElement(c, { style: c.props.style }) : null;
    }));
};
exports.Row.defaultProps = {
    tagName: "div",
};
function needsFixedWidth(width) {
    if (!width) {
        return false;
    }
    if (typeof width === "number") {
        return true;
    }
    if (width === "auto") {
        return true;
    }
    return false;
}
exports.Col = function (props) {
    var className = props.className, width = props.width, horizontalAlignment = props.horizontalAlignment, verticalAlignment = props.verticalAlignment, tagName = props.tagName, style = props.style, attrs = tslib_1.__rest(props, ["className", "width", "horizontalAlignment", "verticalAlignment", "tagName", "style"]);
    var alignmentClasses = React.useMemo(function () { return layoutHelpers_1.LayoutHelpers.GetAlignmentClasses(verticalAlignment, horizontalAlignment); }, [verticalAlignment, horizontalAlignment]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("col", className, alignmentClasses, {
        "no-flex": needsFixedWidth(width),
    }); }, [className, alignmentClasses, width]);
    var styles = React.useMemo(function () {
        if (width) {
            if (typeof width === "number") {
                return tslib_1.__assign({ maxWidth: width + "px", width: "100%" }, style);
            }
            if (width === "auto") {
                return style;
            }
            var starIndex = width.indexOf("*");
            if (starIndex !== -1 && parseFloat(width)) {
                var spans = width.substr(0, starIndex);
                return tslib_1.__assign({ flex: "" + spans }, style);
            }
            // tslint:disable-next-line:no-console
            console.error(sizeErrorMessage("width", width, "Grid > Row > Col"));
        }
        if (typeof width === "number") {
            return tslib_1.__assign({ maxWidth: width + "px", width: "100%" }, style);
        }
        return style;
    }, [style, width]);
    return React.createElement(tagName, tslib_1.__assign(tslib_1.__assign({}, attrs), { className: classes, style: styles }));
};
exports.Col.defaultProps = {
    tagName: "div",
};
