"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeIncludes = void 0;
const normalize_string_1 = require("./normalize-string");
const normalizeIncludes = (source, included) => {
    return (0, normalize_string_1.normalizeString)(source).includes((0, normalize_string_1.normalizeString)(included));
};
exports.normalizeIncludes = normalizeIncludes;
