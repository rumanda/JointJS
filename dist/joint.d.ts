/*! JointJS v1.1.1-alpha.1 (2017-10-19) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

/// <reference types="backbone" />

import * as Backbone from "backbone";

export as namespace joint;

export namespace g {

    export interface PlainPoint {
        x: number;
        y: number;
    }

    export interface PlainRect {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    type RectangleSides = 'left' | 'right' | 'top' | 'bottom';

    export function normalizeAngle(angle: number): number;

    export function snapToGrid(val: number, gridSize: number): number;

    export function toDeg(rad: number): number;

    export function toRad(deg: number, over360?: boolean): number;

    class Ellipse {

        x: number;
        y: number;
        a: number;
        b: number;

        constructor(center: PlainPoint, a: number, b: number);
        constructor(ellipse: Ellipse);

        bbox(): Rect;

        clone(): Ellipse;

        normalizedDistance(point: PlainPoint): number;

        inflate(dx?: number, dy?: number): this;

        containsPoint(p: PlainPoint): boolean;

        center(): Point;

        tangentTheta(p: PlainPoint): number;

        equals(ellipse: Ellipse): boolean;

        intersectionWithLineFromCenterToPoint(p: PlainPoint, angle?: number): Point;

        toString(): string;

        static fromRect(rect: PlainRect): Ellipse;
    }

    class Line {

        start: Point;
        end: Point;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string);
        constructor(line: Line);

        bearing(): CardinalDirection;

        clone(): Line;

        equals(line: Line): boolean;

        intersect(line: Line): Point | null;
        intersect(rect: Rect): Point[] | null;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointOffset(p: PlainPoint): number;

        vector(): Point;

        closestPoint(p: PlainPoint | string): Point;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        squaredLength(): number;

        toString(): string;
    }

    class Point implements PlainPoint {

        x: number;
        y: number;

        constructor(x: number, y: number);
        constructor(p: PlainPoint | string);

        adhereToRect(r: Rect): this;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: PlainPoint | string): number;

        clone(): Point;

        difference(dx: number, dy?: number): Point;
        difference(p: PlainPoint): Point;

        distance(p: PlainPoint | string): number;

        squaredDistance(p: PlainPoint | string): number;

        equals(p: Point): boolean;

        magnitude(): number;

        manhattanDistance(p: PlainPoint): number;

        move(ref: PlainPoint | string, distance: number): this;

        normalize(length: number): this;

        offset(dx: number, dy?: number): this;
        offset(p: PlainPoint): this;

        reflection(ref: PlainPoint | string): Point;

        rotate(origin: PlainPoint | string, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        snapToGrid(gx: number, gy?: number): this;

        theta(p: PlainPoint | string): number;

        angleBetween(p1: PlainPoint, p2: PlainPoint) : number;

        vectorAngle(p: PlainPoint) : number;

        toJSON(): PlainPoint;

        toPolar(origin: PlainPoint | string): this;

        toString(): string;

        update(x: number, y?: number): this;

        dot(p: PlainPoint): number;

        cross(p1: PlainPoint, p2: PlainPoint) : number;

        static fromPolar(distance: number, angle: number, origin?: PlainPoint | string): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;
    }

    class Rect implements PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(r: PlainRect);

        bbox(angle?: number): Rect;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: PlainPoint | string): boolean;

        containsRect(r: PlainRect): boolean;

        corner(): Point;

        equals(r: PlainRect): boolean;

        intersect(r: Rect): Rect | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint | string, angle?: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        moveAndExpand(r: PlainRect): this;

        offset(dx: number, dy?: number): this;
        offset(p: PlainPoint): this;

        inflate(dx?: number, dy?: number): this;

        normalize(): this;

        origin(): Point;

        pointNearestToPoint(point: PlainPoint | string): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        sideNearestToPoint(point: PlainPoint | string): RectangleSides;

        snapToGrid(gx: number, gy?: number): this;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        toJSON(): PlainRect;

        toString(): string;

        union(rect: PlainRect): Rect;

        static fromEllipse(e: Ellipse): Rect;
    }

    namespace bezier {

        interface IBezierCurve {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }

        export function curveThroughPoints(points: PlainPoint[] | Point[]): string[];

        export function getCurveControlPoints(points: PlainPoint[] | Point[]): [Point[], Point[]];

        export function getCurveDivider(
            p0: string | PlainPoint,
            p1: string | PlainPoint,
            p2: string | PlainPoint,
            p3: string | PlainPoint
        ): (t: number) => [IBezierCurve, IBezierCurve];

        export function getFirectControlPoints(rhs: number[]): number[];

        export function getInversionSolver(
            p0: PlainPoint,
            p1: PlainPoint,
            p2: PlainPoint,
            p3: PlainPoint
        ): (p: PlainPoint) => number;
    }

    namespace scale {

        export function linear(domain: [number, number], range: [number, number], value: number): number;
    }
}

export function V(
    svg: SVGElement | Vectorizer | string,
    attrs?: { [key: string]: any },
    children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
): Vectorizer;

export namespace Vectorizer {

    interface RotateOptions {
        absolute?: boolean;
    }

    interface AnnotateStringOptions {
        includeAnnotationIndices?: boolean;
        offset?: number;
    }

    interface TextOptions {
        eol?: string;
        x?: number;
        lineHeight?: number | string;
        textPath?: string | { [key: string]: any };
        annotations?: TextAnnotation[];
        includeAnnotationIndices?: boolean;
    }

    interface GetBBoxOptions {
        target?: SVGElement | Vectorizer;
        recursive?: boolean;
    }

    interface TransformOptions {
        absolute?: boolean;
    }

    interface ParseXMLOptions {
        async?: boolean;
    }

    interface TextAnnotation {
        start: number;
        end: number;
        attrs: { [key: string]: any };
    }

    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    interface Sample {
        x: number;
        y: number;
        distance: number;
    }

    interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }

    interface RoundedRect extends g.PlainRect {
        'rx'?: number;
        'ry'?: number;
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }

    // Backwards compatibility
    interface Rect extends RoundedRect {}

    interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }

    interface Translation {
        tx: number;
        ty: number;
    }

    interface Scale {
        sx: number;
        sy: number;
    }

    interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }

    interface QualifiedAttribute {
        ns: string | null;
        local: string;
    }
}

export class Vectorizer {

    node: SVGElement;

    constructor(
        svg: string | SVGElement,
        attrs?: { [key: string]: any },
        children?: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]
    );

    getTransformToElement(elem: SVGGElement | Vectorizer): SVGMatrix;

    transform(): SVGMatrix;
    transform(matrix: SVGMatrix | Vectorizer.Matrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;
    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    rotate(): Vectorizer.Rotation;
    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    scale(): Vectorizer.Scale;
    scale(sx: number, sy: number): this;

    bbox(withoutTransformations?: boolean, target?: SVGElement | Vectorizer): g.Rect;

    getBBox(opt?: Vectorizer.GetBBoxOptions) : g.Rect;

    text(content: string, opt?: Vectorizer.TextOptions): this;

    removeAttr(name: string): this;

    attr(): { [key: string]: string };
    attr(name: string): string | null;
    attr(name: string, value: any): this;
    attr(attrs: { [key: string]: any }): this;

    remove(): this;

    empty(): this;

    append(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    prepend(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    before(els: Vectorizer | Vectorizer[] | SVGElement | SVGElement[]): this;

    appendTo(el: SVGElement | Vectorizer) : this;

    // returns either this or Vectorizer, no point in specifying this.
    svg(): Vectorizer;

    defs(): Vectorizer | undefined;

    clone(): Vectorizer;

    findOne(selector: string): Vectorizer | undefined;

    find(selector: string): Vectorizer[];

    children(): Vectorizer[];

    index(): number;

    findParentByClass(className: string, terminator?: SVGElement): Vectorizer | null;

    contains(el: SVGElement | Vectorizer): boolean;

    toLocalPoint(x: number, y: number): SVGPoint;

    translateCenterToPoint(p: g.PlainPoint): this;

    translateAndAutoOrient(position: g.PlainPoint, reference: g.PlainPoint, target?: SVGElement | Vectorizer): this;

    animateAlongPath(attrs: { [key: string]: any }, path: SVGElement | Vectorizer): void;

    hasClass(className: string): boolean;

    addClass(className: string): Vectorizer;

    removeClass(className: string): this;

    toggleClass(className: string, switchArg?: boolean): this;

    sample(interval?: number): Vectorizer.Sample[];

    convertToPath(): Vectorizer;

    convertToPathData(): string;

    findIntersection(ref: g.PlainPoint, target: SVGElement | Vectorizer): g.PlainPoint | undefined;

    private setAttributes(attrs: { [key: string]: any }): this;

    private setAttribute(name: string, value: string): this;

    static createSVGDocument(content: string): Document;

    static uniqueId(): string;

    static ensureId(node: SVGElement | Vectorizer): string;

    static sanitizeText(text: string): string;

    static isUndefined(value: any): boolean;

    static isString(value: any): boolean;

    static isObject(value: any): boolean;

    static isArray(value: any): boolean;

    static parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    static qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    static transformStringToMatrix(transform: string): SVGMatrix;

    static matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    static parseTransformString(transform: string): Vectorizer.Transform;

    static deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | g.PlainPoint): g.PlainPoint;

    static decomposeMatrix(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.DecomposedTransformation;

    static matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    static matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    static matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    static isV(value: any): boolean;

    static isVElement(value: any): boolean;

    static createSVGMatrix(matrix: SVGMatrix | Vectorizer.Matrix): SVGMatrix;

    static createSVGTransform(matrix?: SVGMatrix | Vectorizer.Matrix): SVGTransform;

    static createSVGPoint(x: number, y: number): SVGPoint;

    static transformRect(r: g.PlainRect, matrix: SVGMatrix): g.Rect;

    static transformPoint(p: g.PlainPoint, matrix: SVGMatrix): g.Point;

    static styleToObject(styleString: string): { [key: string]: string };

    static createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    static mergeAttrs(a: any, b: any): any;

    static annotateString(t: string, annotations: Vectorizer.TextAnnotation[], opt?: Vectorizer.AnnotateStringOptions): Array< string | { [key: string]: any }> ;

    static findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], index: number): Vectorizer.TextAnnotation[];

    static findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation[];

    static shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    static convertLineToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolygonToPathData(line: string | SVGElement | Vectorizer): string;

    static convertPolylineToPathData(line: string | SVGElement | Vectorizer): string;

    static svgPointsToPath(points: g.PlainPoint[] | SVGPoint[]): string;

    static getPointsFromSvgNode(node: SVGElement | Vectorizer): SVGPoint[];

    static convertCircleToPathData(circle: string | SVGElement | Vectorizer): string;

    static convertEllipseToPathData(ellipse: string | SVGElement | Vectorizer): string;

    static convertRectToPathData(rect: string | SVGElement | Vectorizer): string;

    static rectToPath(r: Vectorizer.RoundedRect): string;

    static toNode(el: SVGElement | Vectorizer | SVGElement[]): SVGElement;
}

export namespace dia {
    interface Size {
        width: number;
        height: number;
    }

    interface Point {
        x: number;
        y: number;
    }

    interface BBox extends Point, Size {
    }

    interface TranslateOptions {
        restrictedArea?: BBox;
        transition?: TransitionOptions;
    }

    interface TransitionOptions {
        delay?: number;
        duration?: number;
        timingFunction?: (t: number) => number;
        valueFunction?: (a: any, b: any) => (t: number) => any;
    }

    interface DfsBfsOptions {
        inbound?: boolean;
        outbound?: boolean;
        deep?: boolean;
    }

    interface ExploreOptions {
        breadthFirst?: boolean;
        deep?: boolean;
    }

    interface EdgeMap {
        [key: string]: boolean;
    }

    class Graph extends Backbone.Model {
        constructor(attributes?: any, options?: { cellNamespace: any, cellModel: typeof Cell });

        addCell(cell: Cell | Cell[], opt?: object): this;

        addCells(cells: Cell[], opt: object): this;

        resetCells(cells: Cell[], options?: object): this;

        getCell(id: string): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell;

        getLastCell(): Cell;

        getConnectedLinks(element: Cell, options?: { inbound?: boolean, outbound?: boolean, deep?: boolean }): Link[];

        disconnectLinks(cell: Cell, options?: object): void;

        removeLinks(cell: Cell, options?: object): void;

        translate(tx: number, ty?: number, options?: TranslateOptions): void;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], options?: { deep?: boolean }): Cell[];

        cloneSubgraph(cells: Cell[], options?: { deep?: boolean }): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions, visited?: any, distance?: number): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: DfsBfsOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, options?: { breadthFirst?: boolean }): void;

        getSuccessors(element: Element, options?: ExploreOptions): Element[];

        getPredecessors(element: Element, options?: ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, options?: DfsBfsOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, options?: { inbound?: boolean, outbound?: boolean; }): boolean;

        getCommonAncestor(...cells: Cell[]): Element;

        toJSON(): object;

        fromJSON(json: { cells: Cell[] }, options?: object): this;

        clear(options?: object): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsUnderElement(element: Element, options?: {
            searchBy?: 'bottomLeft' | 'bottomMiddle' | 'center' |
                'corner' | 'leftMiddle' | 'origin' | 'rightMiddle' |
                'topMiddle' | 'topRight'
        }): Element[];

        getBBox(elements: Element[], options?: { deep?: boolean }): g.Rect;

        toGraphLib(): object; // graphlib graph object
        findModelsInArea(rect: g.Rect | BBox, options?: { strict?: boolean }): BBox | boolean;

        getCellsBBox(cells: Cell[], options?: { deep?: boolean }): g.Rect;

        getInboundEdges(node: string): EdgeMap;

        getOutboundEdges(node: string): EdgeMap;

        hasActiveBatch(name?: string): number | boolean;

        maxZIndex(): number;

        removeCells(cells: Cell[], options?: object): this;

        resize(width: number, height: number, options?: object): this;

        resizeCells(width: number, height: number, cells: Cell[], options?: object): this;

        set(key: object | string, value: any, options?: object): this;

        startBatch(name: string, data?: {[key: string]: any}): any;

        stopBatch(name: string, data?: {[key: string]: any}): any;
    }

    class Cell extends Backbone.Model {
        constructor(attributes?: object, options?: object);

        id: string;

        graph: dia.Graph;

        toJSON(): object;

        remove(options?: { disconnectLinks?: boolean }): this;

        toFront(options?: { deep?: boolean }): this;

        toBack(options?: { deep?: boolean }): this;

        getAncestors(): Cell[];

        isEmbeddedIn(element: Element, options?: { deep: boolean }): boolean;

        prop(key: string | string[]): any;
        prop(object: object): this;
        prop(key: string | string[], value: any, options?: object): this;

        removeProp(path: string | string[], options?: object): this;

        attr(key: string): any;
        attr(object: SVGAttributes): this;
        attr(key: string, value: any): this;

        clone(): Cell;
        clone(opt: { deep?: boolean }): Cell | Cell[];

        removeAttr(path: string | string[], options?: object): this;

        transition(path: string, value?: any, options?: TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        addTo(graph: Graph, options?: object): this;

        isLink(): boolean;

        embed(cell: Cell, options?: object): this;

        findView(paper: Paper): CellView;

        getEmbeddedCells(options?: { deep?: boolean, breadthFirst?: boolean }): Cell[];

        isElement(): boolean;

        isEmbedded(): boolean;

        startBatch(name: string, options?: object): this;

        stopBatch(name: string, options?: object): this;

        unembed(cell: Cell, options?: object): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): CellConstructor<Cell>;

        /**
         * @deprecated
         */
        protected processPorts(): void;
    }

    interface CellConstructor<T extends Backbone.Model> {
        new (options?: { id: string }): T
    }

    type Padding = number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number
    };

    type Direction = 'left'
                    | 'right'
                    | 'top'
                    | 'bottom'
                    | 'top-right'
                    | 'top-left'
                    | 'bottom-left'
                    | 'bottom-right';

    interface Port {
        id?: string;
        markup?: string;
        group?: string;
        attrs?: object;
        args?: object;
        size?: Size;
        label: {
            size?: Size;
            markup?: string;
            position?: any;
            args?: any;
        }
        z?: number | 'auto';
    }

    interface PortPosition extends Point {
        angle: number;
    }

    class Element extends Cell {
        constructor(attributes?: object, options?: object);

        translate(tx: number, ty?: number, options?: TranslateOptions): this;

        position(options?: { parentRelative: boolean }): g.Point;
        position(x: number, y: number, options?: { parentRelative?: boolean }): this;

        size(): Size;
        size(width: number, height?: number, options?: { direction?: Direction }): this;

        resize(width: number, height: number, options?: { direction?: Direction }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { parentRelative?: boolean }): this;

        embed(cell: Cell): this;

        unembed(cell: Cell): this;

        getEmbeddedCells(options?: ExploreOptions): Cell[];

        fitEmbeds(options?: { deep?: boolean, padding?: Padding }): this;

        getBBox(options?: { deep?: boolean }): g.Rect;

        isElement(): boolean;

        scale(scaleX: number, scaleY: number, origin?: Point, options?: { direction?: Direction, parentRelative?: boolean }): this;

        addPort(port: Port, opt?: object): this;

        addPorts(ports: Port[], opt?: object): this;

        removePort(port: string | Port, opt?: object): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Port[];

        getPort(id: string): Port;

        getPortsPositions(groupName: string): { [id: string]: PortPosition };

        getPortIndex(port: string | Port): number;

        portProp(portId: string, path: any, value?: any, opt?: any): dia.Element;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): CellConstructor<Element>;
    }

    interface CSSSelector {
        [key: string]: string | number | Object; // Object added to support special attributes like filter http://jointjs.com/api#SpecialAttributes:filter
    }

    interface SVGAttributes {
        [selector: string]: CSSSelector;
    }

    interface CellAttributes {
        [key: string]: any;
    }

    interface TextAttrs extends SVGAttributes {
        text?: {
            [key: string]: string | number;
            text?: string;
        };
    }

    interface LabelPosition {
      distance: number;
      offset: number | { x: number; y: number; }
    }

    interface Label {
        position: LabelPosition | number;
        attrs?: TextAttrs;
    }

    interface LinkAttributes extends CellAttributes {
        source?: Point | { id: string, selector?: string, port?: string };
        target?: Point | { id: string, selector?: string, port?: string };
        labels?: Label[];
        vertices?: Point[];
        smooth?: boolean;
        attrs?: TextAttrs;
        z?: number;
    }

    class Link extends Cell {
        markup: string;
        labelMarkup: string;
        toolMarkup: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;

        constructor(attributes?: LinkAttributes, options?: {[key: string]: any});

        applyToPoints(fn: (p: Point) => Point, opt?: object): this;

        disconnect(): this;

        label(index?: number): any;
        label(index: number, value: Label, opt?: object): this;

        reparent(options?: object): Element;

        getSourceElement(): undefined | Element | Graph;

        getTargetElement(): undefined | Element | Graph;

        hasLoop(options?: { deep?: boolean }): boolean;

        applyToPoints(fn: Function, options?: any): this;

        getRelationshipAncestor(): undefined | Element;

        isLink(): boolean;

        isRelationshipEmbeddedIn(element: Element): boolean;

        scale(sx: number, sy: number, origin: Point | g.Point | string, opt?: object): this;

        translate(tx: number, ty: number, options?: object): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): CellConstructor<Link>;
    }

    interface ManhattanRouterArgs {
        excludeTypes?: string[];
        excludeEnds?: 'source' | 'target';
        startDirections?: ['left' | 'right' | 'top' | 'bottom'];
        endDirections?: ['left' | 'right' | 'top' | 'bottom'];
    }

    interface GridOptions {
        color?: string;
        thickness?: number;
        name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
        args?: object[] | object;
    }

    interface PaperOptions extends Backbone.ViewOptions<Graph> {
        el?: string | JQuery | HTMLElement;
        width?: number | string;
        height?: number | string;
        origin?: Point;
        gridSize?: number;
        drawGrid?: boolean | GridOptions;
        perpendicularLinks?: boolean;
        elementView?: (element: Element) => typeof ElementView | typeof ElementView;
        linkView?: (link: Link) => typeof LinkView | typeof LinkView;
        defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
        defaultRouter?: ((vertices: Point[], args: {[key: string]: any}, linkView: LinkView) => Point[])
            | { name: string, args?: ManhattanRouterArgs };
        defaultConnector?:
            ((sourcePoint: Point, targetPoint: Point, vertices: Point[], args: {[key: string]: any}, linkView: LinkView) => string)
            | { name: string, args?: { radius?: number } };
        interactive?: ((cellView: CellView, event: string) => boolean)
            | boolean
            | { vertexAdd?: boolean, vertexMove?: boolean, vertexRemove?: boolean, arrowheadMove?: boolean };
        validateMagnet?: (cellView: CellView, magnet: SVGElement) => boolean;
        validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end:
                                  'source'
                                  | 'target', linkView: LinkView) => boolean;
        linkConnectionPoint?: (linkView: LinkView, view: ElementView, magnet: SVGElement, reference: Point) => Point;
        snapLinks?: boolean | { radius: number };
        linkPinning?: boolean;
        markAvailable?: boolean;
        async?: boolean | { batchZise: number };
        embeddingMode?: boolean;
        findParentBy?: 'bbox' | 'center' | 'origin' | 'corner' | 'topRight' | 'bottomLeft';
        validateEmbedding?: (childView: ElementView, parentView: ElementView) => boolean;
        restrictTranslate?: ((elementView: ElementView) => BBox) | boolean;
        guard?: (evt: Event, view: CellView) => boolean;
        multiLinks?: boolean;
        cellViewNamespace?: object;
        highlighterNamespace?: object;
        /** useful undocumented option */
        clickThreshold?: number;
        highlighting?: any;
        preventContextMenu?: boolean;
    }

    interface ScaleContentOptions {
        padding?: number;
        preserveAspectRatio?: boolean;
        minScale?: number;
        minScaleX?: number;
        minScaleY?: number;
        maxScale?: number;
        maxScaleX?: number;
        maxScaleY?: number;
        scaleGrid?: number;
        fittingBBox?: BBox;
    }

    interface FitToContentOptions {
        gridWidth?: number;
        gridHeight?: number;
        padding?: Padding;
        allowNewOrigin?: 'negative' | 'positive' | 'any';
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
    }

    interface Highlighter {
        name: string;
        options?: object;
    }

    interface GradientOptions {
        type: 'linearGradient' | 'radialGradient';
        stops: Array<{
            offset: string;
            color: string;
            opacity?: number;
        }>;
    }

    abstract class CellViewGeneric<T extends Backbone.Model> extends Backbone.View<T> {
        constructor(options?: { id: string });

        unhighlight(el?: any, options?: any): this;

        can(feature: string): boolean;

        findMagnet(el: any): HTMLElement;

        getSelector(el: HTMLElement, prevSelector: string): string;

        getStrokeBBox(el: any): BBox; // string|HTMLElement|Vectorizer

        remove(): this;

        setInteractivity(value: any): void;

        setTheme(theme: string, options?: any): this;

        protected mouseover(evt: Event): void;

        protected mousewheel(evt: Event, x: number, y: number, delta: number): void

        protected notify(eventName: string): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected pointerclick(evt: Event, x: number, y: number): void;

        protected pointerdblclick(evt: Event, x: number, y: number): void;

        protected pointerdown(evt: Event, x: number, y: number): void;

        protected pointermove(evt: Event, x: number, y: number): void;

        protected pointerup(evt: Event, x: number, y: number): void;
    }

    class CellView extends CellViewGeneric<Cell> {
    }

    interface ElementViewAttributes {
        style?: string;
        text?: string;
        html?: string;
        "ref-x"?: string | number;
        "ref-y"?: string | number;
        "ref-dx"?: number;
        "ref-dy"?: number;
        "ref-width"?: string | number;
        "ref-height"?: string | number;
        ref?: string;
        "x-alignment"?: 'middle' | 'right' | number;
        "y-alignment"?: 'middle' | 'bottom' | number;
        port?: string;
    }

    class ElementView extends CellViewGeneric<Element> {

        getBBox(options?: { useModelGeometry?: boolean }): g.Rect;

        update(cell: Cell, renderingOnlyAttrs?: object): void;

        protected mouseenter(evt: Event): void;

        protected mouseleave(evt: Event): void;

        protected pointerdown(evt: Event, x: number, y: number): void;

        protected pointermove(evt: Event, x: number, y: number): void;

        protected pointerup(evt: Event, x: number, y: number): void;

        protected renderMarkup(): void;
    }

    class LinkView extends CellViewGeneric<Link> {
        options: {
            shortLinkLength?: number,
            doubleLinkTools?: boolean,
            longLinkLength?: number,
            linkToolsOffset?: number,
            doubleLinkToolsOffset?: number,
            sampleInterval: number
        };

        getConnectionLength(): number;

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;

        addVertex(vertex: Point): number;

        getPointAtLength(length: number): g.Point; // Marked as public api in source but not in the documents

        update(model: Cell, attributes: object, options?: object): this;

        protected mouseenter(evt: Event): void;

        protected mouseleave(evt: Event): void;

        protected onEndModelChange(endType: 'source' | 'target', endModel?: Element,
                                   opt?: { cacheOnly?: boolean, handleBy?: string, translateBy?: boolean, tx?: number, ty?: number }): void;

        protected onLabelsChange(): void;

        protected onSourceChange(cell: Cell, sourceEnd: { id: string }, options: object): void;

        protected onTargetChange(cell: Cell, targetEnd: { id: string }, options: object): void;

        protected onToolsChange(): void;

        // changed is not used in function body.
        protected onVerticesChange(cell: Cell, changed: any, options: object): void;

        protected pointerdown(evt: Event, x: number, y: number): void;

        protected pointermove(evt: Event, x: number, y: number): void;

        protected pointerup(evt: Event, x: number, y: number): void;
    }

    class Paper extends mvc.View<Graph> {
        constructor(options: PaperOptions);

        options: dia.PaperOptions;
        svg: SVGElement;
        viewport: SVGGElement;
        defs: SVGDefsElement;

        clientMatrix(): SVGMatrix;

        clientToLocalPoint(x: number | g.Point, y?: number): g.Point;

        clientToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        clientOffset(): g.Point;

        cloneOptions(): dia.PaperOptions;

        cancelRenderViews(): void;

        createViewForModel(cell: dia.Cell): dia.CellView;

        defineFilter(filter: object): string;

        defineGradient(gradient: object): string;

        defineMarker(marker: object): string;

        drawBackground(opt?: { color?: string, img?: string }): Paper;

        drawBackgroundImage(img: HTMLImageElement, opt: object): void;

        drawGrid(options?: {
            width?: number, height?: number, scaleFactor?: number,
            update: any, ox?: number, oy?: number
        }): Paper;

        findView<T extends dia.ElementView | dia.LinkView>(element: string | JQuery | SVGElement): T;

        findViewByModel<T extends dia.ElementView | dia.LinkView>(model: Element | string | dia.Link): T;

        findViewsFromPoint(point: string | dia.Point | g.Point): dia.ElementView[];

        findViewsInArea(rect: g.Rect | dia.BBox, options?: { strict?: boolean }): dia.CellView[];

        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, options?: any): void;

        fitToContent(options?: dia.FitToContentOptions): void;

        getArea(): g.Rect;

        getContentBBox(): g.Rect;

        getDefaultLink(cellView: dia.CellView, magnet: HTMLElement): dia.Link;

        getModelById(id: string): dia.Cell;

        getRestrictedArea(): g.Rect | undefined;

        guard(evt: Event, view: dia.CellView): boolean;

        isDefined(defId: string): boolean;

        localToClientPoint(x: number | g.Point, y?: number): g.Point;

        localToClientRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        localToPagePoint(x: number | g.Point, y?: number): g.Point;

        localToPageRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        localToPaperPoint(x: number | g.Point, y?: number): g.Point;

        localToPaperRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        matrix(): SVGMatrix;

        matrix(ctm: SVGMatrix | Vectorizer.Matrix): Paper;

        pageOffset(): g.Point;

        pageToLocalPoint(x: number | g.Point, y?: number): g.Point;

        pageToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        paperToLocalPoint(x: number | g.Point, y?: number): g.Point;

        paperToLocalRect(x: number | g.Rect, y?: number, width?: number, height?: number): g.Rect;

        remove(): Paper;

        render(): Paper;

        scale(): Vectorizer.Scale;

        scale(sx: number, sy?: number, ox?: number, oy?: number): Paper;

        scaleContentToFit(options?: dia.ScaleContentOptions): void;

        setDimensions(width: number, height: number): void;

        setGridSize(gridSize: number): Paper;

        setInteractivity(value: any): void;

        setOrigin(x: number, y: number): Paper;

        snapToGrid(x: g.Point | number, y?: number): g.Point;

        sortViews(): void;

        translate(): Vectorizer.Translation;

        translate(tx: number, ty?: number): Paper;

        update(): void;

        // protected
        protected afterRenderViews(): void;

        protected asyncRenderViews(cells: dia.Cell[], options?: object): void;

        protected beforeRenderViews(cells: dia.Cell[]): dia.Cell[];

        protected cellMouseEnter(evt: Event): void;

        protected cellMouseleave(evt: Event): void;

        protected cellMouseout(evt: Event): void;

        protected cellMouseover(evt: Event): void;

        protected contextmenu(evt: Event): void;

        protected init(): void;

        protected mouseclick(evt: Event): void;

        protected mousedblclick(evt: Event): void;

        protected mousewheel(evt: Event): void;

        protected onCellAdded(cell: dia.Cell, graph: dia.Graph, options: { async?: boolean, position?: number }): void;

        protected onCellHighlight(cellView: dia.CellView, magnetEl: HTMLElement, options?: { highlighter?: dia.Highlighter }): void;

        protected onCellUnhighlight(cellView: dia.CellView, magnetEl: HTMLElement, options?: { highlighter?: dia.Highlighter }): void;

        protected onRemove(): void;

        protected pointerdown(evt: Event): void;

        protected pointermove(evt: Event): void;

        protected pointerup(evt: Event): void;

        protected removeView(cell: dia.Cell): dia.CellView;

        protected removeViews(): void;

        protected renderView(cell: dia.Cell): dia.CellView;

        protected resetViews(cellsCollection: dia.Cell[], options: object): void;

        protected updateBackgroundColor(color: string): void;

        protected updateBackgroundImage(opt: { position?: any, size?: any }): void;
    }
}

export namespace ui {
}

export namespace shapes {
    interface GenericAttributes<T> extends dia.CellAttributes {
        position?: dia.Point;
        size?: dia.Size;
        angle?: number;
        attrs?: T;
    }

    interface ShapeAttrs extends dia.CSSSelector {
        fill?: string;
        stroke?: string;
        r?: string | number;
        rx?: string | number;
        ry?: string | number;
        cx?: string | number;
        cy?: string | number;
        height?: string | number;
        width?: string | number;
        transform?: string;
        points?: string;
        'stroke-width'?: string | number;
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        ref?: string
    }

    namespace basic {
        class Generic extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        interface RectAttrs extends dia.TextAttrs {
            rect?: ShapeAttrs;
        }

        class Rect extends Generic {
            constructor(attributes?: GenericAttributes<RectAttrs>, options?: {[key: string]: any});
        }

        class Text extends Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        interface CircleAttrs extends dia.TextAttrs {
            circle?: ShapeAttrs;
        }

        class Circle extends Generic {
            constructor(attributes?: GenericAttributes<CircleAttrs>, options?: {[key: string]: any});
        }

        interface EllipseAttrs extends dia.TextAttrs {
            ellipse?: ShapeAttrs;
        }

        class Ellipse extends Generic {
            constructor(attributes?: GenericAttributes<EllipseAttrs>, options?: {[key: string]: any});
        }

        interface PolygonAttrs extends dia.TextAttrs {
            polygon?: ShapeAttrs;
        }

        class Polygon extends Generic {
            constructor(attributes?: GenericAttributes<PolygonAttrs>, options?: {[key: string]: any});
        }

        interface PolylineAttrs extends dia.TextAttrs {
            polyline?: ShapeAttrs;
        }

        class Polyline extends Generic {
            constructor(attributes?: GenericAttributes<PolylineAttrs>, options?: {[key: string]: any});
        }

        class Image extends Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        interface PathAttrs extends dia.TextAttrs {
            path?: ShapeAttrs;
        }

        class Path extends Generic {
            constructor(attributes?: GenericAttributes<PathAttrs>, options?: {[key: string]: any});
        }

        interface RhombusAttrs extends dia.TextAttrs {
            path?: ShapeAttrs;
        }

        class Rhombus extends Generic {
            constructor(attributes?: GenericAttributes<RhombusAttrs>, options?: {[key: string]: any});
        }

        interface TextBlockAttrs extends dia.TextAttrs {
            rect?: ShapeAttrs;
        }

        class TextBlock extends Generic {
            constructor(attributes?: GenericAttributes<TextBlockAttrs>, options?: {[key: string]: any});

            updateSize(cell: dia.Cell, size: dia.Size): void;

            updateContent(cell: dia.Cell, content: string): void;
        }
    }

    namespace chess {
        class KingWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class KingBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class QueenWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class QueenBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class RookWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class RookBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class BishopWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class BishopBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class KnightWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class KnightBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class PawnWhite extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class PawnBlack extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }
    }

    namespace devs {
        /**
         * @deprecated
         */
        interface ModelAttributes extends GenericAttributes<dia.SVGAttributes> {
            inPorts?: string[];
            outPorts?: string[];
            ports?: {[key: string]: any};
        }

        /**
         * @deprecated
         */
        class Model extends basic.Generic {
            constructor(attributes?: ModelAttributes, options?: {[key: string]: any});

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }

        /**
         * @deprecated
         */
        class Coupled extends Model {
            constructor(attributes?: ModelAttributes, options?: {[key: string]: any});
        }

        /**
         * @deprecated
         */
        class Atomic extends Model {
            constructor(attributes?: ModelAttributes, options?: {[key: string]: any});
        }

        class Link extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }
    }

    namespace erd {
        class Entity extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        class WeakEntity extends Entity {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        class Relationship extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        class IdentifyingRelationship extends Relationship {
            constructor(attributes?: GenericAttributes<dia.TextAttrs>, options?: {[key: string]: any});
        }

        interface AttributeAttrs extends dia.TextAttrs {
            ellipse?: ShapeAttrs;
        }

        class Attribute extends dia.Element {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: {[key: string]: any});
        }

        class Multivalued extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: {[key: string]: any});
        }

        class Derived extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: {[key: string]: any});
        }

        class Key extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: {[key: string]: any});
        }

        class Normal extends Attribute {
            constructor(attributes?: GenericAttributes<AttributeAttrs>, options?: {[key: string]: any});
        }

        interface ISAAttrs extends dia.Element {
            polygon?: ShapeAttrs;
        }

        class ISA extends dia.Element {
            constructor(attributes?: GenericAttributes<ISAAttrs>, options?: {[key: string]: any});
        }

        class Line extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});

            cardinality(value: string | number): void;
        }
    }

    namespace fsa {
        class State extends basic.Circle {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: {[key: string]: any});
        }

        class StartState extends dia.Element {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: {[key: string]: any});
        }

        class EndState extends dia.Element {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class Arrow extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }
    }

    namespace logic {
        interface LogicAttrs extends ShapeAttrs {
            ref?: string;
            'ref-x'?: number | string;
            'ref-dx'?: number | string;
            'ref-y'?: number | string;
            'ref-dy'?: number | string;
            magnet?: boolean;
            'class'?: string;
            port?: string;
        }

        interface IOAttrs extends dia.TextAttrs {
            circle?: LogicAttrs;
        }

        class Gate extends basic.Generic {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        class IO extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        class Input extends IO {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        class Output extends IO {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        class Gate11 extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        class Gate21 extends Gate {
            constructor(attributes?: GenericAttributes<IOAttrs>, options?: {[key: string]: any});
        }

        interface Image {
            'xlink:href'?: string;
        }

        interface ImageAttrs extends LogicAttrs {
            image?: Image;
        }

        class Repeater extends Gate11 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input: any): any;
        }

        class Not extends Gate11 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input: any): boolean;
        }

        class Or extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        class And extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        class Nor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        class Nand extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        class Xor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        class Xnor extends Gate21 {
            constructor(attributes?: GenericAttributes<ImageAttrs>, options?: {[key: string]: any});

            operation(input1: any, input2: any): boolean;
        }

        interface WireArgs extends dia.LinkAttributes {
            router?: {[key: string]: any};
            connector?: {[key: string]: any};
        }

        class Wire extends dia.Link {
            constructor(attributes?: WireArgs, options?: {[key: string]: any});
        }
    }

    namespace org {
        interface MemberAttrs {
            rect?: ShapeAttrs;
            image?: ShapeAttrs;
        }

        class Member extends dia.Element {
            constructor(attributes?: GenericAttributes<MemberAttrs>, options?: {[key: string]: any});
        }

        class Arrow extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }
    }

    namespace pn {
        class Place extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class PlaceView extends dia.ElementView {
            renderTokens(): void;
        }

        class Transition extends basic.Generic {
            constructor(attributes?: GenericAttributes<basic.RectAttrs>, options?: {[key: string]: any});
        }

        class Link extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }
    }

    namespace uml {
        interface ClassAttributes extends GenericAttributes<basic.RectAttrs> {
            name: string[];
            attributes: string[];
            methods: string[];
        }

        class Class extends basic.Generic {
            constructor(attributes?: ClassAttributes, options?: {[key: string]: any});

            getClassName(): string[];

            updateRectangles(): void;
        }

        class ClassView extends dia.ElementView {
        }

        class Abstract extends Class {
            constructor(attributes?: ClassAttributes, options?: {[key: string]: any});
        }

        class AbstractView extends ClassView {
            constructor(attributes?: ClassAttributes, options?: {[key: string]: any});
        }

        class Interface extends Class {
            constructor(attributes?: ClassAttributes, options?: {[key: string]: any});
        }

        class InterfaceView extends ClassView {
            constructor(attributes?: ClassAttributes, options?: {[key: string]: any});
        }

        class Generalization extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }

        class Implementation extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }

        class Aggregation extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }

        class Composition extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }

        class Association extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }

        interface StateAttributes extends GenericAttributes<ShapeAttrs> {
            events?: string[];
        }

        class State extends basic.Generic {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: {[key: string]: any});

            updateName(): void;

            updateEvents(): void;

            updatePath(): void;
        }

        class StartState extends basic.Circle {
            constructor(attributes?: GenericAttributes<basic.CircleAttrs>, options?: {[key: string]: any});
        }

        class EndState extends basic.Generic {
            constructor(attributes?: GenericAttributes<dia.SVGAttributes>, options?: {[key: string]: any});
        }

        class Transition extends dia.Link {
            constructor(attributes?: dia.LinkAttributes, options?: {[key: string]: any});
        }
    }
}

export namespace util {

    namespace format {
        export function number(specifier: string, value: number): string;
    }

    export function uuid(): string;

    export function guid(obj?: {[key: string]: any}): string;

    export function nextFrame(callback: () => void, context?: {[key: string]: any}): number;

    export function cancelFrame(requestId: number): void;

    export function flattenObject(object: {[key: string]: any}, delim: string, stop: (node: any) => boolean): any;

    export function getByPath(object: {[key: string]: any}, path: string, delim: string): any;

    export function setByPath(object: {[key: string]: any}, path: string, value: any, delim: string): any;

    export function unsetByPath(object: {[key: string]: any}, path: string, delim: string): any;

    export function breakText(text: string, size: dia.Size, attrs?: dia.SVGAttributes, options?: { svgDocument?: SVGElement }): string;

    export function normalizeSides(box: number | { x?: number, y?: number, height?: number, width?: number }): dia.BBox;

    export function getElementBBox(el: Element): dia.BBox;

    export function setAttributesBySelector(el: Element, attrs: dia.SVGAttributes): void;

    export function sortElements(elements: Element[]
        | string
        | JQuery, comparator: (a: Element, b: Element) => number): Element[];

    export function shapePerimeterConnectionPoint(linkView: dia.LinkView, view: dia.ElementView, magnet: SVGElement, ref: dia.Point): dia.Point;

    export function imageToDataUri(url: string, callback: (err: Error, dataUri: string) => void): void;

    export function toggleFullScreen(el?: Element): void;

    // Not documented but used in examples
    /** @deprecated use lodash _.defaultsDeep */
    export function deepSupplement(objects: any, defaultIndicator?: any): any;

    // Private functions
    /** @deprecated use lodash _.assign */
    export function mixin(objects: any[]): any;

    /** @deprecated use lodash _.defaults */
    export function supplement(objects: any[]): any;

    /** @deprecated use lodash _.mixin  */
    export function deepMixin(objects: any[]): any;
}

export namespace layout {

    interface LayoutOptions {
        nodeSep?: number;
        edgeSep?: number;
        rankSep?: number;
        rankDir?: 'TB' | 'BT' | 'LR' | 'RL';
        marginX?: number;
        marginY?: number;
        resizeCluster?: boolean;
        setPosition?: (element: dia.Element, position: dia.BBox) => void;
        setLinkVertices?: (link: dia.Link, vertices: Position[]) => void;
    }

    export namespace DirectedGraph {
        export function layout(graph: dia.Graph | dia.Cell[], options?: LayoutOptions): dia.BBox;
    }
}

export namespace mvc {

    class View<T extends Backbone.Model> extends Backbone.View<T> {
        constructor(opt: any);
        constructor();

        theme: string;

        defaultTheme: string;

        setTheme(theme: string, opt: any): void;

        getEventNamespace(): this;

        protected init(): void;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected onRemove(): void;
    }
}

export function setTheme(theme: string): void;
