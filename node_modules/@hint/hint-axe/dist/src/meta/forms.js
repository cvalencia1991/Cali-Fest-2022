"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('forms_description', 'en'),
        name: (0, i18n_import_1.getMessage)('forms_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('forms_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('forms_name', language);
    },
    id: 'axe/forms',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'autocomplete-valid': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'form-field-multiple-labels': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                label: { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'label-title-only': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'select-name': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['autocomplete-valid', 'form-field-multiple-labels', 'label', 'label-title-only', 'select-name'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
