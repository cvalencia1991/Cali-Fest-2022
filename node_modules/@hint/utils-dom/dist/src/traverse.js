"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = void 0;
const traverseAndNotify = async (element, document, engine, resource) => {
    await engine.emitAsync(`element::${element.nodeName.toLowerCase()}`, {
        element,
        resource
    });
    const traverseEvent = {
        element,
        resource
    };
    await engine.emitAsync(`traverse::down`, traverseEvent);
    for (const child of element.children) {
        await traverseAndNotify(child, document, engine, resource);
    }
    await engine.emitAsync(`traverse::up`, traverseEvent);
};
const traverse = async (document, engine, resource) => {
    const documentElement = document.documentElement;
    await engine.emitAsync('traverse::start', { resource });
    await traverseAndNotify(documentElement, document, engine, resource);
    await engine.emitAsync('traverse::end', { document, resource });
};
exports.traverse = traverse;
