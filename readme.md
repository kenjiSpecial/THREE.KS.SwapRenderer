THREE.KS.SwapRenderer.js
===

Swaprenderer for my projects with three.js

## Install

```
npm install kenjiSpecial/THREE.KS.SwapRenderer -S
```

## Usage

```javascript
import SwapRenderer from 'three.ks.swaprenderer';

let swappRenderer = new SwapRenderer({
        renderer : renderer,
        wid : window.innerWidth,
        hig : window.innerHeight });

functin loop(){
    renderer.render(scene, camera, swappRenderer.writeBuffer);
    swappRenderer.swap();
}
```
