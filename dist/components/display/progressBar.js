"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var colorHelper_1 = require("../../utilities/colorHelper");
/** A simple progress bar that takes a progress prop between 0 and 100 */
exports.ProgressBar = function (_a) {
    var progress = _a.progress, direction = _a.direction, thickness = _a.thickness, labelText = _a.labelText, labelVariant = _a.labelVariant, className = _a.className, startColor = _a.startColor, endColor = _a.endColor, completeColor = _a.completeColor;
    var outerStyle = React.useMemo(function () {
        switch (direction) {
            case "down":
            case "up":
                return { width: thickness };
            case "right":
            case "left":
                return { height: thickness };
        }
    }, [direction, thickness]);
    var clampedProgress = React.useMemo(function () { return Math.max(Math.min(progress, 100), 0); }, [progress]);
    var innerStyle = React.useMemo(function () {
        switch (direction) {
            case "down":
                return {
                    top: 0,
                    left: 0,
                    right: 0,
                    height: clampedProgress + "%"
                };
            case "right":
                return {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: clampedProgress + "%"
                };
            case "up":
                return {
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: clampedProgress + "%"
                };
            case "left":
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: clampedProgress + "%"
                };
        }
    }, [clampedProgress, direction]);
    var labelStyle = React.useMemo(function () {
        switch (labelVariant) {
            case "following": {
                switch (direction) {
                    case "down":
                        return {
                            top: clampedProgress + "%"
                        };
                    case "right":
                        return {
                            left: clampedProgress + "%"
                        };
                    case "up":
                        return {
                            bottom: clampedProgress + "%"
                        };
                    case "left":
                        return {
                            right: clampedProgress + "%"
                        };
                }
            }
        }
    }, [clampedProgress, direction, labelVariant]);
    var startColorRGB = React.useMemo(function () { return startColor && colorHelper_1.ColorHelper.hexToRgb(startColor); }, [startColor]);
    var endColorRGB = React.useMemo(function () { return endColor && colorHelper_1.ColorHelper.hexToRgb(endColor); }, [endColor]);
    var getChannel = React.useCallback(function (channel) {
        if (startColorRGB && endColorRGB) {
            var start = startColorRGB[channel];
            var end = endColorRGB[channel];
            var current = start + ((end - start) / 100) * clampedProgress;
            return current;
        }
    }, [clampedProgress, startColorRGB, endColorRGB]);
    var currentColour = React.useMemo(function () {
        var r = getChannel("r");
        var g = getChannel("g");
        var b = getChannel("b");
        return { r: r, g: g, b: b };
    }, [getChannel]);
    var colourStyle = React.useMemo(function () {
        return completeColor && clampedProgress >= 100
            ? {
                backgroundColor: completeColor
            }
            : startColor && endColor
                ? {
                    backgroundColor: "rgb(" + currentColour.r + ", " + currentColour.g + ", " + currentColour.b + ")"
                }
                : {};
    }, [startColor, endColor, currentColour, completeColor]);
    return (React.createElement("div", { className: classHelpers_1.ClassHelpers.classNames("progress-bar", className), style: outerStyle, "data-direction": direction, "data-complete": clampedProgress >= 100 },
        React.createElement("div", { className: "progress-bar-inner", style: tslib_1.__assign(tslib_1.__assign({}, innerStyle), colourStyle) }),
        labelText && (React.createElement("p", { className: "label", "data-variant": labelVariant, style: labelStyle }, labelText))));
};
exports.ProgressBar.defaultProps = {
    thickness: "19px",
    direction: "right",
    labelVariant: "centre"
};
/**
 * A progress bar which wraps the Armstrong ProgressBar component, where the progress is faked.
 * Allows visual feedback for requests where progress isn't actually known. The progress increases by a defined proportion of the remaining progress, never reaching 100%, until the prop loaded is set
 */
exports.AutoProgressBar = function (_a) {
    var increaseInterval = _a.increaseInterval, increaseProportion = _a.increaseProportion, loaded = _a.loaded, loading = _a.loading, maxProgressBeforeLoaded = _a.maxProgressBeforeLoaded, labelText = _a.labelText, props = tslib_1.__rest(_a, ["increaseInterval", "increaseProportion", "loaded", "loading", "maxProgressBeforeLoaded", "labelText"]);
    var _b = React.useState(0), progress = _b[0], setProgress = _b[1];
    var interval = React.useRef(null);
    var onInterval = React.useCallback(function () {
        if (loading) {
            setProgress(function (p) { return p + (maxProgressBeforeLoaded - p) * increaseProportion; });
        }
    }, [increaseInterval, increaseProportion, maxProgressBeforeLoaded, loading]);
    React.useEffect(function () {
        if (loading && !loaded) {
            interval.current = setInterval(onInterval, increaseInterval);
        }
        return function () {
            clearInterval(interval.current);
        };
    }, [loading, increaseInterval, increaseProportion, maxProgressBeforeLoaded]);
    React.useEffect(function () {
        if (loaded) {
            clearInterval(interval.current);
            setProgress(100);
        }
    }, [loaded]);
    return (React.createElement(exports.ProgressBar, tslib_1.__assign({ progress: progress, labelText: labelText && labelText(Math.round(progress * 100) * 0.01) }, props)));
};
exports.AutoProgressBar.defaultProps = {
    increaseInterval: 300,
    increaseProportion: 0.3,
    maxProgressBeforeLoaded: 90
};
