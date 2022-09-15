"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
class Node {
    constructor(data, ownerDocument) {
        this._node = data;
        this.ownerDocument = ownerDocument;
    }
    get _owner() {
        return this.ownerDocument || this;
    }
    get childNodes() {
        const result = [];
        if ('children' in this._node) {
            for (const child of this._node.children) {
                if (child.type === 'root') {
                    continue;
                }
                result.push(this._owner.getNodeFromData(child));
            }
        }
        return result;
    }
    get nodeName() {
        switch (this._node.type) {
            case 'comment':
                return '#comment';
            case 'directive':
                return this._node.nodeName || this._node['x-name'] || '';
            case 'root':
                return '#document';
            case 'script':
            case 'style':
            case 'tag': {
                const isHTML = this._node.namespace === 'http://www.w3.org/1999/xhtml';
                return isHTML ? this._node.name.toUpperCase() : this._node.name;
            }
            case 'text':
                return '#text';
            default:
                throw new Error(`Unrecognized node type ${this._node.type}`);
        }
    }
    get nodeType() {
        switch (this._node.type) {
            case 'comment':
                return Node.COMMENT_NODE;
            case 'directive':
                return Node.DOCUMENT_TYPE_NODE;
            case 'root':
                return Node.DOCUMENT_NODE;
            case 'script':
            case 'style':
            case 'tag':
                return Node.ELEMENT_NODE;
            case 'text':
                return Node.TEXT_NODE;
            default:
                throw new Error(`Unrecognized node type ${this._node.type}`);
        }
    }
    get nodeValue() {
        switch (this._node.type) {
            case 'comment':
            case 'text':
                return this._node.data;
            default:
                return null;
        }
    }
    get parentElement() {
        const parentNode = this.parentNode;
        const parent = parentNode === null || parentNode === void 0 ? void 0 : parentNode._node;
        if (!parent || (parent.type !== 'tag' && parent.type !== 'script' && parent.type !== 'style')) {
            return null;
        }
        return parentNode;
    }
    get parentNode() {
        if ('parent' in this._node && this._node.parent) {
            return this._owner.getNodeFromData(this._node.parent);
        }
        return null;
    }
    get textContent() {
        switch (this._node.type) {
            case 'comment':
            case 'directive':
            case 'root':
                return '';
            case 'script':
            case 'style':
            case 'tag':
                return this.childNodes.map((child) => {
                    return child.textContent;
                }).join('');
            case 'text':
                return this._node.data;
            default:
                throw new Error(`Unrecognized node type ${this._node.type}`);
        }
    }
    contains(node) {
        let target = node;
        while (target) {
            if (target === this) {
                return true;
            }
            target = target.parentNode;
        }
        return false;
    }
}
exports.Node = Node;
Node.ELEMENT_NODE = 1;
Node.ATTRIBUTE_NODE = 2;
Node.TEXT_NODE = 3;
Node.CDATA_SECTION_NODE = 4;
Node.PROCESSING_INSTRUCTION_NODE = 7;
Node.COMMENT_NODE = 8;
Node.DOCUMENT_NODE = 9;
Node.DOCUMENT_TYPE_NODE = 10;
Node.DOCUMENT_FRAGMENT_NODE = 11;
