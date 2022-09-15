"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_string_1 = require("@hint/utils-string");
const utils_types_1 = require("@hint/utils-types");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
class MetaCharsetUTF8Hint {
    constructor(context) {
        let validated = false;
        context.on('scan::end', () => {
            validated = false;
        });
        context.on('parse::end::html', ({ document, html, resource }) => {
            if (validated) {
                return;
            }
            validated = true;
            if (document.isFragment) {
                return;
            }
            const charsetMetaElements = document.querySelectorAll('meta[charset], meta[http-equiv="content-type" i]');
            const headElement = document.querySelectorAll('head')[0];
            if (charsetMetaElements.length === 0) {
                const fixes = [];
                const headElementLocation = headElement.getLocation();
                if (headElementLocation.line !== -1) {
                    const text = headElement.prependChildOuterHtml('<meta charset="utf-8">');
                    const fix = {
                        location: headElement.getLocation(),
                        text
                    };
                    fixes.push(fix);
                }
                else {
                    const htmlElement = document.querySelectorAll('html')[0];
                    const htmlElementLocation = htmlElement.getLocation();
                    if (htmlElementLocation.line !== -1) {
                        const text = htmlElement.prependChildOuterHtml('<head><meta charset="utf-8"></head>');
                        const fix = {
                            location: htmlElement.getLocation(),
                            text
                        };
                        fixes.push(fix);
                    }
                }
                context.report(resource, (0, i18n_import_1.getMessage)('metaElementNotSpecified', context.language), {
                    fixes,
                    severity: utils_types_1.Severity.warning
                });
                return;
            }
            const charsetMetaElement = charsetMetaElements[0];
            if (charsetMetaElement.getAttribute('http-equiv') !== null) {
                context.report(resource, (0, i18n_import_1.getMessage)('metaElementShorter', context.language), {
                    element: charsetMetaElement,
                    fixes: [
                        {
                            location: charsetMetaElement.getLocation(),
                            text: '<meta charset="utf-8">'
                        }
                    ],
                    severity: utils_types_1.Severity.warning
                });
            }
            else {
                const metaValue = (0, utils_string_1.normalizeString)(charsetMetaElement.getAttribute('charset'));
                if (metaValue !== 'utf-8') {
                    const severity = metaValue === 'utf8' ?
                        utils_types_1.Severity.warning :
                        utils_types_1.Severity.error;
                    context.report(resource, (0, i18n_import_1.getMessage)('metaElementWrongValue', context.language), {
                        element: charsetMetaElement,
                        fixes: [
                            {
                                location: charsetMetaElement.getAttributeLocation('charset'),
                                text: 'charset="utf-8"'
                            }
                        ],
                        severity
                    });
                }
            }
            const firstHeadElement = document.querySelectorAll('head :first-child')[0];
            const isCharsetMetaFirstHeadElement = charsetMetaElement && firstHeadElement && charsetMetaElement.isSame(firstHeadElement);
            const headElementContent = document.querySelectorAll('head')[0].outerHTML;
            const isMetaElementFirstHeadContent = (/^<head[^>]*>\s*<meta/).test(headElementContent);
            const prependMetaInHeadFix = {
                location: headElement.getLocation(),
                text: headElement.prependChildOuterHtml(charsetMetaElement.outerHTML, true)
            };
            const removeMetaElementFix = {
                location: charsetMetaElement.getLocation(),
                text: ''
            };
            if (!isCharsetMetaFirstHeadElement || !isMetaElementFirstHeadContent) {
                const fixes = [prependMetaInHeadFix];
                let isMetaWithinHead = false;
                let checkParent = charsetMetaElement.parentElement;
                while (checkParent) {
                    if (headElement.isSame(checkParent)) {
                        isMetaWithinHead = true;
                        break;
                    }
                    checkParent = checkParent.parentElement;
                }
                if (!isMetaWithinHead) {
                    fixes.unshift(removeMetaElementFix);
                }
                const severity = ((firstHeadElement === null || firstHeadElement === void 0 ? void 0 : firstHeadElement.getLocation().endOffset) || 0) <= 1024 ?
                    utils_types_1.Severity.hint :
                    utils_types_1.Severity.error;
                context.report(resource, (0, i18n_import_1.getMessage)('metaElementFirstThing', context.language), {
                    element: charsetMetaElement,
                    fixes,
                    severity
                });
            }
            const bodyMetaElements = document.querySelectorAll('body meta[charset], body meta[http-equiv="content-type" i]');
            if (bodyMetaElements[0] && bodyMetaElements[0].isSame(charsetMetaElement)) {
                const fixes = [
                    removeMetaElementFix,
                    prependMetaInHeadFix
                ];
                context.report(resource, (0, i18n_import_1.getMessage)('metaElementInBody', context.language), {
                    element: charsetMetaElement,
                    fixes,
                    severity: utils_types_1.Severity.error
                });
                return;
            }
            if (charsetMetaElements.length > 1) {
                const metaElements = charsetMetaElements.slice(1);
                for (const metaElement of metaElements) {
                    const fixes = [
                        {
                            location: metaElement.getLocation(),
                            text: ''
                        }
                    ];
                    context.report(resource, (0, i18n_import_1.getMessage)('metaElementDuplicated', context.language), {
                        element: metaElement,
                        fixes,
                        severity: utils_types_1.Severity.warning
                    });
                }
            }
        });
    }
}
exports.default = MetaCharsetUTF8Hint;
MetaCharsetUTF8Hint.meta = meta_1.default;
