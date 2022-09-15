"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadJSFile = void 0;
const loadJSFile = (filePath) => {
    let file;
    if (process.env.webpack) {
        file = __non_webpack_require__(filePath);
    }
    else {
        file = require(filePath);
    }
    return file;
};
exports.loadJSFile = loadJSFile;
