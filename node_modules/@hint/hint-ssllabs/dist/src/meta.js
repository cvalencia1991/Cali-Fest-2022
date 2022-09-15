"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rx_localhost_1 = require("@hint/utils-network/dist/src/rx-localhost");
const rx_local_file_1 = require("@hint/utils-network/dist/src/rx-local-file");
const utils_types_1 = require("@hint/utils-types");
const hint_1 = require("hint");
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
    id: 'ssllabs',
    ignoredUrls: [rx_localhost_1.rxLocalhost, rx_local_file_1.rxLocalFile],
    schema: [{
            additionalProperties: false,
            properties: {
                grade: {
                    pattern: '^(A\\+|A\\-|[A-F]|T|M)$',
                    type: 'string'
                },
                ssllabs: {
                    properties: {
                        all: {
                            pattern: '^(on|done)$',
                            type: 'string'
                        },
                        fromCache: { type: 'boolean' },
                        ignoreMismatch: { type: 'boolean' },
                        maxAge: {
                            minimum: 0,
                            type: 'integer'
                        },
                        publish: { type: 'boolean' },
                        startNew: { type: 'boolean' }
                    },
                    type: 'object'
                }
            },
            type: 'object'
        }],
    scope: hint_1.HintScope.site
};
exports.default = meta;
