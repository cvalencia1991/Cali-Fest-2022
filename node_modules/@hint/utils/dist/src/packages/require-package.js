"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePackage = void 0;
const requirePackage = (modulePath) => {
    let pkg;
    if (process.env.webpack) {
        pkg = __non_webpack_require__(modulePath);
    }
    else {
        pkg = require(modulePath);
    }
    return pkg;
};
exports.requirePackage = requirePackage;
