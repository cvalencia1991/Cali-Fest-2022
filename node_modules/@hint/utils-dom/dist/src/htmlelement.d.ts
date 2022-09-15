import { ProblemLocation } from '@hint/utils-types';
import { ElementData, INamedNodeMap } from './types';
import { Node } from './node';
import { CSSStyleDeclaration } from './cssstyledeclaration';
import { HTMLDocument } from './htmldocument';
export declare class HTMLElement extends Node {
    private _element;
    private _computedStyles;
    private _domRect;
    constructor(element: ElementData, ownerDocument: HTMLDocument);
    get attributes(): INamedNodeMap;
    get children(): HTMLElement[];
    get id(): string;
    get name(): string;
    get style(): {
        getPropertyValue(name: string): void;
    };
    get type(): string;
    getAttribute(name: string): string | null;
    getBoundingClientRect(): DOMRect;
    getComputedStyle(): CSSStyleDeclaration;
    hasAttribute(name: string): boolean;
    hasAttributes(): boolean;
    setAttribute(name: string, value: string): void;
    hasAttributeSpread(): boolean;
    isAttributeAnExpression(attribute: string): boolean;
    private _getOriginalLocation;
    getAttributeLocation(name: string): ProblemLocation;
    getLocation(): ProblemLocation;
    getContentLocation(offset: ProblemLocation): ProblemLocation | null;
    isSame(element: HTMLElement): boolean;
    get innerHTML(): string;
    querySelector(selector: string): HTMLElement | null;
    querySelectorAll(selector: string): HTMLElement[];
    matches(selector: string): boolean;
    get outerHTML(): string;
    resolveUrl(url: string): string;
    getChildIndent(): {
        indent: string;
        newlineType: string;
    };
    prependChildOuterHtml(child: string, removeExistingInstance?: boolean): string;
}
//# sourceMappingURL=htmlelement.d.ts.map