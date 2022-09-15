"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@hint/utils");
const utils_network_1 = require("@hint/utils-network");
const utils_debug_1 = require("@hint/utils-debug");
const utils_types_1 = require("@hint/utils-types");
const meta_1 = require("./meta");
const i18n_import_1 = require("./i18n.import");
const debug = (0, utils_debug_1.debug)(__filename);
class default_1 {
    constructor(context) {
        const validateFetchEnd = async (fetchEnd) => {
            debug(`Validating hint no-bom`);
            const { resource, element } = fetchEnd;
            if (!(0, utils_network_1.isRegularProtocol)(resource) || !(0, utils_1.isTextMediaType)(fetchEnd.response.mediaType)) {
                return;
            }
            const safeFetch = (0, utils_1.asyncTry)(context.fetchContent.bind(context));
            const request = await safeFetch(resource);
            if (!request) {
                context.report(resource, (0, i18n_import_1.getMessage)('couldNotBeFetched', context.language), {
                    element,
                    severity: utils_types_1.Severity.error
                });
                debug(`Error requesting the resource: ${resource}`);
                return;
            }
            const content = request.response.body.rawContent;
            if (content[0] === 0xEF &&
                content[1] === 0xBB &&
                content[2] === 0xBF) {
                context.report(resource, (0, i18n_import_1.getMessage)('textBased', context.language), {
                    element,
                    severity: utils_types_1.Severity.warning
                });
            }
        };
        context.on('fetch::end::*', validateFetchEnd);
    }
}
exports.default = default_1;
default_1.meta = meta_1.default;
