/**
 * 8-1.js - a simple JavaScript file that gets loaded with
 * page 8 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";

window.onload = function() {
  let position = [];


  let renderer = new T.WebGLRenderer();
  renderer.setSize(500, 500);
  document.getElementById("div1").appendChild(renderer.domElement);

  let scene = new T.Scene();
  let camera = new T.PerspectiveCamera();
  camera.position.z = 10;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 3, 0);
  let controls = new OrbitControls(camera, renderer.domElement);

  // make a ground plane
  let groundBox = new T.BoxGeometry(12, 0.1, 12);
  let groundMesh = new T.Mesh(
      groundBox,
      new T.MeshStandardMaterial({ color: 0x888888 })
  );
  // put the top of the box at the ground level (0)
  groundMesh.position.y = -0.05;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);


  let geometry = new T.SphereGeometry(1, 128, 128);
  let sphere = new T.Mesh(geometry, new T.MeshStandardMaterial({color: "white"}));
  sphere.scale.set(1.1,1,1);
  sphere.position.set(1,1,1);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add( sphere );

  let sphere1 = new T.Mesh(geometry, new T.MeshStandardMaterial({color: "white"}));
  sphere1.scale.set(0.88,0.8,0.8);
  sphere1.position.set(1,2.6,1);
  sphere1.castShadow = true;
  sphere1.receiveShadow = true;
  scene.add( sphere1 );

  let sphere2 = new T.Mesh(geometry, new T.MeshStandardMaterial({color: "white"}));
  sphere2.scale.set(0.66,0.6,0.6);
  sphere2.position.set(1,4,1);
  sphere2.castShadow = true;
  scene.add(sphere2);

  let snow_g = geometry.clone(); snow_g.scale(0.06,0.06,0.06);
  let snow_ball = new T.Mesh(snow_g, new T.MeshStandardMaterial({color: "white"}));

  for (let i = 0; i < 1000; i++) {
    let temp = snow_ball.clone();
    temp.position.set(Math.random()*20-10,Math.random()*20,Math.random()*20-10);
    position.push(temp);
    scene.add(temp);
  }

  let spot_w = new T.SpotLight("white", 1.1);
  spot_w.position.set(3, 8, 8);
  // spot_w.castShadow = true;
  scene.add(spot_w);
  
  function draw_face() {
    let geometry = new T.ConeGeometry( 0.1, 0.2, 32 );
    let material = new T.MeshBasicMaterial( {color: 0xffff00} );
    let cone = new T.Mesh( geometry, material );
    cone.position.set(1,4,1.66);
    cone.rotateX(Math.PI/2);
    cone.rotateY(Math.PI/2);
    scene.add(cone);

    //
    let y = 0.25;
    let mouse_g = new T.SphereGeometry(0.05, 32, 32);
    let mouse_t = new T.Mesh(mouse_g, new T.MeshStandardMaterial({color: "black"}));
    mouse_t.scale.set(1,1,0.3);
    for (let i = 0; i < 10; i++) {
      let mouse_i = mouse_t.clone();
      let z = 0.66*Math.cos(-Math.PI/10 + i*Math.PI/40)*Math.cos(Math.PI/6);
      let x = 0.66*Math.sin(-Math.PI/10 + i*Math.PI/40)*Math.cos(Math.PI/6);
      mouse_i.position.set(1+x,4-y,0.96+z);
      scene.add(mouse_i);
    }
  }
  function draw_eyes(){
    let eye_g = new T.SphereGeometry(0.1, 32, 32);
    let eye1 = new T.Mesh(eye_g, new T.MeshStandardMaterial({color: "black"}));
    eye1.scale.set(1,1,0.2);
    let eye2 = new T.Mesh(eye_g, new T.MeshStandardMaterial({color: "black"}));
    eye2.scale.set(1,1,0.2);

    let z = 0.66*Math.cos(Math.PI/10)*Math.cos(Math.PI/6);
    let x = 0.66*Math.sin(Math.PI/10)*Math.cos(Math.PI/6);
    let y = 0.33;

    eye1.position.set(1-x, 4+y, 1+z);
    eye2.position.set(1+x, 4+y, 1+z);
    scene.add(eye1,eye2);
  }
  function draw_arms() {
    let arm = new T.CylinderGeometry(0.1, 0.07, 1,32);
    let arm1 = new T.Mesh(arm, new T.MeshStandardMaterial({color: "#a84e0b"}));
    let arm2 = arm1.clone();
    arm1.position.set(2.15,3.2,1);
    arm1.rotateZ(3*Math.PI/4);
    arm1.rotateY(-Math.PI/2);
    scene.add(arm1);

    arm2.position.set(0,3.0,1);
    arm2.rotateZ(-3*Math.PI/4);
    arm2.rotateY(Math.PI/2);
    scene.add(arm2);
  }
  function draw_hat() {
    let hat_g = new T.CylinderGeometry(0.33,0.33,0.5,32);
    let hat = new T.Mesh(hat_g, new T.MeshStandardMaterial({color: "black"}));
    hat.position.set(1,4+Math.cos(Math.PI/12)*0.6*1.02,1);
    scene.add(hat);
  }

  draw_face();
  draw_eyes();
  draw_hat();
  draw_arms();

  // student does the rest.

  function draw() {
    renderer.render(scene, camera);
    let dx = Math.random()*0.5 -1;
    let dy = -Math.random()*0.5 - 0.3;
    let dz = -Math.random()*0.2 - 0.3;
    position.forEach(function (pos) {
      let x = pos.position.x;
      let y = pos.position.y;
      let z = pos.position.z;
      x += dx; y +=dy; z += dz;
      if (x < -20 || x > 20) x = Math.random()*20-10;
      if (y < 0 ) y = Math.random()*20;
      if (z < -20 || z > 20) z = Math.random()*20-10;
      pos.position.set(x,y,z);
    });
    window.requestAnimationFrame(draw);
  }
  draw();
};
