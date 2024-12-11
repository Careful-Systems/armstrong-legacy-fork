"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var _ = require("underscore");
exports.Tooltip = function (props) {
    var tooltip = props.tooltip, children = props.children, retain = props.retain, disable = props.disable, position = props.position, customPosition = props.customPosition, wrapperAttributes = props.wrapperAttributes, childrenAttributes = props.childrenAttributes, tooltipAttributes = props.tooltipAttributes, center = props.center, withArrow = props.withArrow;
    var defaultPositions = ["right", "left", "bottom", "top", "fixed", "hidden"];
    var tooltipElement = React.useRef(null);
    var _a = React.useState(0), currentPosition = _a[0], setCurrentPosition = _a[1]; // Index in position priority array currently being used
    // Creates full position priority array, by taking user specified positions, & adding unspecified positions onto the end
    var normalisePositionPriority = React.useCallback(function (positions) {
        var positionsArray = typeof positions === "string" ? [positions] : positions;
        var uniquePositions = _.uniq(positionsArray);
        var unsetPositions = _.difference(defaultPositions, uniquePositions);
        return tslib_1.__spreadArrays(uniquePositions, unsetPositions);
    }, []);
    // Uses customPosition if passed in, otherwise gets normalised position priority
    var positionPriority = React.useMemo(function () {
        switch (typeof customPosition) {
            case "string":
                return [customPosition];
            case "object":
                return customPosition;
            case "undefined":
                return normalisePositionPriority(position);
        }
    }, [position]);
    // Checks if an element is fully within the viewport
    var isInViewport = React.useCallback(function (element) {
        var bounding = element.getBoundingClientRect();
        var viewportWidth = document.documentElement.clientWidth || window.innerWidth;
        var viewportHeight = document.documentElement.clientHeight || window.innerHeight;
        return (bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= viewportWidth &&
            bounding.bottom <= viewportHeight);
    }, []);
    // If current tooltip position is not visible, moves on to next position, unless already on last position
    React.useEffect(function () {
        if (tooltipElement.current && currentPosition + 1 < positionPriority.length && (currentPosition < 0 || !isInViewport(tooltipElement.current))) {
            setCurrentPosition(currentPosition + 1);
        }
    }, [tooltipElement, currentPosition]);
    // Appends default classes, & applies tooltip as aria-label to children
    var createAttributes = React.useCallback(function (attributes, className) {
        var attr = Object.assign({}, attributes);
        attr.className = (attr.className ? attr.className : "") + " " + className;
        if (className === "tooltip-children" && !attr["aria-label"] && typeof tooltip === "string") {
            attr["aria-label"] = tooltip;
        }
        return attr;
    }, []);
    var wrapperAttr = React.useMemo(function () { return createAttributes(wrapperAttributes, "tooltip-wrapper"); }, [wrapperAttributes]);
    var childrenAttr = React.useMemo(function () { return createAttributes(childrenAttributes, "tooltip-children"); }, [childrenAttributes]);
    var tooltipAttr = React.useMemo(function () { return createAttributes(tooltipAttributes, "tooltip"); }, [tooltipAttributes]);
    return (
    // currentPosition set to -1, as setting to 0 doesn't trigger useEffect when it's already 0
    React.createElement("div", tslib_1.__assign({}, wrapperAttr, { onMouseEnter: function () { return setCurrentPosition(-1); } }),
        React.createElement("div", tslib_1.__assign({}, childrenAttr), children),
        React.createElement("div", tslib_1.__assign({}, tooltipAttr, { ref: tooltipElement, "data-retain": retain, "data-center": !!center, "data-arrow": !!withArrow, "data-position": positionPriority[currentPosition] && !disable ? positionPriority[currentPosition] : "hidden" }), tooltip)));
};
exports.Tooltip.defaultProps = {
    retain: false,
    disable: false,
    center: true,
    withArrow: true,
    position: ["top", "right", "left", "bottom", "fixed", "hidden"],
    wrapperAttributes: {},
    childrenAttributes: {},
    tooltipAttributes: {}
};
