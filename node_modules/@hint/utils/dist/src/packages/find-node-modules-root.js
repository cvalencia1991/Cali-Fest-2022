"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNodeModulesRoot = void 0;
const path_1 = require("path");
const find_package_root_1 = require("./find-package-root");
const findNodeModulesRoot = (dirname = __dirname) => {
    const packageRoot = (0, find_package_root_1.findPackageRoot)(dirname);
    const nodeModulesPath = (0, path_1.join)(packageRoot, '..');
    if (nodeModulesPath.endsWith('node_modules')) {
        return nodeModulesPath;
    }
    return (0, path_1.join)(packageRoot, 'node_modules');
};
exports.findNodeModulesRoot = findNodeModulesRoot;
