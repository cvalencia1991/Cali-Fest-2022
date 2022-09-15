"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_localhost_1 = require("@hint/utils-network/dist/src/rx-localhost");
const rx_local_file_1 = require("@hint/utils-network/dist/src/rx-local-file");
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("./i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.security,
        description: (0, i18n_import_1.getMessage)('description', 'en'),
        name: (0, i18n_import_1.getMessage)('name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('name', language);
    },
    id: 'no-disallowed-headers',
    ignoredUrls: [rx_localhost_1.rxLocalhost, rx_local_file_1.rxLocalFile],
    schema: [{
            additionalProperties: false,
            definitions: {
                'string-array': {
                    items: { type: 'string' },
                    minItems: 1,
                    type: 'array',
                    uniqueItems: true
                }
            },
            properties: {
                ignore: { $ref: '#/definitions/string-array' },
                include: { $ref: '#/definitions/string-array' }
            },
            type: ['object', 'null']
        }],
    scope: hint_scope_1.HintScope.site
};
exports.default = meta;
