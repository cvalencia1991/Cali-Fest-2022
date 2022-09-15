"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_types_1 = require("@hint/utils-types");
const hint_scope_1 = require("hint/dist/src/lib/enums/hint-scope");
const i18n_import_1 = require("../i18n.import");
const meta = {
    docs: {
        category: utils_types_1.Category.accessibility,
        description: (0, i18n_import_1.getMessage)('textAlternatives_description', 'en'),
        name: (0, i18n_import_1.getMessage)('textAlternatives_name', 'en')
    },
    getDescription(language) {
        return (0, i18n_import_1.getMessage)('textAlternatives_description', language);
    },
    getName(language) {
        return (0, i18n_import_1.getMessage)('textAlternatives_name', language);
    },
    id: 'axe/text-alternatives',
    schema: [
        {
            additionalProperties: false,
            properties: {
                'area-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'document-title': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'frame-title': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'frame-title-unique': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'image-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'image-redundant-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'input-image-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'object-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'role-img-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'server-side-image-map': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'svg-img-alt': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' },
                'video-caption': { enum: ['off', 'information', 'hint', 'warning', 'error', 'default'], type: 'string' }
            }
        },
        {
            items: {
                enum: ['area-alt', 'document-title', 'frame-title', 'frame-title-unique', 'image-alt', 'image-redundant-alt', 'input-image-alt', 'object-alt', 'role-img-alt', 'server-side-image-map', 'svg-img-alt', 'video-caption'],
                type: 'string'
            },
            typeof: 'array',
            uniqueItems: true
        }
    ],
    scope: hint_scope_1.HintScope.any
};
exports.default = meta;
