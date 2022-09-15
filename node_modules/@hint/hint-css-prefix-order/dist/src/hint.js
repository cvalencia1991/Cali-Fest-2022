"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_debug_1 = require("@hint/utils-debug");
const utils_css_1 = require("@hint/utils-css");
const utils_types_1 = require("@hint/utils-types");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
const debug = (0, utils_debug_1.debug)(__filename);
const generateFixes = (pair) => {
    var _a, _b, _c, _d;
    const lastPrefixedStart = (_a = pair.lastPrefixed.source) === null || _a === void 0 ? void 0 : _a.start;
    const lastPrefixedEnd = (_b = pair.lastPrefixed.source) === null || _b === void 0 ? void 0 : _b.end;
    const unprefixedStart = (_c = pair.unprefixed.source) === null || _c === void 0 ? void 0 : _c.start;
    const unprefixedEnd = (_d = pair.unprefixed.source) === null || _d === void 0 ? void 0 : _d.end;
    if (!lastPrefixedStart || !lastPrefixedEnd || !unprefixedStart || !unprefixedEnd) {
        return undefined;
    }
    return [
        {
            location: {
                column: lastPrefixedStart.column - 1,
                endColumn: lastPrefixedEnd.column - 1,
                endLine: lastPrefixedEnd.line - 1,
                line: lastPrefixedStart.line - 1
            },
            text: pair.unprefixed.toString()
        },
        {
            location: {
                column: unprefixedStart.column - 1,
                endColumn: unprefixedEnd.column - 1,
                endLine: unprefixedEnd.line - 1,
                line: unprefixedStart.line - 1
            },
            text: pair.lastPrefixed.toString()
        }
    ];
};
const validatePair = (pair) => {
    if (!pair.lastPrefixed || !pair.unprefixed) {
        return false;
    }
    const prefixedLocation = (0, utils_css_1.getCSSLocationFromNode)(pair.lastPrefixed) || { column: 0, line: 0 };
    const unprefixedLocation = (0, utils_css_1.getCSSLocationFromNode)(pair.unprefixed) || { column: 0, line: 0 };
    if (prefixedLocation.line < unprefixedLocation.line) {
        return false;
    }
    if (prefixedLocation.line > unprefixedLocation.line) {
        return true;
    }
    return prefixedLocation.column > unprefixedLocation.column;
};
const validateRule = (rule) => {
    const map = new Map();
    rule.each((decl) => {
        if (!('prop' in decl)) {
            return;
        }
        const name = decl.prop;
        const baseName = (0, utils_css_1.getUnprefixed)(name);
        const value = decl.value;
        const baseValue = (0, utils_css_1.getUnprefixed)(value);
        if (!map.has(baseName)) {
            map.set(baseName, {});
        }
        const pair = map.get(baseName);
        if (name === baseName && value === baseValue) {
            pair.unprefixed = decl;
        }
        else {
            pair.lastPrefixed = decl;
        }
    });
    return [...map.values()].filter(validatePair);
};
class CssPrefixOrderHint {
    constructor(context) {
        const formatMessage = (invalidPair) => {
            let name = invalidPair.unprefixed.prop;
            let prefixedName = invalidPair.lastPrefixed.prop;
            if (name === prefixedName) {
                name = `${invalidPair.unprefixed}`;
                prefixedName = `${invalidPair.lastPrefixed}`;
            }
            return (0, i18n_import_1.getMessage)('shouldBeListed', context.language, [name, prefixedName]);
        };
        context.on('parse::end::css', ({ ast, element, resource }) => {
            debug('Validating hint css-prefix-order');
            ast.walkRules((rule) => {
                for (const invalidPair of validateRule(rule)) {
                    const message = formatMessage(invalidPair);
                    const isValue = invalidPair.lastPrefixed.prop === invalidPair.unprefixed.prop;
                    const location = (0, utils_css_1.getCSSLocationFromNode)(invalidPair.unprefixed, { isValue });
                    const codeSnippet = (0, utils_css_1.getFullCSSCodeSnippet)(invalidPair.unprefixed);
                    const severity = utils_types_1.Severity.warning;
                    context.report(resource, message, {
                        codeLanguage: 'css',
                        codeSnippet,
                        element,
                        fixes: generateFixes(invalidPair),
                        location,
                        severity
                    });
                }
            });
        });
    }
}
exports.default = CssPrefixOrderHint;
CssPrefixOrderHint.meta = meta_1.default;
