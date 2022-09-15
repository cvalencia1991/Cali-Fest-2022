"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalConfig = void 0;
const path = require("path");
const merge = require("lodash/merge");
const utils_network_1 = require("@hint/utils-network");
const utils_fs_1 = require("@hint/utils-fs");
const getParsingError = (errorMsg, resource, innerException, code) => {
    const error = new Error(errorMsg);
    error.resource = resource;
    error.code = code;
    error.stack = innerException ? innerException : error.stack;
    return error;
};
const finalConfig = (config, resource) => {
    if (!config.extends) {
        return config;
    }
    const configIncludes = [];
    let configPath = (0, utils_network_1.asPathString)((0, utils_network_1.getAsUri)(resource));
    configIncludes.push(path.normalize(configPath));
    let finalConfigJSON = merge({}, config);
    while (finalConfigJSON.extends) {
        const lastPath = configPath;
        const configDir = path.dirname(configPath);
        try {
            configPath = require.resolve(finalConfigJSON.extends, { paths: [configDir] });
        }
        catch (error) {
            const castedError = error;
            if (castedError && castedError.code === 'MODULE_NOT_FOUND') {
                return getParsingError('Parent configuration missing', resource, error, 'MODULE_NOT_FOUND');
            }
            return getParsingError('Unknown error while parsing configuration', resource, error);
        }
        if (configIncludes.includes(configPath)) {
            const originalPathUri = (0, utils_network_1.getAsUri)(configIncludes[0]);
            const resource = originalPathUri && originalPathUri.toString() || lastPath;
            return getParsingError(`Circular reference found in file ${lastPath}`, resource);
        }
        delete finalConfigJSON.extends;
        try {
            const extendedConfig = (0, utils_fs_1.loadJSONFile)(configPath);
            configIncludes.push(configPath);
            finalConfigJSON = merge({}, extendedConfig, finalConfigJSON);
        }
        catch (err) {
            const lastPathUri = (0, utils_network_1.getAsUri)(lastPath);
            const error = err;
            error.resource = lastPathUri && lastPathUri.toString() || lastPath;
            return error;
        }
    }
    return finalConfigJSON;
};
exports.finalConfig = finalConfig;
