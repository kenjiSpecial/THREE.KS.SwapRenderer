'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _threeKs = require('three.ks.customutils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// let THREE = require('three');

var THREE = require('three');

var SwapRenderer = function () {
    function SwapRenderer(opts) {
        _classCallCheck(this, SwapRenderer);

        opts = opts || {};
        this.renderer = opts.renderer;
        if (!this.renderer) console.error('renderer is not set, set renderer {rendereer : renderer}');

        this.wid = opts.wid || 1;
        this.hig = opts.hig || 1;

        this.s2 = this.hig * this.wid;

        this.front = (0, _threeKs.createRenderTarget)(this.renderer);
        this.back = this.front.clone();

        this.readBuffer = this.front;
        this.writeBuffer = this.back;

        this.setSize(this.wid, this.hig);
    }

    _createClass(SwapRenderer, [{
        key: 'setDefaultEnvironemnet',
        value: function setDefaultEnvironemnet() {
            var sceneName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scene';
            var cameraName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ortho';

            this[sceneName] = new THREE.Scene();
            this[cameraName] = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, 0.5, 0, 10);
        }
    }, {
        key: 'swap',
        value: function swap() {
            if (this.readBuffer == this.front) {
                this.readBuffer = this.back;
                this.writeBuffer = this.front;
            } else {
                this.readBuffer = this.front;
                this.writeBuffer = this.back;
            }
        }
    }, {
        key: 'setSize',
        value: function setSize(wid, hig) {
            this.wid = wid;
            this.hig = hig;

            this.front.setSize(this.wid, this.hig);
            this.back.setSize(this.wid, this.hig);
        }
    }]);

    return SwapRenderer;
}();

exports.default = SwapRenderer;