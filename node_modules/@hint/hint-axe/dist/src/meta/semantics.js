"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('semantics_description', 'en'),
        name: (0, i18n_import_1.getMessage)('semantics_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('semantics_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('semantics_name', language);
    },
    id: 'axe/semantics',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'heading-order': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'identical-links-same-purpose': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'label-content-name-mismatch': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-banner-is-top-level': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-complementary-is-top-level': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-contentinfo-is-top-level': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-main-is-top-level': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-no-duplicate-banner': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-no-duplicate-contentinfo': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-no-duplicate-main': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-one-main': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'landmark-unique': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'p-as-heading': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'page-has-heading-one': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['heading-order', 'identical-links-same-purpose', 'label-content-name-mismatch', 'landmark-banner-is-top-level', 'landmark-complementary-is-top-level', 'landmark-contentinfo-is-top-level', 'landmark-main-is-top-level', 'landmark-no-duplicate-banner', 'landmark-no-duplicate-contentinfo', 'landmark-no-duplicate-main', 'landmark-one-main', 'landmark-unique', 'p-as-heading', 'page-has-heading-one'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
