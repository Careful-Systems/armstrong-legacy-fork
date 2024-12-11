"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var classHelpers_1 = require("../../utilities/classHelpers");
var icons_1 = require("./../../utilities/icons");
exports.getIconProps = function (iconSet, iconName) { return ({
    icon: icons_1.Icons[iconSet][iconName],
    iconSet: iconSet
}); };
var isIIcon = function (icon) { return !!icon.icon; };
/** get an icon element from a string, an icon object, or just JSX */
exports.getIconOrJsx = function (icon, iconProps, wrapJsx) {
    if (!icon) {
        return null;
    }
    if (typeof icon === "string") {
        return React.createElement(exports.Icon, tslib_1.__assign({ icon: icon, iconSet: "Icomoon" }, iconProps));
    }
    if (isIIcon(icon)) {
        return React.createElement(exports.Icon, tslib_1.__assign({}, iconProps, icon));
    }
    if (wrapJsx) {
        return wrapJsx(icon);
    }
    return icon;
};
/** get an icon element from a string, an icon object, or just JSX */
exports.useIconOrJsx = function (icon, iconProps, wrapJsx) {
    return React.useMemo(function () { return (icon ? exports.getIconOrJsx(icon, iconProps, wrapJsx) : null); }, [icon, iconProps, wrapJsx]);
};
exports.Icon = function (props) {
    var icon = props.icon, iconSet = props.iconSet, className = props.className, attrs = tslib_1.__rest(props, ["icon", "iconSet", "className"]);
    var classes = React.useMemo(function () { return classHelpers_1.ClassHelpers.classNames("armstrong-icon", "icon", className, icon); }, [className, icon]);
    return React.createElement("i", tslib_1.__assign({}, attrs, { "data-icon-set": iconSet, className: classes }));
};
exports.Icon.defaultProps = {
    iconSet: "Icomoon"
};
// Add icon sets to static Icon to allow old Icon.Icomoon.wrench pattern
Object.keys(icons_1.Icons).forEach(function (key) { return (exports.Icon[key] = icons_1.Icons[key]); });
exports.IcomoonIcon = function (_a) {
    var iconName = _a.iconName, props = tslib_1.__rest(_a, ["iconName"]);
    return React.createElement(exports.Icon, tslib_1.__assign({}, props, { iconSet: "Icomoon", icon: exports.Icon.Icomoon[iconName] }));
};
exports.LinearIcon = function (_a) {
    var iconName = _a.iconName, props = tslib_1.__rest(_a, ["iconName"]);
    return (React.createElement(exports.Icon, tslib_1.__assign({}, props, { iconSet: "LinearIcons", icon: exports.Icon.LinearIcons[iconName] })));
};
