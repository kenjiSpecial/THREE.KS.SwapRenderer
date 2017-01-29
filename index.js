// let THREE = require('three');

const THREE = require('three');
import {createRenderTarget} from 'three.ks.customutils';

export default class SwapRenderer {
    constructor(opts) {
        opts = opts || {};
        this.renderer = opts.renderer;
        if(!this.renderer)
            console.error('renderer is not set, set renderer {rendereer : renderer}');

        this.wid = opts.wid || 1;
        this.hig = opts.hig || 1;

        this.s2 = this.hig * this.wid;

        this.front = createRenderTarget(this.renderer);
        this.back = this.front.clone();

        this.readBuffer = this.front;
        this.writeBuffer = this.back;

        this.setSize( this.wid, this.hig );

    }
    makeDefaultEnvironment( sceneName = 'scene', cameraName = 'ortho'){
        this.makeScene(sceneName);
        this.makeOrthCamera(cameraName);
    }
    makeOrthCamera(name = 'ortho'){
        this[name] = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, 0.5, 0, 10);
        return this[name];
    }
    makeScene( sceneName ){
        if(!sceneName) {
            console.error('You forget to pass sceneName. I cannot make your scene.'); return;
        }
        this[sceneName] = new THREE.Scene();
        return this[sceneName];
    }
    swap(){
        if(this.readBuffer == this.front){
            this.readBuffer = this.back;
            this.writeBuffer = this.front;
        }else{
            this.readBuffer = this.front;
            this.writeBuffer = this.back;
        }
    }
    setSize(wid, hig){
        this.wid = wid;
        this.hig = hig;

        this.front.setSize(this.wid, this.hig);
        this.back.setSize(this.wid, this.hig);
    }
}

