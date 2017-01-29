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
        key: 'makeDefaultEnvironment',
        value: function makeDefaultEnvironment() {
            var sceneName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'scene';
            var cameraName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ortho';

            this.makeScene(sceneName);
            this.makeOrthCamera(cameraName);
        }
    }, {
        key: 'makeOrthCamera',
        value: function makeOrthCamera() {
            var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ortho';

            this[name] = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 10);
            return this[name];
        }
    }, {
        key: 'makeMesh',
        value: function makeMesh(shader, uniforms) {
            var plane = new THREE.PlaneGeometry(1, 1);
            var mat = new THREE.RawShaderMaterial({
                uniforms: uniforms,
                vertexShader: _threeKs.orthoVertShader,
                fragmentShader: shader
            });
            var mesh = new THREE.Mesh(plane, mat);

            return mesh;
        }
    }, {
        key: 'makeScene',
        value: function makeScene(sceneName) {
            if (!sceneName) {
                console.error('You forget to pass sceneName. I cannot make your scene.');return;
            }
            this[sceneName] = new THREE.Scene();
            return this[sceneName];
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