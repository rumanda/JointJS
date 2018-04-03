(function(joint, util, V, g) {

    function getAnchor(coords, view, magnet) {
        // take advantage of an existing logic inside of the
        // pin relative connection strategy
        var end = joint.connectionStrategies.pinRelative.call(
            this.paper,
            {},
            view,
            magnet,
            coords,
            this.model
        );
        return end.anchor;
    }

    function snapAnchor(snapRadius) {
        return function(coords, view, magnet, type) {
            var isSource = (type === 'source');
            var refIndex = (isSource ? 0 : -1);
            var ref = this.model.vertex(refIndex) || this.getEndAnchor(isSource ? 'target' : 'source');
            if (ref) {
                if (Math.abs(ref.x - coords.x) < snapRadius) coords.x = ref.x;
                if (Math.abs(ref.y - coords.y) < snapRadius) coords.y = ref.y;
            }
            return coords;
        }
    }

    var ToolView = joint.dia.ToolView;

    // Vertex Handles
    var VertexHandle = joint.mvc.View.extend({
        tagName: 'circle',
        svgElement: true,
        className: 'marker-vertex',
        events: {
            mousedown: 'onPointerDown',
            touchstart: 'onPointerDown',
            dblclick: 'onDoubleClick'
        },
        documentEvents: {
            mousemove: 'onPointerMove',
            touchmove: 'onPointerMove',
            mouseup: 'onPointerUp',
            touchend: 'onPointerUp'
        },
        attributes: {
            'r': 7,
            'fill': '#FFFFFF',
            'stroke': '#1ABC9C',
            'stroke-width': 2,
            'cursor': 'move'
        },
        position: function(x, y) {
            this.vel.attr({ cx: x, cy: y });
        },
        onPointerDown: function(evt) {
            evt.stopPropagation();
            this.options.paper.undelegateEvents();
            this.delegateDocumentEvents(null, evt.data);
            this.trigger('will-change');
        },
        onPointerMove: function(evt) {
            this.trigger('changing', this, evt);
        },
        onDoubleClick: function(evt) {
            this.trigger('remove', this, evt);
        },
        onPointerUp: function(evt) {
            this.trigger('changed', this, evt);
            this.undelegateDocumentEvents();
            this.options.paper.delegateEvents();
        }
    });

    var Vertices = ToolView.extend({
        options: {
            HandleClass: VertexHandle,
            snapRadius: 20,
            redundancyRemoval: true,
            vertexAdding: true,
        },
        children: [{
            tagName: 'path',
            selector: 'connection',
            className: 'joint-vertices-path',
            attributes: {
                'fill': 'none',
                'stroke': 'transparent',
                'stroke-width': 10,
                'cursor': 'cell'
            }
        }],
        handles: null,
        events: {
            'mousedown .joint-vertices-path': 'onPathPointerDown'
        },
        onRender: function() {
            this.resetHandles();
            if (this.options.vertexAdding) {
                this.renderChildren();
                this.updatePath();
            }
            var relatedView = this.relatedView;
            var vertices = relatedView.model.vertices();
            for (var i = 0, n = vertices.length; i < n; i++) {
                var vertex = vertices[i];
                var handle = new (this.options.HandleClass)({ index: i, paper: this.paper });
                handle.render();
                handle.position(vertex.x, vertex.y);
                handle.vel.appendTo(this.el);
                this.handles.push(handle);
                this.startHandleListening(handle);
            }
            return this;
        },
        update: function() {
            this.render();
            return this;
        },
        updatePath: function() {
            var connection = this.childNodes.connection;
            if (connection) connection.setAttribute('d', this.relatedView.getConnection().serialize());
        },
        startHandleListening: function(handle) {
            var relatedView = this.relatedView;
            if (relatedView.can('vertexMove')) {
                this.listenTo(handle, 'will-change', this.onHandleWillChange);
                this.listenTo(handle, 'changing', this.onHandleChanging);
                this.listenTo(handle, 'changed', this.onHandleChanged);
            }
            if (relatedView.can('vertexRemove')) {
                this.listenTo(handle, 'remove', this.onHandleRemove);
            }
        },
        resetHandles: function() {
            var handles = this.handles;
            this.handles = [];
            this.stopListening();
            if (!Array.isArray(handles)) return;
            for (var i = 0, n = handles.length; i < n; i++) {
                handles[i].remove();
            }
        },
        getNeighborPoints: function(index) {
            var linkView = this.relatedView;
            var vertices = linkView.model.vertices();
            var prev = (index > 0) ? vertices[index - 1] : linkView.sourceAnchor;
            var next = (index < vertices.length - 1) ? vertices[index + 1] : linkView.targetAnchor;
            return {
                prev: new g.Point(prev),
                next: new g.Point(next)
            }
        },
        onHandleWillChange: function(handle, evt) {
            this.focus();
            this.relatedView.model.startBatch('vertex-move', { ui: true, tool: this.cid });
        },
        onHandleChanging: function(handle, evt) {
            var relatedView = this.relatedView;
            var paper = relatedView.paper;
            var index = handle.options.index;
            var vertex = paper.snapToGrid(evt.clientX, evt.clientY).toJSON();
            this.snapVertex(vertex, index);
            relatedView.model.vertex(index, vertex, { ui: true, tool: this.cid });
            handle.position(vertex.x, vertex.y);
        },
        snapVertex: function(vertex, index) {
            var snapRadius = this.options.snapRadius;
            if (snapRadius > 0) {
                var neighbors = this.getNeighborPoints(index);
                var prev = neighbors.prev;
                var next = neighbors.next;
                if (Math.abs(vertex.x - prev.x) < snapRadius) {
                    vertex.x = prev.x;
                } else if (Math.abs(vertex.x - next.x) < snapRadius) {
                    vertex.x = next.x;
                }
                if (Math.abs(vertex.y - prev.y) < snapRadius) {
                    vertex.y = neighbors.prev.y;
                } else if (Math.abs(vertex.y - next.y) < snapRadius) {
                    vertex.y = next.y;
                }
            }
        },
        onHandleChanged: function(handle, evt) {
            if (this.options.vertexAdding) this.updatePath();
            if (!this.options.redundancyRemoval) return;
            var linkView = this.relatedView;
            var verticesRemoved = linkView.removeRedundantLinearVertices({ ui: true, tool: this.cid });
            if (verticesRemoved) this.render();
            this.blur();
            linkView.model.stopBatch('vertex-move', { ui: true, tool: this.cid });
            if (this.eventData(evt).vertexAdded) {
                linkView.model.stopBatch('vertex-add', { ui: true, tool: this.cid });
            }
        },
        onHandleRemove: function(handle) {
            var index = handle.options.index;
            this.relatedView.model.removeVertex(index, { ui: true });
        },
        onPathPointerDown: function(evt) {
            evt.stopPropagation();
            var vertex = this.paper.snapToGrid(evt.clientX, evt.clientY).toJSON();
            var relatedView = this.relatedView;
            relatedView.model.startBatch('vertex-add', { ui: true, tool: this.cid });
            var index = relatedView.getVertexIndex(vertex.x, vertex.y);
            this.snapVertex(vertex, index);
            relatedView.model.insertVertex(index, vertex, { ui: true, tool: this.cid });
            this.render();
            var handle = this.handles[index];
            this.eventData(evt, { vertexAdded: true });
            handle.onPointerDown(evt);
        },
        onRemove: function() {
            this.resetHandles();
        }
    });

    var SegmentHandle = joint.mvc.View.extend({
        tagName: 'g',
        svgElement: true,
        className: 'marker-segment',
        events: {
            mousedown: 'onPointerDown',
            touchstart: 'onPointerDown'
        },
        documentEvents: {
            mousemove: 'onPointerMove',
            touchmove: 'onPointerMove',
            mouseup: 'onPointerUp',
            touchend: 'onPointerUp'
        },
        children: [{
            tagName: 'line',
            selector: 'line',
            attributes: {
                'stroke': '#1ABC9C',
                'stroke-width': 2,
                'fill': 'none',
                'pointer-events': 'none'
            }
        }, {
            tagName: 'rect',
            selector: 'handle',
            attributes: {
                'width': 20,
                'height': 8,
                'x': -10,
                'y': -4,
                'rx': 2,
                'ry': 2,
                'fill': '#FFFFFF',
                'stroke': '#1ABC9C',
                'stroke-width': 2
            }
        }],
        onRender: function() {
            this.renderChildren();
        },
        position: function(x, y, angle, view) {

            var matrix = V.createSVGMatrix().translate(x, y).rotate(angle);
            var handle = this.childNodes.handle;
            handle.setAttribute('transform', V.matrixToTransformString(matrix));
            handle.setAttribute('cursor', (angle % 180 === 0) ? 'row-resize' : 'col-resize');

            var viewPoint = view.getClosestPoint(new g.Point(x, y));
            var line = this.childNodes.line;
            line.setAttribute('x1', x);
            line.setAttribute('y1', y);
            line.setAttribute('x2', viewPoint.x);
            line.setAttribute('y2', viewPoint.y);
        },
        onPointerDown: function(evt) {
            this.trigger('change:start', this, evt);
            evt.stopPropagation();
            this.options.paper.undelegateEvents();
            this.delegateDocumentEvents(null, evt.data);
        },
        onPointerMove: function(evt) {
            this.trigger('changing', this, evt);
        },
        onPointerUp: function(evt) {
            this.undelegateDocumentEvents();
            this.options.paper.delegateEvents();
            this.trigger('change:end', this, evt);
        },
        show: function() {
            this.el.style.display = '';
        },
        hide: function() {
            this.el.style.display = 'none';
        }
    });

    var Segments = ToolView.extend({
        precision: .5,
        options: {
            HandleClass: SegmentHandle,
            segmentLenghtThreshold: 40,
            redundancyRemoval: true,
            anchor: getAnchor,
            snapRadius: 10,
            snapHandle: true
        },
        handels: null,
        onRender: function() {
            this.resetHandles();
            var relatedView = this.relatedView;
            var vertices = relatedView.model.vertices();
            vertices.unshift(relatedView.sourcePoint);
            vertices.push(relatedView.targetPoint);
            for (var i = 0, n = vertices.length; i < n - 1; i++) {
                var vertex = vertices[i];
                var nextVertex = vertices[i + 1];
                var handle = this.renderHandle(vertex, nextVertex);
                this.handles.push(handle);
                handle.options.index = i;
            }
            return this;
        },
        renderHandle: function(vertex, nextVertex) {
            var handle = new (this.options.HandleClass)({ paper: this.paper });
            handle.render();
            this.updateHandle(handle, vertex, nextVertex);
            handle.vel.appendTo(this.el);
            this.startHandleListening(handle);
            return handle;
        },
        update: function() {
            this.render();
            return this;
        },
        startHandleListening: function(handle) {
            this.listenTo(handle, 'change:start', this.onHandleChangeStart);
            this.listenTo(handle, 'changing', this.onHandleChanging);
            this.listenTo(handle, 'change:end', this.onHandleChangeEnd);
        },
        resetHandles: function() {
            var handles = this.handles;
            this.handles = [];
            this.stopListening();
            if (!Array.isArray(handles)) return;
            for (var i = 0, n = handles.length; i < n; i++) {
                handles[i].remove();
            }
        },
        shiftHandleIndexes: function(value) {
            var handles = this.handles;
            for (var i = 0, n = handles.length; i < n; i++) handles[i].options.index += value;
        },
        resetAnchor: function(type, anchor) {
            var relatedModel = this.relatedView.model;
            if (anchor) {
                relatedModel.prop([type, 'anchor'], anchor, {
                    rewrite: true,
                    ui: true,
                    tool: this.cid
                });
            } else {
                relatedModel.removeProp([type, 'anchor'], {
                    ui: true,
                    tool: this.cid
                });
            }
        },
        snapHandle: function(handle, position, data) {

            var index = handle.options.index;
            var linkView = this.relatedView;
            var link = linkView.model;
            var vertices = link.vertices();
            var axis = handle.options.axis;
            var prev = vertices[index - 2] || data.sourceAnchor;
            var next = vertices[index + 1] || data.targetAnchor;
            var snapRadius = this.options.snapRadius;
            if (Math.abs(position[axis] - prev[axis]) < snapRadius) {
                position[axis] = prev[axis];
            } else if (Math.abs(position[axis] - next[axis]) < snapRadius) {
                position[axis] = next[axis];
            }
            return position;
        },

        onHandleChanging: function(handle, evt) {

            var data = this.eventData(evt);
            var relatedView = this.relatedView;
            var paper = relatedView.paper;
            var index = handle.options.index - 1;
            var coords = paper.snapToGrid(evt.clientX, evt.clientY);
            var position = this.snapHandle(handle, coords.clone(), data);
            var axis = handle.options.axis;
            var offset = (this.options.snapHandle) ? 0 : (coords[axis] - position[axis]);
            var link = relatedView.model;
            var vertices = util.cloneDeep(link.vertices());
            var vertex = vertices[index];
            var nextVertex = vertices[index + 1];
            var anchorFn = this.options.anchor;
            if (typeof anchorFn !== 'function') anchorFn = null;

            // First Segment
            var sourceView = relatedView.sourceView;
            var sourceBBox = relatedView.sourceBBox;
            var changeSourceAnchor = false;
            var deleteSourceAnchor = false;
            if (!vertex) {
                vertex = relatedView.sourceAnchor.toJSON();
                vertex[axis] = position[axis];
                if (sourceBBox.containsPoint(vertex)) {
                    vertex[axis] = position[axis];
                    changeSourceAnchor = true;
                } else {
                    // we left the area of the source magnet for the first time
                    vertices.unshift(vertex);
                    this.shiftHandleIndexes(1);
                    delateSourceAnchor = true;
                }
            } else if (index === 0) {
                if (sourceBBox.containsPoint(vertex)) {
                    vertices.shift();
                    this.shiftHandleIndexes(-1);
                    changeSourceAnchor = true;
                } else {
                    vertex[axis] = position[axis];
                    deleteSourceAnchor = true;
                }
            } else {
                vertex[axis] = position[axis];
            }

            if (anchorFn && sourceView) {
                if (changeSourceAnchor) {
                    var sourceAnchorPosition = data.sourceAnchor.clone();
                    sourceAnchorPosition[axis] = position[axis];
                    var sourceAnchor = anchorFn.call(relatedView, sourceAnchorPosition, sourceView, relatedView.sourceMagnet || sourceView.el, 'source', relatedView);
                    this.resetAnchor('source', sourceAnchor);
                }
                if (deleteSourceAnchor) {
                    this.resetAnchor('source', data.sourceAnchorDef);
                }
            }

            // Last segment
            var targetView = relatedView.targetView;
            var targetBBox = relatedView.targetBBox;
            var changeTargetAnchor = false;
            var deleteTargetAnchor = false;
            if (!nextVertex) {
                nextVertex = relatedView.targetAnchor.toJSON();
                nextVertex[axis] = position[axis];
                if (targetBBox.containsPoint(nextVertex)) {
                    changeTargetAnchor = true;
                } else {
                    // we left the area of the target magnet for the first time
                    vertices.push(nextVertex);
                    deleteTargetAnchor = true;
                }
            } else if (index === vertices.length - 2) {
                if (targetBBox.containsPoint(nextVertex)) {
                    vertices.pop();
                    changeTargetAnchor = true;
                } else {
                    nextVertex[axis] = position[axis];
                    deleteTargetAnchor = true;
                }
            } else {
                nextVertex[axis] = position[axis];
            }

            if (anchorFn && targetView) {
                if (changeTargetAnchor) {
                    var targetAnchorPosition = data.targetAnchor.clone();
                    targetAnchorPosition[axis] = position[axis];
                    var targetAnchor = anchorFn.call(relatedView, targetAnchorPosition, targetView, relatedView.targetMagnet || targetView.el, 'target', relatedView);
                    this.resetAnchor('target', targetAnchor);
                }
                if (deleteTargetAnchor) {
                    this.resetAnchor('target', data.targetAnchorDef);
                }
            }

            link.vertices(vertices, { ui: true, tool: this.cid });
            this.updateHandle(handle, vertex, nextVertex, offset);
        },
        onHandleChangeStart: function(handle, evt) {
            var index = handle.options.index;
            var handles = this.handles;
            if (!Array.isArray(handles)) return;
            for (var i = 0, n = handles.length; i < n; i++) {
                if (i !== index) handles[i].hide()
            }
            this.focus();
            var relatedView = this.relatedView;
            var relatedModel = relatedView.model;
            this.eventData(evt, {
                sourceAnchor: relatedView.sourceAnchor.clone(),
                targetAnchor: relatedView.targetAnchor.clone(),
                sourceAnchorDef: util.clone(relatedModel.prop(['source', 'anchor'])),
                targetAnchorDef: util.clone(relatedModel.prop(['target', 'anchor']))
            });
            relatedView.model.startBatch('segment-move', { ui: true, tool: this.cid });
        },
        onHandleChangeEnd: function(handle) {
            var linkView = this.relatedView;
            if (this.options.redundancyRemoval) {
                linkView.removeRedundantLinearVertices({ ui: true, tool: this.cid });
            }
            this.render();
            this.blur();
            linkView.model.stopBatch('segment-move', { ui: true, tool: this.cid });
        },
        updateHandle: function(handle, vertex, nextVertex, offset) {
            var vertical = Math.abs(vertex.x - nextVertex.x) < this.precision;
            var horizontal = Math.abs(vertex.y - nextVertex.y) < this.precision;
            if (vertical || horizontal) {
                var segmentLine = new g.Line(vertex, nextVertex);
                var length = segmentLine.length();
                if (length < this.options.segmentLenghtThreshold) {
                    handle.hide();
                } else {
                    var position = segmentLine.midpoint()
                    var axis = (vertical) ? 'x' : 'y';
                    position[axis] += offset || 0;
                    var angle = segmentLine.vector().vectorAngle(new g.Point(1, 0));
                    handle.position(position.x, position.y, angle, this.relatedView);
                    handle.show();
                    handle.options.axis = axis;
                }
            } else {
                handle.hide();
            }
        },
        onRemove: function() {
            this.resetHandles();
        }
    });

    // End Markers
    var Arrowhead = ToolView.extend({
        tagName: 'path',
        xAxisVector: new g.Point(1, 0),
        events: {
            mousedown: 'onPointerDown',
            touchstart: 'onPointerDown'
        },
        documentEvents: {
            mousemove: 'onPointerMove',
            touchmove: 'onPointerMove',
            mouseup: 'onPointerUp',
            touchend: 'onPointerUp'
        },
        onRender: function() {
            this.update()
        },
        update: function() {
            var ratio = this.ratio;
            var view = this.relatedView;
            var tangent = view.getTangentAtRatio(ratio);
            var position, angle;
            if (tangent) {
                position = tangent.start;
                angle = tangent.vector().vectorAngle(this.xAxisVector);
            } else {
                position = view.getPointAtRatio(ratio);
                angle = 0;
            }
            var matrix = V.createSVGMatrix().translate(position.x, position.y).rotate(angle);
            this.vel.transform(matrix, { absolute: true });
            return this;
        },
        onPointerDown: function(evt) {
            evt.stopPropagation();
            var relatedView = this.relatedView;
            relatedView.model.startBatch('arrowhead-move', { ui: true, tool: this.cid });
            if (relatedView.can('arrowheadMove')) {
                relatedView.startArrowheadMove(this.arrowheadType);
                this.delegateDocumentEvents();
                relatedView.paper.undelegateEvents();
            }
            this.focus();
        },
        onPointerMove: function(evt) {
            var coords = this.paper.snapToGrid(evt.clientX, evt.clientY);
            this.relatedView.pointermove(evt, coords.x, coords.y);
        },
        onPointerUp: function(evt) {
            this.undelegateDocumentEvents();
            var relatedView = this.relatedView;
            var paper = relatedView.paper;
            var coords = paper.snapToGrid(evt.clientX, evt.clientY);
            relatedView.pointerup(evt, coords.x, coords.y);
            paper.delegateEvents();
            this.blur();
            relatedView.model.stopBatch('arrowhead-move', { ui: true, tool: this.cid });
        }
    });

    var TargetArrowhead = Arrowhead.extend({
        ratio: 1,
        arrowheadType: 'target',
        attributes: {
            'd': 'M -20 -10 0 0 -20 10 Z',
            'fill': '#FFFFFF',
            'stroke': '#1ABC9C',
            'stroke-width': 2,
            'cursor': 'move',
            'class': 'source-arrowhead'
        }
    });

    var SourceArrowhead = Arrowhead.extend({
        ratio: 0,
        arrowheadType: 'source',
        attributes: {
            'd': 'M 20 -10 0 0 20 10 Z',
            'fill': '#FFFFFF',
            'stroke': '#1ABC9C',
            'stroke-width': 2,
            'cursor': 'move',
            'class': 'target-arrowhead'
        }
    });

    var Button = ToolView.extend({
        events: {
            'mousedown': 'onPointerDown',
            'touchstart': 'onPointerDown'
        },
        options: {
            distance: 0,
            offset: 0
        },
        onRender: function() {
            this.renderChildren(this.options.markup);
            this.update()
        },
        update: function() {
            var tangent, position, angle;
            var distance = this.options.distance || 0;
            if (util.isPercentage(distance)) {
                tangent = this.relatedView.getTangentAtRatio(parseFloat(distance) / 100);
            } else {
                tangent = this.relatedView.getTangentAtLength(distance)
            }
            if (tangent) {
                position = tangent.start;
                angle = tangent.vector().vectorAngle(new g.Point(1,0));
            } else {
                position = this.relatedView.getConnection().start;
                angle = 0;
            }
            var matrix = V.createSVGMatrix()
                .translate(position.x, position.y)
                .rotate(angle)
                .translate(0, this.options.offset || 0);
            this.vel.transform(matrix, { absolute: true });
            return this;
        },
        onPointerDown: function(evt) {
            evt.stopPropagation();
            var actionFn = this.options.action;
            if (typeof actionFn === 'function') {
                actionFn.call(this.relatedView, evt, this.relatedView);
            }
        }
    });


    var Remove = Button.extend({
        children: [{
            tagName: 'circle',
            selector: 'button',
            attributes: {
                'r': 7,
                'fill': '#FFFFFF',
                'stroke': '#F34612',
                'stroke-width': 1,
                'cursor': 'pointer'
            }
        }, {
            tagName: 'path',
            selector: 'icon',
            attributes: {
                'd': 'M -3 -3 3 3 M -3 3 3 -3',
                'fill': 'none',
                'stroke': '#F34612',
                'stroke-width': 2,
                'pointer-events': 'none'
            }
        }],
        options: {
            distance: 60,
            offset: 0,
            action: function(evt) {
                this.model.remove({ ui: true, tool: this.cid });
            }
        }
    });

    var Boundary = ToolView.extend({
        tagName: 'rect',
        options: {
            padding: 10
        },
        attributes: {
            'fill': 'none',
            'stroke': '#1ABC9C',
            'stroke-width': .5,
            'stroke-dasharray': '5, 5',
            'pointer-events': 'none'
        },
        onRender: function() {
            this.update();
        },
        update: function() {
            var padding = this.options.padding;
            if (!isFinite(padding)) padding = 0;
            var bbox = this.relatedView.getConnection().bbox().inflate(padding);
            this.vel.attr(bbox.toJSON());
            return this;
        }
    });

    var Anchor = ToolView.extend({
        tagName: 'g',
        type: null,
        children: [{
            tagName: 'circle',
            selector: 'anchor',
            attributes: {
                'r': 6,
                'stroke': '#FFFFFF',
                'stroke-width': 2,
                'cursor': 'pointer'
            }
        }, {
            tagName: 'rect',
            selector: 'area',
            attributes: {
                'pointer-events': 'none',
                'fill': 'none',
                'stroke': '#F34612',
                'stroke-dasharray': '2,4',
                'rx': 5,
                'ry': 5
            }
        }],
        events: {
            mousedown: 'onPointerDown',
            touchstart: 'onPointerDown',
            dblclick: 'onPointerDblClick'
        },
        documentEvents: {
            mousemove: 'onPointerMove',
            touchmove: 'onPointerMove',
            mouseup: 'onPointerUp',
            touchend: 'onPointerUp'
        },
        options: {
            snap: snapAnchor(10),
            anchor: getAnchor,
            customAnchorColor: '#F34612',
            defaultAnchorColor: '#1ABC9C',
            areaPadding: 7,
            snapRadius: 10,
            restrictArea: true,
            redundancyRemoval: true
        },
        onRender: function() {
            this.renderChildren();
            this.toggleArea(false);
            this.update();
        },
        update: function() {
            var type = this.type;
            var relatedView = this.relatedView;
            var view = relatedView.getEndView(type);
            if (view) {
                this.updateAnchor();
                this.updateArea();
                this.el.style.display = '';
            } else {
                this.el.style.display = 'none';
            }
            return this;
        },
        updateAnchor: function() {
            var childNodes = this.childNodes;
            if (!childNodes) return;
            var anchorNode = childNodes.anchor;
            if (!anchorNode) return;
            var relatedView = this.relatedView;
            var type = this.type;
            var position = relatedView.getEndAnchor(type);
            var options = this.options;
            var customAnchor = relatedView.model.prop([type, 'anchor']);
            anchorNode.setAttribute('transform', 'translate(' + position.x + ',' + position.y + ')');
            anchorNode.setAttribute('fill', (customAnchor) ? options.customAnchorColor : options.defaultAnchorColor);
        },
        updateArea: function() {
            var childNodes = this.childNodes;
            if (!childNodes) return;
            var areaNode = childNodes.area;
            if (!areaNode) return;
            var relatedView = this.relatedView;
            var type = this.type;
            var view = relatedView.getEndView(type);
            var magnet = relatedView.getEndMagnet(type);
            var padding = this.options.areaPadding;
            if (!isFinite(padding)) padding = 0;
            var bbox = view.getNodeUnrotatedBBox(magnet).inflate(padding);
            var angle = view.model.angle();
            areaNode.setAttribute('x', -bbox.width / 2);
            areaNode.setAttribute('y', -bbox.height / 2);
            areaNode.setAttribute('width', bbox.width);
            areaNode.setAttribute('height', bbox.height);
            var origin = view.model.getBBox().center();
            var center = bbox.center().rotate(origin, -angle)
            areaNode.setAttribute('transform', 'translate(' + center.x + ',' + center.y + ') rotate(' + angle +')');
        },
        toggleArea: function(visible) {
            this.childNodes.area.style.display = (visible) ? '' : 'none';
        },
        onPointerDown: function(evt) {
            evt.stopPropagation();
            this.paper.undelegateEvents();
            this.delegateDocumentEvents();
            this.focus();
            this.toggleArea(this.options.restrictArea);
            this.relatedView.model.startBatch('anchor-move', { ui: true, tool: this.cid });
        },
        resetAnchor: function(anchor) {
            var type = this.type;
            var relatedModel = this.relatedView.model;
            if (anchor) {
                relatedModel.prop([type, 'anchor'], anchor, {
                    rewrite: true,
                    ui: true,
                    tool: this.cid
                });
            } else {
                relatedModel.removeProp([type, 'anchor'], {
                    ui: true,
                    tool: this.cid
                });
            }
        },
        onPointerMove: function(evt) {

            var relatedView = this.relatedView;
            var type = this.type;
            var view = relatedView.getEndView(type);
            var magnet = relatedView.getEndMagnet(type);

            var coords = this.paper.clientToLocalPoint(evt.clientX, evt.clientY);
            var snapFn = this.options.snap;
            if (typeof snapFn === 'function') {
                coords = snapFn.call(relatedView, coords, view, magnet, type, relatedView);
                coords = new g.Point(coords);
            }

            if (this.options.restrictArea) {
                // snap coords within node bbox
                var bbox = view.getNodeUnrotatedBBox(magnet);
                var angle = view.model.angle();
                var origin = view.model.getBBox().center();
                var rotatedCoords = coords.clone().rotate(origin, angle);
                if (!bbox.containsPoint(rotatedCoords)) {
                    coords = bbox.pointNearestToPoint(rotatedCoords).rotate(origin, -angle);
                }
            }

            var anchor;
            var anchorFn = this.options.anchor;
            if (typeof anchorFn === 'function') {
                anchor = anchorFn.call(relatedView, coords, view, magnet, type, relatedView);
            }

            this.resetAnchor(anchor);
            this.update();
        },

        onPointerUp: function(evt) {
            this.paper.delegateEvents();
            this.undelegateDocumentEvents();
            this.blur();
            this.toggleArea(false);
            var linkView = this.relatedView;
            if (this.options.redundancyRemoval) linkView.removeRedundantLinearVertices({ ui: true, tool: this.cid });
            linkView.model.stopBatch('anchor-move', { ui: true, tool: this.cid });
        },

        onPointerDblClick: function() {
            this.resetAnchor();
            this.update();
        }
    });

    var SourceAnchor = Anchor.extend({
        type: 'source'
    });

    var TargetAnchor = Anchor.extend({
        type: 'target'
    });

    // Export
    joint.linkTools = {
        Vertices: Vertices,
        Segments: Segments,
        SourceArrowhead: SourceArrowhead,
        TargetArrowhead: TargetArrowhead,
        SourceAnchor: SourceAnchor,
        TargetAnchor: TargetAnchor,
        Button: Button,
        Remove: Remove,
        Boundary: Boundary
    };

})(joint, joint.util, V, g);
