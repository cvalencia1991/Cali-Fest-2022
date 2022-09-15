"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeIgnoreIncludeArrays = void 0;
const to_lowercase_array_1 = require("./to-lowercase-array");
const mergeIgnoreIncludeArrays = (originalArray, ignoreArray = [], includeArray = []) => {
    let result = (0, to_lowercase_array_1.toLowerCaseArray)(originalArray);
    const include = (0, to_lowercase_array_1.toLowerCaseArray)(includeArray);
    const ignore = (0, to_lowercase_array_1.toLowerCaseArray)(ignoreArray);
    include.forEach((e) => {
        if (!result.includes(e)) {
            result.push(e);
        }
    });
    result = result.filter((e) => {
        return !ignore.includes(e);
    });
    return result;
};
exports.mergeIgnoreIncludeArrays = mergeIgnoreIncludeArrays;
