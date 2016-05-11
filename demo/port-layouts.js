// I.
$('<h2/>').text('Default settings').appendTo('body');
var graph1 = createPaper().model;
$('<button/>').text('add port').appendTo('body').on('click', function() {
    g1.addPort({ attrs: { circle: { magnet: true } } });
});
$('<button/>').text('remove port').appendTo('body').on('click', function() {
    g1.removePort(g1.getPorts()[0]);
});
var g1 = new joint.shapes.basic.Rect({
    position: { x: 130, y: 30 },
    size: { width: 100, height: 150 }
});
graph1.addCell(g1);
g1.addPort({ attrs: { circle: { magnet: true } } });
g1.addPort({ attrs: { circle: { magnet: true } } });
g1.addPort({ attrs: { circle: { magnet: true } } });

new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[0].id } }).addTo(graph1);
new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[1].id } }).addTo(graph1);
new joint.dia.Link({ source: { id: 'target' }, target: { id: g1.id, port: g1.getPorts()[2].id } }).addTo(graph1);

// II.
$('<h2/>').text('Port groups - \'blacks\', \'reds\', \'greens\'').appendTo('body');
var paper2 = createPaper();
var g2 = new joint.shapes.basic.Rect({
    position: { x: 130, y: 30 },
    size: { width: 300, height: 150 },
    attrs: {
        text: { text: 'left' }
    },
    ports: {
        groups: {
            'blacks': {
                attrs: {
                    circle: {
                        fill: '#000000',
                        stroke: 'darkGray',
                        'stroke-width': 2,
                        r: 12,
                        magnet: true
                    }
                }
            },
            'reds': {
                position: function(port, index, ports) {
                    return { x: index * 20 + 20, y: 0 };
                },
                attrs: {
                    circle: {
                        fill: 'red',
                        r: 10,
                        magnet: true
                    }
                }
            },
            'greens': {
                attrs: {
                    circle: {
                        fill: 'transparent',
                        stroke: 'green',
                        'stroke-width': 3,
                        r: 20,
                        magnet: true
                    }
                },
                position: 'absolute'
            }
        }
    }
});

paper2.model.addCell(g2);
g2.addPort({ group: 'blacks', id: 'b1' });
g2.addPort({ group: 'blacks', id: 'b2' });
g2.addPort({ group: 'blacks' });
g2.addPort({ group: 'blacks' });
g2.addPort({ group: 'blacks' });
g2.addPort({ group: 'blacks' });

g2.addPort({ group: 'greens', args: { x: '70%', y: '60%' } });
g2.addPort({ group: 'greens', args: { x: '90%', y: '60%' } });

g2.addPort({ group: 'reds' });
//override group settings
g2.addPort({ group: 'reds', attrs: { circle: { r: 5 } } });
g2.addPort({ group: 'reds' });

$('<b/>').text('Click on Rectangle to toggle port positions alignment').appendTo('body');

var portPosition = 0;
paper2.on('element:pointerdown', function(cellView, e) {

    var positions = _.keys(joint.layout.Port);

    var pos = positions[(portPosition) % positions.length];

    if (pos !== 'fn') {
        g2.prop('ports/groups/blacks/position/name', pos);
    }
    cellView.model.prop('attrs/text/text', pos);
    portPosition++;
});


// III.
$('<h2/>').text('Labels').appendTo('body');
var paper3 = createPaper();
var g3 = new joint.shapes.basic.Circle({
    position: { x: 130, y: 40 },
    size: { width: 200, height: 100 },
    ellipse: { fill: 'gray', stroke: 'red', rx: 150, ry: 100, cx: 150, cy: 100 },
    attrs: {
        text: { text: 'left' }
    },
    ports: {
        groups: {
            'a': {
                position: {
                    name: 'ellipse',
                    args: { dr: 0 }
                },
                label: {
                    position: 'left',
                    args: {}
                },
                attrs: {
                    circle: {
                        fill: '#ffffff',
                        stroke: '#000000',
                        r: 10
                    },
                    text: { fill: 'green' }
                }
            }
        }
    }
});

_.times(5, function(index) {

    g3.addPort({
        attrs: {
            text: { text: 'label ' + index },
            circle: { magnet: true }
        },
        group: 'a'
    });
});

g3.addPort({
    attrs: {
        text: { text: 'custom label' },
        circle: {
            stroke: 'red',
            'stroke-width': 2,
            magnet: true
        },
        '.label-rect': {
            stroke: 'red',
            width: 100,
            height: 20
        }

    },
    label: {
        position: { name: 'top', args: { tx: 15, ty: -10, anchor: 'start' } },
        markup: '<g><rect class="label-rect"/><text/></g>'
    },
    group: 'a'
});
paper3.model.addCell(g3);

$('<b/>').text('Click on ellipse to toggle label position alignment').appendTo('body');

var labelPos = 0;
paper3.on('element:pointerdown', function(cellView, e) {

    var positions = _.keys(joint.layout.Label);
    var pos = positions[(labelPos) % positions.length];

    cellView.model.prop('attrs/text/text', pos);

    g3.prop('ports/groups/a/label/position', pos);
    labelPos++;
});


// IV.

$('<h2/>').text('Z index').appendTo('body');
var paper4 = createPaper();
$('<b/>').text('Click on Rectangle to increment z-index of massive port').appendTo('body');

var g4 = new joint.shapes.basic.Rect({
    position: { x: 130, y: 30 },
    size: { width: 100, height: 150 }
});

_.times(10, function(index) {
    g4.addPort({ id: index + '', attrs: { circle: { r: 15, magnet: true, stroke: '#ffffff' } } });
});

paper4.model.addCell(g4);
g4.addPort({
    z: 2,
    args: {
        dy: -140,
        dx: -20
    },
    label: {
        position: {
            name: 'top'
        }
    },
    attrs: {
        rect: {
            fill: '#ff0000',
            stroke: '#000000',
            magnet: true,
            height: 140,
            width: 60
        },
        text: { text: 'massive port - z-index:2', fill: 'red' }
    },
    markup: '<rect/>'
});

paper4.on('element:pointerdown', function(cellView) {

    var portIndex = 10;
    var z = parseInt(cellView.model.prop('ports/items/' + portIndex + '/z'), 10) || 0;

    if (z > 10) {
        z = 0;
    }

    cellView.model.prop('ports/items/' + portIndex + '/z', ++z);
    cellView.model.prop('ports/items/' + portIndex + '/attrs/text/text', 'massive port - z-index:' + z);
});

/**
 * HELPERS
 */
function createPaper() {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('<div/>').appendTo(document.body),
        width: 800,
        height: 300,
        gridSize: 1,
        perpendicularLinks: false,
        model: graph,
        linkView: joint.dia.LinkView.extend({
            options: _.extend({}, joint.dia.LinkView.prototype.options, {
                doubleLinkTools: true,
                linkToolsOffset: 40,
                doubleLinkToolsOffset: 60
            })
        })
    });

    new joint.shapes.basic.Circle({
        position: { x: 10, y: 220 },
        id: 'target',
        attrs: {
            text: { text: 'target' }
        }
    }).addTo(graph);

    return paper;
}

