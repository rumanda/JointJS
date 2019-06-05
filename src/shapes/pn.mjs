import { Generic } from './basic.mjs';
import { ElementView } from '../dia/ElementView.mjs';
import { Link as diaLink } from '../dia/Link.mjs';

export const Place = Generic.define('pn.Place', {
    size: { width: 50, height: 50 },
    attrs: {
        '.root': {
            r: 25,
            fill: '#ffffff',
            stroke: '#000000',
            transform: 'translate(25, 25)'
        },
        '.label': {
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-y': -20,
            ref: '.root',
            fill: '#000000',
            'font-size': 12
        },
        '.tokens > circle': {
            fill: '#000000',
            r: 5
        },
        '.tokens.one > circle': { transform: 'translate(25, 25)' },

        '.tokens.two > circle:nth-child(1)': { transform: 'translate(19, 25)' },
        '.tokens.two > circle:nth-child(2)': { transform: 'translate(31, 25)' },

        '.tokens.three > circle:nth-child(1)': { transform: 'translate(18, 29)' },
        '.tokens.three > circle:nth-child(2)': { transform: 'translate(25, 19)' },
        '.tokens.three > circle:nth-child(3)': { transform: 'translate(32, 29)' },

        '.tokens.alot > text': {
            transform: 'translate(25, 18)',
            'text-anchor': 'middle',
            fill: '#000000'
        }
    }
}, {
    markup: '<g class="rotatable"><g class="scalable"><circle class="root"/><g class="tokens" /></g><text class="label"/></g>',
});

export const PlaceView = ElementView.extend({

    initialize: function() {

        ElementView.prototype.initialize.apply(this, arguments);

        this.model.on('change:tokens', function() {

            this.renderTokens();
            this.update();

        }, this);
    },

    render: function() {

        ElementView.prototype.render.apply(this, arguments);

        this.renderTokens();
        this.update();
    },

    renderTokens: function() {

        var $tokens = this.$('.tokens').empty();
        $tokens[0].className.baseVal = 'tokens';

        var tokens = this.model.get('tokens');

        if (!tokens) return;

        switch (tokens) {

            case 1:
                $tokens[0].className.baseVal += ' one';
                $tokens.append(V('<circle/>').node);
                break;

            case 2:
                $tokens[0].className.baseVal += ' two';
                $tokens.append(V('<circle/>').node, V('<circle/>').node);
                break;

            case 3:
                $tokens[0].className.baseVal += ' three';
                $tokens.append(V('<circle/>').node, V('<circle/>').node, V('<circle/>').node);
                break;

            default:
                $tokens[0].className.baseVal += ' alot';
                $tokens.append(V('<text/>').text(tokens + '').node);
                break;
        }
    }
});

export const Transition = Generic.define('pn.Transition', {
    size: { width: 12, height: 50 },
    attrs: {
        'rect': {
            width: 12,
            height: 50,
            fill: '#000000',
            stroke: '#000000'
        },
        '.label': {
            'text-anchor': 'middle',
            'ref-x': .5,
            'ref-y': -20,
            ref: 'rect',
            fill: '#000000',
            'font-size': 12
        }
    }
}, {
    markup: '<g class="rotatable"><g class="scalable"><rect class="root"/></g></g><text class="label"/>',
});

export const Link = diaLink.define('pn.Link', {
    attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
});