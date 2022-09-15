"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJSONFile = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const read_file_1 = require("./read-file");
const loadJSONFile = (filePath) => {
    const jsonStr = (0, read_file_1.readFile)(filePath);
    const data = (0, jsonc_parser_1.parse)(jsonStr);
    const root = (0, jsonc_parser_1.parseTree)(jsonStr);
    if (!root || !root.children || root.children.length === 0) {
        JSON.parse(jsonStr);
    }
    return data;
};
exports.loadJSONFile = loadJSONFile;
