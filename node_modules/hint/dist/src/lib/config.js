"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
const os = require("os");
const path = require("path");
const browserslist = require("browserslist");
const mergeWith = require("lodash/mergeWith");
const utils_1 = require("@hint/utils");
const utils_fs_1 = require("@hint/utils-fs");
const utils_debug_1 = require("@hint/utils-debug");
const utils_json_1 = require("@hint/utils-json");
const config_validator_1 = require("./config/config-validator");
const config_hints_1 = require("./config/config-hints");
const resourceLoader = require("./utils/resource-loader");
const debug = (0, utils_debug_1.debug)(__filename);
const CONFIG_FILES = [
    '.hintrc',
    '.hintrc.js',
    '.hintrc.json',
    'package.json'
];
const loadPackageJSONConfigFile = (filePath) => {
    debug(`Loading package.json config file: ${filePath}`);
    try {
        return (0, utils_fs_1.loadJSONFile)(filePath).hintConfig || null;
    }
    catch (e) {
        debug(`Error reading package.json file: ${filePath}`);
        const err = e;
        err.message = `Cannot read config file: ${filePath}\nError: ${err.message}`;
        throw err;
    }
};
const composeConfig = (userConfig, parentConfig = '') => {
    debug('Composing configuration from extends');
    if (!userConfig.extends || !Array.isArray(userConfig.extends) || userConfig.extends.length === 0) {
        return userConfig;
    }
    const configurations = userConfig.extends.map((config) => {
        const loadedConfiguration = resourceLoader.loadConfiguration(config, [parentConfig]);
        if (!(0, config_validator_1.validateConfig)(loadedConfiguration)) {
            throw new Error(`Configuration package "${config}" is not valid`);
        }
        loadedConfiguration.hints = (0, utils_1.normalizeHints)(loadedConfiguration.hints);
        return composeConfig(loadedConfiguration, config);
    });
    const finalConfig = mergeWith({}, ...configurations, userConfig, (objValue, srcValue) => {
        if (Array.isArray(objValue) && Array.isArray(srcValue)) {
            return objValue.concat(srcValue);
        }
        return void 0;
    });
    finalConfig.formatters = userConfig.formatters ? userConfig.formatters : finalConfig.formatters;
    if (finalConfig.formatters) {
        finalConfig.formatters = Array.from(new Set(finalConfig.formatters));
    }
    if (finalConfig.parsers) {
        finalConfig.parsers = Array.from(new Set(finalConfig.parsers));
    }
    return finalConfig;
};
const loadIgnoredUrls = (userConfig) => {
    debug('Initializing ignored urls');
    const ignoredUrls = new Map();
    if (userConfig.ignoredUrls) {
        userConfig.ignoredUrls.forEach((ignoredUrl) => {
            const { domain: urlRegexString, hints } = ignoredUrl;
            hints.forEach((hint) => {
                const hintName = hint === '*' ? 'all' : hint;
                const urlsInHint = ignoredUrls.get(hintName);
                const urlRegex = new RegExp(urlRegexString, 'i');
                if (!urlsInHint) {
                    ignoredUrls.set(hintName, [urlRegex]);
                }
                else {
                    urlsInHint.push(urlRegex);
                }
            });
        });
    }
    return ignoredUrls;
};
const buildHintsConfigFromHintNames = (hintNames, severity) => {
    const hintConfig = {};
    for (const hintName of hintNames) {
        hintConfig[hintName] = severity;
    }
    return hintConfig;
};
const updateConfigWithOptionsValues = (config, options = {}) => {
    debug('overriding config settings with values provided via CLI');
    if (options.formatters) {
        config.formatters = options.formatters;
        debug(`Using formatters option provided from Analyzer options: ${options.formatters.join(', ')}`);
    }
    if (options.hints) {
        config.hints = buildHintsConfigFromHintNames(options.hints, 'error');
        debug(`Using hints option provided from command line: ${options.hints.join(', ')}`);
    }
};
class Configuration {
    constructor(userConfig, browsers, ignoredUrls, hints) {
        this.browserslist = browsers;
        this.formatters = userConfig.formatters;
        this.ignoredUrls = ignoredUrls;
        this.parsers = userConfig.parsers;
        this.hints = hints;
        this.extends = userConfig.extends;
        this.language = userConfig.language;
        this.hintsTimeout = userConfig.hintsTimeout || 60000;
        if (typeof userConfig.connector === 'string') {
            this.connector = {
                name: userConfig.connector,
                options: {}
            };
        }
        else {
            this.connector = userConfig.connector;
        }
    }
    static cleanHints(hints) {
        return Object.entries(hints).reduce((total, [key, value]) => {
            if ((0, config_hints_1.getSeverity)(value)) {
                total[key] = value;
            }
            return total;
        }, {});
    }
    static loadConfigFile(filePath) {
        let config;
        switch (path.extname(filePath)) {
            case '':
            case '.json':
                if (path.basename(filePath) === 'package.json') {
                    config = loadPackageJSONConfigFile(filePath);
                }
                else {
                    config = (0, utils_fs_1.loadJSONFile)(filePath);
                }
                break;
            case '.js':
                config = (0, utils_fs_1.loadJSFile)(filePath);
                break;
            default:
                config = null;
        }
        config = this.toAbsolutePaths(config, filePath);
        return config;
    }
    static toAbsolutePaths(config, configRoot) {
        return (0, utils_1.toAbsolutePaths)(config, configRoot);
    }
    static fromConfig(config, options) {
        var _a;
        if (!config) {
            throw new Error(`Couldn't find a configuration`);
        }
        if (!(0, config_validator_1.validateConfig)(config)) {
            throw new Error(`Couldn't find any valid configuration`);
        }
        const userConfig = composeConfig(config);
        if (typeof userConfig.connector === 'string') {
            userConfig.connector = {
                name: userConfig.connector,
                options: {}
            };
        }
        if (options && options.watch && userConfig.connector && userConfig.connector.options) {
            userConfig.connector.options.watch = options.watch;
        }
        updateConfigWithOptionsValues(userConfig, options);
        if (userConfig.formatters && !Array.isArray(userConfig.formatters)) {
            userConfig.formatters = [userConfig.formatters];
        }
        const browserslistConfig = (_a = config.browserslist) !== null && _a !== void 0 ? _a : browserslist.loadConfig({ path: path.resolve('.') });
        const browsers = browserslist(browserslistConfig !== null && browserslistConfig !== void 0 ? browserslistConfig : ['defaults', 'not IE 11']);
        const ignoredUrls = loadIgnoredUrls(userConfig);
        const hints = Configuration.cleanHints((0, utils_1.normalizeHints)(userConfig.hints));
        return new Configuration(userConfig, browsers, ignoredUrls, hints);
    }
    static validateConnectorConfig(config) {
        const connectorId = config.connector.name;
        debug(`Validating ${connectorId} connector`);
        const Connector = (0, utils_1.loadResource)(connectorId, utils_1.ResourceType.connector);
        debug(`Connector schema:`);
        debug(Connector.schema);
        debug(`User configuration:`);
        debug(config.connector.options);
        return (0, utils_json_1.validate)(Connector.schema, config.connector.options).valid;
    }
    static validateHintsConfig(config) {
        const hints = Object.keys(config.hints);
        const validateResult = hints.reduce((result, hint) => {
            const Hint = resourceLoader.loadHint(hint, config.extends);
            const valid = (0, config_hints_1.validate)(Hint.meta, config.hints[hint], hint);
            if (!valid) {
                result.invalid.push(hint);
            }
            else {
                result.valid.push(hint);
            }
            return result;
        }, { invalid: [], valid: [] });
        return validateResult;
    }
}
exports.Configuration = Configuration;
Configuration.getFilenameForDirectory = (directory) => {
    for (let i = 0, len = CONFIG_FILES.length; i < len; i++) {
        const filename = path.join(directory, CONFIG_FILES[i]);
        if ((0, utils_fs_1.isFile)(filename)) {
            return filename;
        }
    }
    const homedir = os.homedir();
    if (directory === homedir) {
        return null;
    }
    return Configuration.getFilenameForDirectory(homedir);
};
