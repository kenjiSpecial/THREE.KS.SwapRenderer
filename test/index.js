"use strict";

const TweenMax = require('gsap');
const glslify = require('glslify');
const THREE = require('three');
import SwapRenderer from '../index';

let camera, scene, renderer, mouse, stats, geometry, mat, mesh, clock;
let swappRenderer, isLoop;


(() => {
    document.body.style.margin = '0';

    init();
    isLoop = true;
    TweenMax.ticker.addEventListener("tick", loop);
})()

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);



    swappRenderer = new SwapRenderer({
        renderer : renderer,
        wid : window.innerWidth,
        hig : window.innerHeight
    });

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    geometry = new THREE.BoxGeometry(200, 200, 200);
    mat = new THREE.MeshBasicMaterial({
    });

    mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);


    clock = new THREE.Clock();

    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
}

let time = 0;
function loop() {
    var delta = clock.getDelta();
    time += delta;

    var val = Math.floor(50 * (1 + Math.cos(time * 10)));
    var color = new THREE.Color(`hsl(0, 30%, ${ val }%)`);
    renderer.setClearColor(new THREE.Color(color) );

    mesh.material.map = swappRenderer.readBuffer.texture
    renderer.render(scene, camera, swappRenderer.writeBuffer);
    swappRenderer.swap();

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;


    renderer.render(scene, camera);
}


function onDocumentMouseMove(event){
    event.preventDefault();
    if(!mouse) mouse = new THREE.Vector2();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener("resize", function(ev){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', function(ev){
    switch(ev.which){
        case 27:
            isLoop = !isLoop;
            if(isLoop) {
                clock.stop();
                TweenMax.ticker.addEventListener("tick", loop);
            }else{
                clock.start();
                TweenMax.ticker.removeEventListener("tick", loop);
            }
            break;
    }
});
