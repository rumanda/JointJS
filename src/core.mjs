import * as connectors from './connectors/index.mjs';
import * as highlighters from './highlighters/index.mjs';
import * as connectionPoints from './connectionPoints/index.mjs';
import * as connectionStrategies from './connectionStrategies/index.mjs';
import * as routers from './routers/index.mjs';
import * as anchors from './anchors/index.mjs';
import * as linkAnchors from './linkAnchors/index.mjs';
import * as dia from './dia/index.mjs';
import * as linkTools from './linkTools/index.mjs';
import * as util from './util/index.mjs';
import * as mvc from './mvc/index.mjs';
import * as g from './g/index.mjs';
import * as config from './config/index.mjs';
import V from './Vectorizer.mjs';
import * as Port from './layout/ports/port.mjs'
import * as PortLabel from './layout/ports/portLabel.mjs'

export const version = 'VERSION';
export const Vectorizer = V;
export const layout = { PortLabel, Port };
export { env } from './env/index.mjs'
export { setTheme } from './util/util.setTheme.mjs';
export {
    config,
    anchors,
    linkAnchors,
    connectionPoints,
    connectionStrategies,
    connectors,
    dia,
    highlighters,
    mvc,
    routers,
    util,
    linkTools,
    V,
    g
}
