"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var __1 = require("../..");
var spinner_1 = require("./spinner");
exports.DataList = function (props) {
    var _a = React.useState(false), firstFetchComplete = _a[0], setFirstFetchComplete = _a[1];
    var _b = React.useState(null), dragStartY = _b[0], setDragStartY = _b[1];
    var _c = React.useState(0), dragDeltaY = _c[0], setDragDeltaY = _c[1];
    var _d = React.useState(0), scrollOffsetY = _d[0], setscrollOffsetY = _d[1];
    var _e = React.useState(false), scrolledToBottom = _e[0], setScrolledToBottom = _e[1];
    var _f = React.useState("idle"), refreshStatus = _f[0], setrefreshStatus = _f[1];
    var className = props.className, maxDistance = props.maxDistance, refreshThreshold = props.refreshThreshold, postRefreshDelayMs = props.postRefreshDelayMs, refreshing = props.refreshing, hideChildrenWhileRefreshing = props.hideChildrenWhileRefreshing, refreshData = props.refreshData, refreshingComponent = props.refreshingComponent, skipFirstFetch = props.skipFirstFetch, onScrollToBottom = props.onScrollToBottom, scrollToBottomRootMargin = props.scrollToBottomRootMargin, attrs = tslib_1.__rest(props, ["className", "maxDistance", "refreshThreshold", "postRefreshDelayMs", "refreshing", "hideChildrenWhileRefreshing", "refreshData", "refreshingComponent", "skipFirstFetch", "onScrollToBottom", "scrollToBottomRootMargin"]);
    var handleDragStart = React.useCallback(function (e) {
        if (refreshStatus === "refreshing") {
            return;
        }
        setDragStartY(e.touches[0].clientY + scrollOffsetY);
    }, [refreshStatus]);
    var runRefresh = React.useCallback(function (force) {
        if (refreshStatus === "required" || force) {
            props.refreshData();
            setrefreshStatus("refreshing");
        }
    }, [refreshStatus, props.refreshData]);
    var handleDragEnd = React.useCallback(function (e) {
        setDragDeltaY(0);
        setDragStartY(null);
        runRefresh();
    }, [runRefresh]);
    var handleDragMove = React.useCallback(function (e) {
        if (refreshStatus === "refreshing") {
            return;
        }
        if (dragStartY !== null) {
            var delta = dragStartY - e.touches[0].clientY;
            if (delta < 10 && scrollOffsetY === 0) {
                setDragDeltaY(Math.max(delta, -props.maxDistance));
            }
        }
    }, [refreshStatus, dragStartY, scrollOffsetY, props.maxDistance]);
    var handleScroll = React.useCallback(function (e) {
        var top = e.currentTarget.scrollTop;
        if (props.onScrollToBottom) {
            var hasScrolledToBottom = top >=
                e.currentTarget.scrollHeight -
                    e.currentTarget.clientHeight -
                    props.scrollToBottomRootMargin;
            if (hasScrolledToBottom !== scrolledToBottom) {
                setScrolledToBottom(hasScrolledToBottom);
            }
        }
        setscrollOffsetY(top);
    }, [scrolledToBottom, props.onScrollToBottom]);
    React.useEffect(function () {
        if (dragDeltaY > -props.refreshThreshold) {
            if (refreshStatus === "required") {
                setrefreshStatus("idle");
            }
        }
        else {
            if (refreshStatus !== "required") {
                setrefreshStatus("required");
            }
        }
    }, [dragDeltaY, props.refreshThreshold, refreshStatus]);
    React.useEffect(function () {
        if (props.refreshing) {
            if (!firstFetchComplete && props.skipFirstFetch) {
                setFirstFetchComplete(true);
                return;
            }
            setrefreshStatus("refreshing");
        }
        else {
            window.setTimeout(function () {
                setrefreshStatus("idle");
            }, props.postRefreshDelayMs);
        }
    }, [props.refreshing]);
    var calculatePullPercentage = React.useCallback(function () {
        if (refreshStatus === "refreshing") {
            return 100;
        }
        var op = Math.min(props.refreshThreshold, -dragDeltaY) *
            (props.maxDistance / props.refreshThreshold);
        return op;
    }, [
        props.refreshThreshold,
        dragDeltaY,
        props.maxDistance,
        refreshStatus,
        props.refreshThreshold
    ]);
    var calculateTransformValue = React.useCallback(function () {
        if (dragDeltaY >= 0 && refreshStatus === "idle") {
            return 0;
        }
        if (refreshStatus === "refreshing") {
            return 50;
        }
        return -Math.max(dragDeltaY, -props.maxDistance);
    }, [dragDeltaY, props.maxDistance, refreshStatus]);
    // This stops iOS safaris bounce effect :(
    React.useEffect(function () {
        document.querySelector("html").classList.add("force-fixed");
        return function () { return document.querySelector("html").classList.remove("force-fixed"); };
    }, []);
    return (React.createElement("div", tslib_1.__assign({ className: __1.ClassHelpers.classNames("data-list-container", refreshStatus, className) }, attrs),
        React.createElement("div", { className: "refresh-indicator", style: {
                opacity: calculatePullPercentage() / 100,
                height: calculateTransformValue() + "px"
            } },
            !props.refreshingComponent && (React.createElement(React.Fragment, null,
                refreshStatus === "refreshing" && React.createElement(spinner_1.Spinner, { fill: false }),
                refreshStatus === "idle" && "Pull to refresh",
                refreshStatus === "required" && "Let go to refresh",
                refreshStatus === "refreshing" && "Refreshing")),
            props.refreshingComponent),
        React.createElement("div", { style: { transform: "translateY(" + calculateTransformValue() + "px)" }, className: __1.ClassHelpers.classNames("data-list", { dragging: dragStartY !== null }, { "hide-flow": Math.round(dragDeltaY) < 0 }), onScroll: handleScroll, onTouchMove: handleDragMove, onTouchStart: handleDragStart, onTouchEnd: handleDragEnd }, (refreshStatus !== "refreshing" ||
            (refreshStatus === "refreshing" &&
                !props.hideChildrenWhileRefreshing)) &&
            props.children)));
};
exports.DataList.defaultProps = {
    maxDistance: 100,
    refreshThreshold: 50,
    postRefreshDelayMs: 1000,
    hideChildrenWhileRefreshing: false,
    skipFirstFetch: true
};
