"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalizeHeaderName = void 0;
const utils_string_1 = require("@hint/utils-string");
const capitalizeHeaderName = (headerName) => {
    const parts = headerName.split('-').map((partialName) => {
        return (0, utils_string_1.toPascalCase)(partialName);
    });
    return parts.join('-');
};
exports.capitalizeHeaderName = capitalizeHeaderName;
