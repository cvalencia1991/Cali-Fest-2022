"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHTTP = void 0;
const has_protocol_1 = require("./has-protocol");
const isHTTP = (resource) => {
    return (0, has_protocol_1.hasProtocol)(resource, 'http:');
};
exports.isHTTP = isHTTP;
