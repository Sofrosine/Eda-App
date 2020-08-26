"use strict";
exports.__esModule = true;
exports.PersistCustom = void 0;
var React = require("react");
var lodash_debounce_1 = require("lodash.debounce");
var react_fast_compare_1 = require("react-fast-compare");
// Copied from https://usehooks.com/usePrevious/
// License is Unlicensed, https://github.com/gragland/usehooks/blob/master/LICENSE
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    var ref = React.useRef();
    // Store current value in ref
    React.useEffect(function () {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
function PersistCustom(formik, name, debounceDelay, isSessionStorage) {
    if (debounceDelay === void 0) { debounceDelay = 300; }
    if (isSessionStorage === void 0) { isSessionStorage = false; }
    var saveForm = React.useMemo(function () {
        return lodash_debounce_1["default"](function (data) {
            if (isSessionStorage) {
                window.sessionStorage.setItem(name, JSON.stringify(data));
            }
            else {
                window.localStorage.setItem(name, JSON.stringify(data));
            }
        }, debounceDelay);
    }, [debounceDelay, isSessionStorage, name]);
    React.useEffect(function () {
        var maybeState = isSessionStorage
            ? window.sessionStorage.getItem(name)
            : window.localStorage.getItem(name);
        if (maybeState) {
            formik.setValues(JSON.parse(maybeState));
            console.log('set state', maybeState);
        }
    }, []); // deps must be empty, effect will run only on mount
    var previousValues = usePrevious(formik.values);
    React.useEffect(function () {
        if (previousValues && !react_fast_compare_1["default"](previousValues, formik.values)) {
            saveForm(formik.values);
        }
    }, [formik.values, previousValues, saveForm]);
}
exports.PersistCustom = PersistCustom;
