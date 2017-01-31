var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 650,
    height: 400,
    gridSize: 20,
    model: graph,
    markAvailable: true,
    linkConnectionPoint: joint.util.shapePerimeterConnectionPoint
});

var rb = new joint.shapes.basic.Rect({
    position: { x: 50, y: 50 },
    size: { width: 100, height: 40 },
    attrs: { text: { text: 'basic.Rect' } }
});
graph.addCell(rb);

var tb = new joint.shapes.basic.Text({
    position: { x: 170, y: 50 },
    size: { width: 100, height: 30 },
    attrs: { text: { text: 'basic.Text' } }
});
graph.addCell(tb);

var cb = new joint.shapes.basic.Circle({
    position: { x: 300, y: 70 },
    size: { width: 100, height: 40 },
    attrs: { text: { text: 'basic.Circle' } }
});
graph.addCell(cb);

var ib = new joint.shapes.basic.Image({
    position: { x: 450, y: 50 },
    size: { width: 40, height: 40 },
    attrs: {
        text: { text: 'basic.Image' },
        image: { 'xlink:href': 'http://placehold.it/48x48', width: 48, height: 48 }
    }
});
graph.addCell(ib);

var pb = new joint.shapes.basic.Path({
    position: { x: 50, y: 150 },
    size: { width: 40, height: 40 },
    attrs: {
        path: { d: 'M25.979,12.896 19.312,12.896 19.312,6.229 12.647,6.229 12.647,12.896 5.979,12.896 5.979,19.562 12.647,19.562 12.647,26.229 19.312,26.229 19.312,19.562 25.979,19.562z' },
        text: { text: 'basic.Path' }
    }
});
graph.addCell(pb);

var rh = new joint.shapes.basic.Rhombus({
    position: { x: 50, y: 250 },
    size: { width: 70, height: 70 },
    attrs: { text: { text: 'basic.Rhombus', 'font-size': 8 } }
});
graph.addCell(rh);

var tbl = new joint.shapes.basic.TextBlock({
    position: { x: 400, y: 150 },
    size: { width: 180, height: 100 },
    content: "Lorem ipsum dolor sit amet,\n consectetur adipiscing elit. Nulla vel porttitor est."
});
graph.addCell(tbl);

// An example of a custom element.
// -------------------------------

var MyElementWithPorts = joint.shapes.basic.Generic.extend({

   defaults: _.defaultsDeep({

       markup: [
           '<g class="rotatable">',
           '<g class="scalable">',
           '<rect/>',
           '</g>',
           '<g class="inPorts">',
           '<g class="port1"><circle/><text/></g>',
           '<g class="port2"><circle/><text/></g>',
           '</g>',
           '<g class="outPorts">',
           '<g class="port3"><circle/><text/></g>',
           '<g class="port4"><circle/><text/></g>',
           '</g>',
           '</g>'
       ].join(''),

       type: 'basic.Generic',
       attrs: {
           '.': { magnet: false },
           rect: {
               width: 150, height: 250,
               stroke: 'black'
           },
           circle: {
               r: 5,
               magnet: true,
               stroke: 'black'
           },
           text: {
               fill: 'black',
               'pointer-events': 'none'
           },
           '.label': { text: 'Model', dx: 5, dy: 5 },
           '.inPorts text': { dx:-15, 'text-anchor': 'end' },
           '.outPorts text':{ dx: 15 },
           '.inPorts circle': { fill: 'PaleGreen' },
           '.outPorts circle': { fill: 'Tomato' }
       }

   }, joint.shapes.basic.Generic.prototype.defaults)
});

var d = new MyElementWithPorts({
    position: { x: 250, y: 150 },
    size: { width: 80, height: 80 },
    attrs: {
        '.port1 text': { text: 'port1' },
        '.port2 text': { text: 'port2' },
        '.port3 text': { text: 'port3' },
        '.port4 text': { text: 'port4' },
        '.port1': { ref: 'rect', 'ref-y': .2 },
        '.port2': { ref: 'rect', 'ref-y': .4 },
        '.port3': { ref: 'rect', 'ref-y': .2, 'ref-dx': 0 },
        '.port4': { ref: 'rect', 'ref-y': .4, 'ref-dx': 0 }
    }
});

graph.addCell(d);


// An example showing auto-resize of the joint.shapes.basic.Rect element based on the size of the text in it:

rb.on('change:attrs', function(element) {

    var text = rb.attr('text/text');
    var fontSize = parseInt(rb.attr('text/font-size'), 10);

    var svgDocument = V('svg').node;
    var textElement = V('<text><tspan></tspan></text>').node;
    var textSpan = textElement.firstChild;
    var textNode = document.createTextNode('');

    textSpan.appendChild(textNode);
    svgDocument.appendChild(textElement);
    document.body.appendChild(svgDocument);

    var lines = text.split('\n');
    var width = 0;

    // Find the longest line width.
    _.each(lines, function(line) {

        textNode.data = line;
        var lineWidth = textSpan.getComputedTextLength();

        width = Math.max(width, lineWidth);
    });

    var height = lines.length * (fontSize * 1.2);

    V(svgDocument).remove();

    element.resize(width + 10, height);
});

// Image decorated rectangle shape example.

joint.shapes.basic.DecoratedRect = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

    defaults: _.defaultsDeep({

        type: 'basic.DecoratedRect',
        size: { width: 100, height: 60 },
        attrs: {
            'rect': { fill: '#FFFFFF', stroke: 'black', width: 100, height: 60 },
            'text': { 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', fill: 'black' },
            'image': { 'ref-x': 2, 'ref-y': 2, ref: 'rect', width: 16, height: 16 }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

var decoratedRect = new joint.shapes.basic.DecoratedRect({
    position: { x: 150, y: 80 },
    size: { width: 100, height: 60 },
    attrs: {
        text: { text: 'My Element' },
        image: { 'xlink:href': 'http://placehold.it/16x16' }
    }
});
graph.addCell(decoratedRect);


joint.shapes.basic.Cylinder = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><path/></g><text/></g>',

    defaults: _.defaultsDeep({

        type: 'basic.Cylinder',
        size: { width: 40, height: 40 },
        attrs: {
            'path': {
                fill: '#FFFFFF', stroke: '#cbd2d7', 'stroke-width': 3,
                d: [
                    'M 0 10 C 10 5, 30 5, 40 10 C 30 15, 10 15, 0 10',
                    'L 0 20',
                    'C 10 25, 30 25, 40 20',
                    'L 40 10'
                ].join(' ')
            },
            'text': { fill: '#435460', 'font-size': 14, text: '', 'ref-x': .5, 'ref-y': .7, ref: 'path', 'y-alignment': 'middle', 'text-anchor': 'middle', fill: 'black', 'font-family': 'Arial, helvetica, sans-serif' }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

var cylinder = new joint.shapes.basic.Cylinder({
    position: { x: 200, y: 200 },
    size: { width: 180, height: 150 },
    attrs: {
        text: { text: 'SEQUENCE\nLIBRARY' }
    }
});

graph.addCell(cylinder);

var c = V('circle', { r: 8, fill: 'red' });
var cylinderView = cylinder.findView(paper);
var cylinderPath = cylinderView.vel.findOne('path');
var cylinderScalable = cylinderView.vel.findOne('.scalable');
var cylinderScalableCTM = cylinderScalable.node.getCTM().inverse();

c.animateAlongPath({ dur: '4s', repeatCount: 'indefinite' }, cylinderPath.node);
c.scale(cylinderScalableCTM.a, cylinderScalableCTM.d);
cylinderScalable.append(c);

// Global special attributes
joint.dia.attributes.lineStyle = {
    set: function(lineStyle, node, attrs) {

        var n = attrs['strokeWidth'] || attrs['stroke-width'] || 1;
        var dasharray = {
            'dashed': (4*n) + ',' + (2*n),
            'dotted': n + ',' + n
        }[lineStyle] || 'none';

        return { 'stroke-dasharray': dasharray };
    }
};

joint.dia.attributes.fitRef = {
    size: function(fitRef, refBBox, node) {
        switch (node.tagName.toUpperCase()) {
            case 'ELLIPSE':
                return {
                    rx: refBBox.width / 2,
                    ry: refBBox.height / 2,
                    cx: refBBox.width / 2,
                    cy: refBBox.height / 2
                };
            case 'RECT':
                return {
                    width: refBBox.width,
                    height: refBBox.height
                };
            case 'PATH':
                var rect = _.extend(refBBox.toJSON(), fitRef);
                return {
                    d: V.rectToPath(rect)
                };
        }
    }
};

joint.dia.attributes.debug = {
    set: function(debug, node, attrs) {
        if (debug) {
            console.log('node:', node);
        }
    }
};

joint.shapes.basic.SATest = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><ellipse/><text/><path/></g>',

    defaults: _.defaultsDeep({

        type: 'basic.SATest',
        attrs: {
            ellipse: {
                fill: '#FFFFFF',
                stroke: '#cbd2d7',
                strokeWidth: 3,
                lineStyle: 'dashed',
                debug: true,
                fitRef: true
            },
            path: {
                stroke: '#cbd2d7',
                strokeWidth: 3,
                lineStyle: 'dotted',
                fill: 'none',
                d: ['M', 0, '25%', '100%', '25%', 'M', '100%', '75%', 0, '75%']
                //fitRef: { rx: 15, ry: 15 }
            },
            'text': {
                fill: '#cbd2d7',
                fontSize: 20,
                fontFamily: 'Arial, helvetica, sans-serif',
                text: 'Special\nAttributes',
                refX: '50%',
                refY: '50%',
                transform: 'rotate(45) scale(0.5,0.5)',
                yAlignment: 'middle',
                xAlignment: 'middle'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
}, {

    // Element specific special attributes
    attributes: {

        d: {
            // The path data `d` attribute to be defined via an array.
            // e.g. d: ['M', 0, '25%', '100%', '25%', 'M', '100%', '75%', 0, '75%']
            qualify: _.isArray,
            size: function(value, refBBox) {
                var i = 0;
                var attrValue = value.map(function(data, index) {
                    if (_.isString(data)) {
                        if (data.slice(-1) === '%') {
                            return parseFloat(data) / 100 * refBBox[((index - i) % 2) ? 'height' : 'width'];
                        } else {
                            i++;
                        }
                    }
                    return data;
                }).join(' ');
                return { d:  attrValue };
            }
        }
    }
});

var sa = new joint.shapes.basic.SATest({
    size: { height: 100, width: 100 },
    position: { x: 500, y: 280 }
}).addTo(graph);

var sal = new joint.dia.Link({
    source: { id: sa.id },
    target: { x: 400, y: 350 },
    vertices: [{ x: 450, y: 300 }],
    router: { name: 'orthogonal' },
    attrs: {
        '.connection': {
            sourceMarker: {
                type: 'circle',
                fill: '#666',
                stroke: '#000',
                r: 5,
                cx: 5
            },
            targetMarker: {
                type: 'path',
                fill: '#666',
                stroke: '#000',
                d: 'M 10 -10 0 0 10 10 z'
            },
            vertexMarker: {
                type: 'circle',
                fill: '#666',
                stroke: '#000',
                r: 5
            }
        }
    }
}).addTo(graph);
