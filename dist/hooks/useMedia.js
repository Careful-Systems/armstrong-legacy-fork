"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function useMedia(query) {
    var _a = React.useState(window.matchMedia(query).matches), matches = _a[0], setMatches = _a[1];
    React.useEffect(function () {
        var media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        var listener = function () { return setMatches(media.matches); };
        media.addListener(listener);
        return function () { return media.removeListener(listener); };
    }, [matches, query]);
    return matches;
}
exports.useMedia = useMedia;
