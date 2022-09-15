"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTTPS = void 0;
const has_protocol_1 = require("./has-protocol");
const isHTTPS = (resource) => {
    return (0, has_protocol_1.hasProtocol)(resource, 'https:');
};
exports.isHTTPS = isHTTPS;
