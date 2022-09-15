"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_string_1 = require("@hint/utils-string");
const utils_network_1 = require("@hint/utils-network");
const utils_types_1 = require("@hint/utils-types");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
class HighestAvailableDocumentModeHint {
    constructor(context) {
        let requireMetaElement = false;
        let suggestRemoval = false;
        const checkHeader = (resource, responseHeaders) => {
            const originalHeaderValue = responseHeaders['x-ua-compatible'];
            const headerValue = (0, utils_string_1.normalizeString)(originalHeaderValue);
            if (headerValue === null) {
                if (!requireMetaElement && !suggestRemoval) {
                    context.report(resource, (0, i18n_import_1.getMessage)('responseShouldInclude', context.language), { severity: utils_types_1.Severity.hint });
                }
                return;
            }
            const codeSnippet = `Content-Type: ${originalHeaderValue}`;
            const codeLanguage = 'http';
            if (suggestRemoval) {
                context.report(resource, (0, i18n_import_1.getMessage)('responseUnneeded', context.language), {
                    codeLanguage,
                    codeSnippet,
                    severity: utils_types_1.Severity.hint
                });
                return;
            }
            if (headerValue !== 'ie=edge') {
                context.report(resource, (0, i18n_import_1.getMessage)('headerValueShouldBe', context.language), {
                    codeLanguage,
                    codeSnippet,
                    severity: utils_types_1.Severity.error
                });
            }
        };
        const checkMetaElement = (resource) => {
            const pageDOM = context.pageDOM;
            const XUACompatibleMetaElements = pageDOM.querySelectorAll('meta[http-equiv=x-ua-compatible i]');
            if (!requireMetaElement || suggestRemoval) {
                if (XUACompatibleMetaElements.length !== 0) {
                    const errorMessage = suggestRemoval ?
                        (0, i18n_import_1.getMessage)('metaElementShouldNotBeSpecified', context.language) :
                        (0, i18n_import_1.getMessage)('metaElementShouldNotBeSpecifiedUseHeader', context.language);
                    for (const metaElement of XUACompatibleMetaElements) {
                        context.report(resource, errorMessage, {
                            element: metaElement,
                            severity: utils_types_1.Severity.hint
                        });
                    }
                }
                return;
            }
            if (XUACompatibleMetaElements.length === 0) {
                context.report(resource, (0, i18n_import_1.getMessage)('metaElementShouldBeSpecified', context.language), { severity: utils_types_1.Severity.error });
                return;
            }
            const XUACompatibleMetaElement = XUACompatibleMetaElements[0];
            const contentValue = XUACompatibleMetaElement.getAttribute('content');
            if ((0, utils_string_1.normalizeString)(contentValue) !== 'ie=edge') {
                const message = (0, i18n_import_1.getMessage)('metaElementValueShouldBe', context.language);
                context.report(resource, message, {
                    element: XUACompatibleMetaElement,
                    severity: utils_types_1.Severity.error
                });
            }
            const headElements = pageDOM.querySelectorAll('head *');
            let metaElementIsBeforeRequiredElements = true;
            for (const headElement of headElements) {
                if (headElement.isSame(XUACompatibleMetaElement)) {
                    if (!metaElementIsBeforeRequiredElements) {
                        const message = (0, i18n_import_1.getMessage)('metaElementWrongPosition', context.language);
                        context.report(resource, message, {
                            element: XUACompatibleMetaElement,
                            severity: utils_types_1.Severity.error
                        });
                    }
                    break;
                }
                if (!['title', 'meta'].includes(headElement.nodeName.toLowerCase())) {
                    metaElementIsBeforeRequiredElements = false;
                }
            }
            const bodyMetaElements = pageDOM.querySelectorAll('body meta[http-equiv=x-ua-compatible i]');
            if ((bodyMetaElements.length > 0) && bodyMetaElements[0].isSame(XUACompatibleMetaElement)) {
                const message = (0, i18n_import_1.getMessage)('metaElementNotBody', context.language);
                context.report(resource, message, {
                    element: XUACompatibleMetaElement,
                    severity: utils_types_1.Severity.error
                });
                return;
            }
            if (XUACompatibleMetaElements.length > 1) {
                const metaElements = XUACompatibleMetaElements.slice(1);
                for (const metaElement of metaElements) {
                    const message = (0, i18n_import_1.getMessage)('metaElementDuplicated', context.language);
                    context.report(resource, message, {
                        element: metaElement,
                        severity: utils_types_1.Severity.warning
                    });
                }
            }
        };
        const loadHintConfigs = () => {
            requireMetaElement = (context.hintOptions && context.hintOptions.requireMetaElement) || false;
            suggestRemoval = [
                'ie 8',
                'ie 9',
                'ie 10'
            ].every((e) => {
                return !context.targetedBrowsers.includes(e);
            });
        };
        const validate = ({ resource }) => {
            if (!(0, utils_network_1.isLocalFile)(resource) && context.pageHeaders) {
                checkHeader(resource, context.pageHeaders);
            }
            checkMetaElement(resource);
        };
        loadHintConfigs();
        context.on('traverse::end', validate);
    }
}
exports.default = HighestAvailableDocumentModeHint;
HighestAvailableDocumentModeHint.meta = meta_1.default;
