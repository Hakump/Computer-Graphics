/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { OrbitControls } from "../libs/CS559-THREE/examples/jsm/controls/OrbitControls.js";
import { onWindowOnload } from "../libs/CS559-Libs/helpers.js";
import { GrCube } from "../libs/CS559-Framework/SimpleObjects.js";

function quadcopter() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(600, 400);
  document.body.appendChild(renderer.domElement);

  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera(
    40,
    renderer.domElement.width / renderer.domElement.height,
    1,
    1000
  );

  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 0, 0);

  // since we're animating, add OrbitControls
  let controls = new OrbitControls(camera, renderer.domElement);

  scene.add(new T.AmbientLight("white", 0.2));

  // two lights - both a little off white to give some contrast
  let dirLight1 = new T.DirectionalLight(0xf0e0d0, 1);
  dirLight1.position.set(1, 1, 0);
  scene.add(dirLight1);

  let dirLight2 = new T.DirectionalLight(0xd0e0f0, 1);
  dirLight2.position.set(-1, 1, -0.2);
  scene.add(dirLight2);

  // make a ground plane
  let groundBox = new T.BoxGeometry(10, 0.1, 10);
  let groundMesh = new T.Mesh(
    groundBox,
    new T.MeshStandardMaterial({ color: 0x88b888, roughness: 0.9 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  scene.add(groundMesh);

  // this is the part the student should change
  //** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/
  //let tempGeom = new T.TorusGeometry();
  let tempMaterial = new T.MeshStandardMaterial({ color: "red" });
  //let tempMesh = new T.Mesh(tempGeom, tempMaterial);
  //scene.add(tempMesh);
  //tempMesh.scale.set(0.5, 0.5, 0.5);
  //tempMesh.position.y = 2;

  function createRaidar(x,y,z){
    let points = [];
    for ( let i = 0; i < 10; i ++ ) {
      points.push( new T.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
    }
    let geometry = new T.LatheGeometry(points);
    let material = new T.MeshBasicMaterial( { color: "#fff8fc" } );
    material.side = T.DoubleSide;
    let lathe = new T.Mesh(geometry, material);
    lathe.scale.set(0.03,0.02,0.03);

    let rodG = new T.CylinderGeometry(0.01,0.01,0.2,32);
    let rod = new T.Mesh(rodG,material);
    rod.add(lathe);
    rod.position.set(x,y+0.6,z);
    lathe.position.set(0,0.2,0);

    let cubeG = new T.BoxGeometry(1,1,1,32);
    let base = new T.Mesh(cubeG, material);
    base.scale.set(0.5,0.7, 0.5);
    base.position.set(x,y,z);

    // lathe.position.set(x, y + 0.5, z);
    // lathe.add(rod);

    let group = new T.Group();
    group.add(base);
    group.add(rod);
    scene.add(group);

    return rod;
  }
  let rad = createRaidar(-1, 0.35 , -1);
  let rad2 = createRaidar(3,0.35,4)

  function createCopter(x,y,z){
    let props = [];
    // create a body
    let bodyG = new T.SphereGeometry(1,32,32);
    let material = new T.MeshStandardMaterial({color:"red"});
    let material2 = new T.MeshStandardMaterial({color:"blue"});
    let material3 = new T.MeshStandardMaterial({color:"white"});
    let body = new T.Mesh(bodyG,material);
    body.scale.set(1,0.3,1);
    // create arm
    let arms = [];
    let armG = new T.CylinderGeometry(0.2,0.2,4,32,32);
    let arm1 = new T.Mesh(armG,material2); arm1.scale.set(1,1,1);
    let arm2 = new T.Mesh(armG,material2); arm2.scale.set(1,1,1);
    arms.push(arm1,arm2);
    body.add(arm1,arm2);
    arm1.position.set(0,0,0);
    arm2.position.set(0,0,0);
    arm1.rotateX(Math.PI/2); arm1.rotateZ(Math.PI/6);
    arm2.rotateX(Math.PI/2); arm2.rotateZ(-Math.PI/6);
    // for each arm, create prop
    let propG = new T.BoxGeometry(0.1,1.2,0.02);

    for (let i = 0; i < 2; i ++){
      for (let j = 0; j < 2; j++) {
        let prop1 = new T.Mesh(propG,material3);
        let prop2 = new T.Mesh(propG,material3);
        arms[i].add(prop1, prop2);
        prop1.position.set(0,1.8*(-1)**j,-0.3);
        prop2.position.set(0,1.8*(-1)**j,-0.3); prop2.rotateZ(Math.PI/2);
        props.push(prop1,prop2);
      }
    }

    body.position.set(x,y,z);
    body.scale.set(0.5,0.15,0.5);
    scene.add(body);
    return [body,props]
  }

  let copters1 = createCopter(0,4,0);

  function simpleCopter(x,y,z){
    let bodyG = new T.SphereGeometry(1,32,32);
    let material = new T.MeshStandardMaterial({color:"red"});
    let material2 = new T.MeshStandardMaterial({color:"blue"});
    let material3 = new T.MeshStandardMaterial({color:"white"});
    let body = new T.Mesh(bodyG, material);
    let rodG = new T.CylinderGeometry(0.05,0.05,1,32);
    let rod = new T.Mesh(rodG,material3);
    rod.position.set(0,1.15,0);

    let props = [];
    let propG = new T.BoxGeometry(0.1,2.2,0.02);

    let prop1 = new T.Mesh(propG,material2);
    let prop2 = new T.Mesh(propG,material2);
    body.add(prop1, prop2);
    prop1.position.set(0,1.2,0); prop1.rotateX(Math.PI/2);
    prop2.position.set(0,1.2,0); prop2.rotateX(Math.PI/2); prop2.rotateZ(Math.PI/2);
    props.push(prop1,prop2);
    body.position.set(x,y,z);
    body.scale.set(0.35,0.7,0.35);

    scene.add(body);
    return [body, props]
  }

  let simpleC1 = simpleCopter(0,5.5,0);

  function animateLoop() {
    //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
    // move in a circle
    let theta = performance.now() / 1000;
    let x = 3 * Math.cos(theta);
    let z = 3 * Math.sin(theta);

    let copter1 = copters1[0];
    let arr1 = copters1[1];
    copter1.position.x = x; copter1.position.z = z;
    copter1.rotation.y = -Math.atan2(Math.sin(theta),Math.cos(theta));

    let simple1 = simpleC1[0];
    let propC1 = simpleC1[1];
    simple1.position.x  = -3.5 * Math.cos(theta) + 1; simple1.position.z = -5.5 * Math.sin(theta);
    simple1.position.y = 2.5 + Math.sin(theta)/2;

    let temp = 0.1;
    for (let i = 0; i < arr1.length; ) {
      for (let j = 0; j < 4; j++, i++) {
        arr1[i].rotateZ(temp);
      }
      temp*=-1;
    }

    propC1.forEach(function (c) {
      c.rotateZ(0.1)
    });

    rad.lookAt(x, copter1.position.y,z);
    rad.rotateX(Math.PI/2);

    rad2.lookAt(simple1.position.x, simple1.position.y, simple1.position.z);
    rad2.rotateX(Math.PI/2);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animateLoop);
  }
  animateLoop();

}
onWindowOnload(quadcopter);
