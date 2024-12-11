"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utils_1 = require("../../utilities/utils");
function Repeater(props) {
    var count = props.count, Render = props.render;
    return (React.createElement(React.Fragment, null, utils_1.utils.array.range(1, count + 1).map(function (index) { return React.createElement(Render, { key: index, index: index }); })));
}
exports.Repeater = Repeater;
