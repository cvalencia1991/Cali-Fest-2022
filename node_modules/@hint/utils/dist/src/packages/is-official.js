"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOfficial = void 0;
const path_1 = require("path");
const utils_fs_1 = require("@hint/utils-fs");
const find_package_root_1 = require("./find-package-root");
const isOfficial = async () => {
    try {
        const pkg = JSON.parse(await (0, utils_fs_1.readFile)((0, path_1.join)((0, find_package_root_1.findPackageRoot)(process.cwd()), 'package.json')));
        return pkg.name === '@hint/monorepo';
    }
    catch (e) {
        return false;
    }
};
exports.isOfficial = isOfficial;
