"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("./i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.performance,
        description: (0, i18n_import_1.getMessage)('description', 'en'),
        name: (0, i18n_import_1.getMessage)('name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('name', language);
    },
    id: 'no-http-redirects',
    schema: [{
            additionalProperties: false,
            properties: {
                'max-html-redirects': {
                    minimum: 0,
                    type: 'integer'
                },
                'max-resource-redirects': {
                    minimum: 0,
                    type: 'integer'
                }
            },
            type: 'object'
        }],
    scope: hint_scope_1.HintScope.site
};
exports.default = meta;
