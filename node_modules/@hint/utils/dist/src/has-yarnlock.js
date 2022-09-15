"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasYarnLock = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const hasYarnLock = (directory) => {
    return new Promise((resolve) => {
        (0, fs_1.access)((0, path_1.join)(directory, 'yarn.lock'), (err) => {
            resolve(!err);
        });
    });
};
exports.hasYarnLock = hasYarnLock;
