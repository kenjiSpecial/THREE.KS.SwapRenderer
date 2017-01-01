// let THREE = require('three');

import {WebGLRenderTarget} from 'three'
import {createRenderTarget} from 'three.ks.customutils';

export default class SwapRenderer {
    constructor(opts) {
        this.renderer = opts.renderer;
        this.wid = opts.wid;
        this.hig = opts.hig;

        this.s2 = this.hig * this.wid;

        this.front = createRenderTarget(this.renderer);
        this.back = this.front.clone();

        this.readBuffer = this.front;
        this.writeBuffer = this.back;

        this.setSize( this.wid, this.hig );

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

