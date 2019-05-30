import * as connectors from '../module/connectors/index.mjs';
import * as highlighters from '../module/highlighters/index.mjs';
import * as connectionPoints from '../module/connectionpoints/index.mjs';
import * as connectionStrategies from '../module/connectionstrategies/index.mjs';
import * as routers from '../module/routers/index.mjs';
import * as anchors from '../module/anchors/index.mjs';
import * as linkAnchors from '../module/linkAnchors/index.mjs';
import * as dia from '../module/dia/index.mjs';
import * as linkTools from '../module/linkTools/index.mjs';
import * as mvc from '../module/mvc/index.mjs';
import { Port } from '../module/layout/port.js'
import { PortLabel } from '../module/layout/portLabel.js'
import * as basic from '../module/shapes/basic.js';
import * as standard from '../module/shapes/standard.js';

const shapes = { basic, standard };
const layout = { PortLabel, Port };
const format = {};
const ui = {};

export * from '../module/config.mjs';
export {
    anchors,
    linkAnchors,
    connectionPoints,
    connectionStrategies,
    connectors,
    dia,
    format,
    highlighters,
    layout,
    mvc,
    routers,
    ui,
    shapes,
    linkTools
}
