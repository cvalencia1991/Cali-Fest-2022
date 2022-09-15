"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_debug_1 = require("@hint/utils-debug");
const utils_string_1 = require("@hint/utils-string");
const utils_types_1 = require("@hint/utils-types");
const utils_network_1 = require("@hint/utils-network");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
const debug = (0, utils_debug_1.debug)(__filename);
class NoProtocolRelativeUrlsHint {
    constructor(context) {
        const validate = ({ element, resource }) => {
            if (debug.enabled) {
                const html = element.outerHTML;
                debug(`Analyzing link\n${(0, utils_string_1.cutString)(html, 50)}`);
            }
            const src = element.getAttribute('src');
            const href = element.getAttribute('href');
            const url = (src || href || '').trim();
            const rel = element.getAttribute('rel') || '';
            if (url.startsWith('//') && rel !== 'dns-prefetch') {
                debug('Protocol relative URL found');
                const message = (0, i18n_import_1.getMessage)('noProtocolRelativeUrl', context.language);
                const attribute = src ? 'src' : 'href';
                const attributeLocation = element.getAttributeLocation(attribute);
                const fixedUrl = url.replace('//', 'https://');
                const replacementText = `${attribute}="${fixedUrl}"`;
                const fixes = [
                    {
                        location: attributeLocation,
                        text: replacementText
                    }
                ];
                const severity = (0, utils_network_1.isHTTPS)(resource) ?
                    utils_types_1.Severity.hint :
                    utils_types_1.Severity.warning;
                context.report(resource, message, {
                    attribute,
                    content: url,
                    element,
                    fixes,
                    severity
                });
            }
        };
        context.on('element::a', validate);
        context.on('element::img', validate);
        context.on('element::link', validate);
        context.on('element::script', validate);
    }
}
exports.default = NoProtocolRelativeUrlsHint;
NoProtocolRelativeUrlsHint.meta = meta_1.default;
