"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_type_1 = require("content-type");
const utils_debug_1 = require("@hint/utils-debug");
const utils_string_1 = require("@hint/utils-string");
const utils_network_1 = require("@hint/utils-network");
const content_type_2 = require("@hint/utils/dist/src/content-type");
const utils_types_1 = require("@hint/utils-types");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
const debug = (0, utils_debug_1.debug)(__filename);
class ContentTypeHint {
    constructor(context) {
        let userDefinedMediaTypes;
        const loadHintConfigs = () => {
            userDefinedMediaTypes = context.hintOptions || {};
        };
        const getLastRegexThatMatches = (resource) => {
            const results = (Object.entries(userDefinedMediaTypes).filter(([regex]) => {
                const re = new RegExp(regex, 'i');
                return re.test(resource);
            }))
                .pop();
            return results && results[1];
        };
        const validate = ({ resource, response }) => {
            if (response.statusCode !== 200) {
                debug('Check does not apply to status code !== 200');
                return;
            }
            if ((0, utils_network_1.isDataURI)(resource)) {
                debug('Check does not apply for data URIs');
                return;
            }
            const contentTypeHeaderValue = (0, utils_network_1.normalizeHeaderValue)(response.headers, 'content-type');
            const noSniff = (0, utils_network_1.normalizeHeaderValue)(response.headers, 'x-content-type-options') === 'no-sniff';
            const severity = noSniff ? utils_types_1.Severity.error : utils_types_1.Severity.warning;
            const codeSnippet = `Content-Type: ${contentTypeHeaderValue}`;
            const codeLanguage = 'http';
            if (contentTypeHeaderValue === null) {
                context.report(resource, (0, i18n_import_1.getMessage)('responseShouldIncludeContentType', context.language), { severity });
                return;
            }
            const userDefinedMediaType = getLastRegexThatMatches(resource);
            if (userDefinedMediaType) {
                if ((0, utils_string_1.normalizeString)(userDefinedMediaType) !== contentTypeHeaderValue) {
                    context.report(resource, (0, i18n_import_1.getMessage)('contentTypeValueShouldBe', context.language, userDefinedMediaType), { codeLanguage, codeSnippet, severity });
                }
                return;
            }
            let contentType;
            try {
                if (contentTypeHeaderValue === '') {
                    throw new TypeError((0, i18n_import_1.getMessage)('invalidMediaType', context.language));
                }
                contentType = (0, content_type_1.parse)(contentTypeHeaderValue);
            }
            catch (e) {
                context.report(resource, (0, i18n_import_1.getMessage)('contentTypeValueInvalid', context.language, e.message), { codeLanguage, codeSnippet, severity });
                return;
            }
            const originalCharset = (0, utils_string_1.normalizeString)(contentType.parameters ? contentType.parameters.charset : '');
            const originalMediaType = contentType.type;
            const mediaType = response.mediaType;
            const charset = (0, content_type_2.isTextMediaType)(mediaType) ? 'utf-8' : response.charset;
            const allowApplicationJavaScript = mediaType === 'text/javascript' && originalMediaType === 'application/javascript';
            const allowImageVndMicrosoftIcon = mediaType === 'image/x-icon' && originalMediaType === 'image/vnd.microsoft.icon';
            if (mediaType && mediaType !== originalMediaType && !allowApplicationJavaScript && !allowImageVndMicrosoftIcon) {
                context.report(resource, (0, i18n_import_1.getMessage)('contentTypeValueShoudBeNot', context.language, [mediaType, originalMediaType]), { codeLanguage, codeSnippet, severity });
            }
            if (charset) {
                if (!originalCharset || (charset !== originalCharset)) {
                    const message = originalCharset ?
                        (0, i18n_import_1.getMessage)('contentTypeCharsetShouldBeNot', context.language, [charset, originalCharset]) :
                        (0, i18n_import_1.getMessage)('contentTypeCharsetShouldBe', context.language, charset);
                    context.report(resource, message, { codeLanguage, codeSnippet, severity: utils_types_1.Severity.warning });
                }
            }
            else if (originalCharset &&
                ![
                    'text/html',
                    'application/xhtml+xml'
                ].includes(originalMediaType)) {
                context.report(resource, (0, i18n_import_1.getMessage)('contentTypeValueShouldNotContaint', context.language, originalCharset), { codeLanguage, codeSnippet, severity: utils_types_1.Severity.warning });
            }
        };
        loadHintConfigs();
        context.on('fetch::end::*', validate);
    }
}
exports.default = ContentTypeHint;
ContentTypeHint.meta = meta_1.default;
