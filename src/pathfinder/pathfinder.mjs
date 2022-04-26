/*eslint-env es6 */
import * as g from '../g/index.mjs';
import * as util from '../util/index.mjs';
import { debugConf, debugLog, debugStore } from './debug.mjs';

import Grid from './models/grid.mjs';
import { CardinalDirections, JumpPointFinder } from './finders/jps.mjs';

const config = {
    step: 10,
    padding: 10,
    startDirections: ['top', 'right', 'bottom', 'left'],
    endDirections: ['top', 'right', 'bottom', 'left'],
    gridBounds: {
        // todo: how to get initial gridBounds without paper
        // todo: should it be in Paper or Grid coordinate space (Paper/step)?
        lo: { x: 0, y: 0 },
        hi: { x: 200, y: 200 }
    },
    quadrantSize: 94906265, // floor(sqrt(MAX_SAFE_INTEGER)),
    isGridNodeObstacle: null,
    excludeTypes: ['basic.Text'],
    excludeEnds: [],
    directionChangePenalty: 1,
};

export class Pathfinder {

    constructor(graph, opt = {}) {
        if (!graph) {
            return debugLog('Pathfinder requires an instance of dia.Graph.');
        }

        this.opt = resolveOptions(opt);

        // Grid
        this.grid = new Grid(graph, this.opt);
    }

    search(vertices, args, linkView) {
        const { opt } = this;
        const finder = new JumpPointFinder({ grid: this.grid });

        const from = this.getRectPoints(linkView.sourceBBox, opt.startDirections, 'source');
        const to = this.getRectPoints(linkView.targetBBox, opt.endDirections, 'target');

        const s = window.performance.now();
        const path = finder.findPath(from, to, vertices, linkView, { bendCost: opt.directionChangePenalty });
        const e = window.performance.now();

        // const origin = linkView.sourceBBox.origin();
        // const width = linkView.targetBBox.corner().x - origin.x;
        // const height = linkView.targetBBox.corner().y - origin.y;
        // const area = new g.Rect(origin.x, origin.y, width, height);
        //
        // const startbb = window.performance.now();
        // const cells = this.getObstaclesInArea(area);
        // console.log(cells);
        // const endbb = window.performance.now();
        // console.info('Took ' + (endbb - startbb).toFixed(2) + ' ms to calculate obstacles in area.');


        if (debugConf.routerBenchmark) {
            // eslint-disable-next-line no-console
            console.info('Took ' + (e - s).toFixed(2) + ' ms to calculate route');
        }
        debugStore.fullRouterTime += (e - s);

        return path;
    }

    getRectPoints(rect, directions, endpoint) {
        let opt = this.opt;
        const transform = new g.Rect(opt.paddingBox)
            .moveAndExpand({ x: -opt.step, y: -opt.step, width: 2 * opt.step, height: 2 * opt.step });
        const bbox = rect.clone().moveAndExpand(transform);
        const center = bbox.center();

        const points = [];
        directions.forEach(dir => {
            switch (dir) {
                case 'top':
                    points.push({
                        dir: endpoint === 'source' ? CardinalDirections['N'] : CardinalDirections['S'],
                        paperPoint: bbox.topMiddle(),
                        offset: bbox.topMiddle().distance(center) / opt.step
                    });
                    break;
                case 'right':
                    points.push({
                        dir: endpoint === 'source' ? CardinalDirections['E'] : CardinalDirections['W'],
                        paperPoint: bbox.rightMiddle(),
                        offset: bbox.rightMiddle().distance(center) / opt.step
                    });
                    break;
                case 'bottom':
                    points.push({
                        dir: endpoint === 'source' ? CardinalDirections['S'] : CardinalDirections['N'],
                        paperPoint: bbox.bottomMiddle(),
                        offset: bbox.bottomMiddle().distance(center) / opt.step
                    });
                    break;
                case 'left':
                    points.push({
                        dir: endpoint === 'source' ? CardinalDirections['W'] : CardinalDirections['E'],
                        paperPoint: bbox.leftMiddle(),
                        offset: bbox.leftMiddle().distance(center) / opt.step
                    });
            }
        });

        return points;
    }
}

function resolveOptions(opt) {
    opt = util.assign({}, config, opt);

    opt.paddingBox = util.result(opt, 'paddingBox');
    opt.padding = util.result(opt, 'padding');
    opt.quadrantSize = util.result(opt, 'quadrantSize');

    if (opt.padding) {
        // if both provided, opt.padding wins over opt.paddingBox
        const sides = util.normalizeSides(opt.padding);
        opt.paddingBox = {
            x: -sides.left,
            y: -sides.top,
            width: sides.left + sides.right,
            height: sides.top + sides.bottom
        };
    }

    return opt;
}