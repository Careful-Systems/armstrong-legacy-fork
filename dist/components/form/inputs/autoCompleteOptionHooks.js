"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var useThrottle_1 = require("../../../hooks/timing/useThrottle");
var utils_1 = require("../../../utilities/utils");
function useOptions(allOptions, config) {
    if (config === void 0) { config = {}; }
    var _a = React.useState((!config.emptyOnLoad && allOptions) || []), options = _a[0], setOptions = _a[1];
    var _b = React.useState(""), filter = _b[0], onFilterChanged = _b[1];
    var setFilter = React.useCallback(function (query) {
        onFilterChanged(query);
        setOptions(utils_1.utils.array.filter(allOptions, function (o) { return o.name.toLowerCase().indexOf(query.toLowerCase()) > -1; }));
    }, [allOptions]);
    React.useEffect(function () {
        if (!config.emptyOnLoad && allOptions) {
            setOptions(allOptions);
        }
    }, [allOptions]);
    return { options: options, filter: filter, setFilter: setFilter };
}
exports.useOptions = useOptions;
function useRemoteOptions(remoteQuery) {
    var _a = React.useState([]), options = _a[0], setOptions = _a[1];
    var _b = React.useState(""), filter = _b[0], setFilter = _b[1];
    var onFilterChanged = React.useCallback(function (query) {
        remoteQuery(query)
            .then(function (opts) { return setOptions(opts); })
            .catch(function (e) {
            // tslint:disable-next-line: no-console
            console.log("Unable to perform query");
        });
    }, [remoteQuery]);
    useThrottle_1.useThrottle(filter, 2000, onFilterChanged);
    return { options: options, filter: filter, setFilter: setFilter };
}
exports.useRemoteOptions = useRemoteOptions;
