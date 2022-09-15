"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('tables_description', 'en'),
        name: (0, i18n_import_1.getMessage)('tables_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('tables_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('tables_name', language);
    },
    id: 'axe/tables',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'scope-attr-valid': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'table-duplicate-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'table-fake-caption': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'td-has-header': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'td-headers-attr': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'th-has-data-cells': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['scope-attr-valid', 'table-duplicate-name', 'table-fake-caption', 'td-has-header', 'td-headers-attr', 'th-has-data-cells'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
