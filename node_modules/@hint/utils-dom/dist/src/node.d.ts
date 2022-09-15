import { HTMLDocument } from './htmldocument';
import { HTMLElement } from './htmlelement';
import { NodeData } from './types';
export declare class Node {
    private _node;
    static ELEMENT_NODE: number;
    static ATTRIBUTE_NODE: number;
    static TEXT_NODE: number;
    static CDATA_SECTION_NODE: number;
    static PROCESSING_INSTRUCTION_NODE: number;
    static COMMENT_NODE: number;
    static DOCUMENT_NODE: number;
    static DOCUMENT_TYPE_NODE: number;
    static DOCUMENT_FRAGMENT_NODE: number;
    ownerDocument: HTMLDocument;
    constructor(data: NodeData, ownerDocument: HTMLDocument);
    private get _owner();
    get childNodes(): Node[];
    get nodeName(): string;
    get nodeType(): number;
    get nodeValue(): string | null;
    get parentElement(): HTMLElement | null;
    get parentNode(): Node | null;
    get textContent(): string;
    contains(node: Node): boolean;
}
//# sourceMappingURL=node.d.ts.map