"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalFile = void 0;
const has_protocol_1 = require("./has-protocol");
const isLocalFile = (resource) => {
    return (0, has_protocol_1.hasProtocol)(resource, 'file:');
};
exports.isLocalFile = isLocalFile;
