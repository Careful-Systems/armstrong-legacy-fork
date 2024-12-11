"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../..");
var classHelpers_1 = require("../../utilities/classHelpers");
var icon_1 = require("./icon");
var inViewport_1 = require("./inViewport");
var spinner_1 = require("./spinner");
function useRandomUserImageSrc(sampleUserSeed) {
    var _a = React.useState(undefined), src = _a[0], setSrc = _a[1];
    React.useEffect(function () {
        var url = "https://randomuser.me/api?exc=login,name,location,email,registered,dob,phone,cell,id,nat" + (sampleUserSeed ? "&seed=" + sampleUserSeed : "");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                var response = JSON.parse(xmlHttp.responseText);
                var pictureUrl = response.results[0].picture.large;
                setSrc(pictureUrl);
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }, [sampleUserSeed]);
    return src;
}
exports.useRandomUserImageSrc = useRandomUserImageSrc;
function useDummyImageSrc(width, height) {
    return "http://dummyimage.com/" + height + "x" + width + "/4f5c69/ffffff.png";
}
exports.useDummyImageSrc = useDummyImageSrc;
exports.Image = function (props) {
    var className = props.className, rounded = props.rounded, src = props.src, alternateSources = props.alternateSources, lazy = props.lazy, onEnterViewport = props.onEnterViewport, onExitViewport = props.onExitViewport, rootMargin = props.rootMargin, renderSpinner = props.renderSpinner, spinnerElement = props.spinnerElement, renderError = props.renderError, errorElement = props.errorElement, minimumTimeToSpinner = props.minimumTimeToSpinner, attrs = tslib_1.__rest(props, ["className", "rounded", "src", "alternateSources", "lazy", "onEnterViewport", "onExitViewport", "rootMargin", "renderSpinner", "spinnerElement", "renderError", "errorElement", "minimumTimeToSpinner"]);
    var classes = classHelpers_1.ClassHelpers.classNames(className, { rounded: rounded });
    var _a = React.useState(false), loaded = _a[0], setLoaded = _a[1];
    var _b = React.useState(), spinnerReady = _b[0], setSpinnerReady = _b[1];
    var _c = React.useState(false), errored = _c[0], setErrored = _c[1];
    var imgRef = React.useRef(null);
    var set = __1.useTimeout(function () { return setSpinnerReady(true); }, minimumTimeToSpinner).set;
    var onLoad = React.useCallback(function () {
        setLoaded(true);
    }, []);
    var onError = React.useCallback(function () {
        setErrored(true);
        setLoaded(true);
    }, []);
    React.useLayoutEffect(function () {
        // check if image is cached and run onLoad if it is - (load event does not fire if image is already loaded in another img)
        if (imgRef.current && imgRef.current.complete) {
            onLoad();
        }
    }, [onLoad]);
    return (React.createElement(inViewport_1.default, { once: true, IOProps: { rootMargin: rootMargin }, onEnter: function (entry) {
            set();
            if (onEnterViewport) {
                onEnterViewport(entry);
            }
        }, onExit: onExitViewport }, function (_a) {
        var element = _a.element, enteredViewport = _a.enteredViewport;
        return (React.createElement(React.Fragment, null,
            errored && renderError && !!errorElement && errorElement,
            React.createElement("picture", { className: "armstrong-picture", ref: element, "data-loaded": loaded }, (enteredViewport || !lazy) && (React.createElement(React.Fragment, null,
                (alternateSources || []).map(function (alternateSource) { return (React.createElement("source", tslib_1.__assign({}, alternateSource, { key: JSON.stringify(alternateSource) }))); }),
                React.createElement("img", tslib_1.__assign({}, attrs, { onLoad: onLoad, onError: onError, className: classes, src: enteredViewport || !lazy ? src : "", ref: imgRef }))))),
            !loaded &&
                renderSpinner &&
                spinnerReady &&
                !!spinnerElement &&
                spinnerElement));
    }));
};
exports.Image.defaultProps = {
    rootMargin: "200px",
    spinnerElement: React.createElement(spinner_1.Spinner, { className: "armstrong-picture-spinner" }),
    errorElement: (React.createElement("div", { className: "image-not-found" },
        React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.warning }),
        React.createElement("p", null, "Image not found"))),
    renderSpinner: false,
    renderError: false,
    minimumTimeToSpinner: 500
};
