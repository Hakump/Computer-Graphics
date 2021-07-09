/**
 * 6-1.js - a simple JavaScript file that gets loaded with
 * page 6 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";

window.onload = function() {
  let renderer = new T.WebGLRenderer();
  renderer.setSize(500, 500);
  document.getElementById("div1").appendChild(renderer.domElement);

  let scene = new T.Scene();

  // make an array of materials
  // student should improve these materials
  let materials = [];

  // Give each material some parameters to create different appearances
  materials[0] = new T.MeshStandardMaterial();
  materials[0].color.set("#f48417");materials[0].emissive.set("#f4841720");materials[0].metalness = 0.6;materials[0].roughness = 0.1;

  materials[1] = new T.MeshStandardMaterial();
  materials[1].color.set("#a84e0b");materials[1].emissive.set("#a84e0b20");materials[1].metalness = 0.6;materials[1].roughness = 0.7;

  materials[2] = new T.MeshStandardMaterial();
  materials[2].color.set("#a84e0b");materials[2].emissive.set("#a84e0b20");materials[2].metalness = 1;materials[2].roughness = 0.1;

  materials[3] = new T.MeshStandardMaterial();
  materials[3].color.set("#d3ccd0");materials[3].emissive.set("#d3ccd060");materials[3].metalness = 0;materials[3].roughness = 0.5;

  materials[4] = new T.MeshStandardMaterial();
  materials[4].color.set("#d3ccd0");materials[4].emissive.set("#d3ccd060");materials[4].metalness = 0.33;materials[4].roughness = 0.5;

  materials[5] = new T.MeshStandardMaterial();
  materials[5].color.set("#d3ccd0");materials[5].emissive.set("#d3ccd060");materials[5].metalness = 0.66;materials[5].roughness = 0.5;

  materials[6] = new T.MeshStandardMaterial();
  materials[6].color.set("#72ec6f");materials[6].emissive.set("#72ec6f60");materials[6].metalness = 1;materials[6].roughness = 0.5;

  materials[7] = new T.MeshStandardMaterial();
  materials[7].color.set("#72ec6f");materials[7].emissive.set("#72ec6f60");materials[7].metalness = 1;materials[7].roughness = 0;

  materials[8] = new T.MeshStandardMaterial();
  materials[8].color.set("#72ec6f");materials[8].emissive.set("#72ec6f60");materials[8].metalness = 1;materials[8].roughness = 1;


  // make spheres to show off the materials
  let geometry = new T.SphereBufferGeometry(1, 20, 20);

  // array of meshes
  let spheres = [];
  for (let i = 0; i < 9; i++) {
    spheres[i] = new T.Mesh(geometry, materials[i]);
    spheres[i].position.set(((i % 3) - 1) * 3, 0, Math.floor(i / 3) * 3);
    scene.add(spheres[i]);
  }

  // make some lights
  let l1 = new T.DirectionalLight();
  let l2 = new T.PointLight();
  l2.position.set(10, 10, 10);
  scene.add(l1);
  scene.add(l2);

  // a camera
  let camera = new T.PerspectiveCamera();
  camera.position.set(0, 10, 10);
  camera.lookAt(0, -2, 0);

  renderer.render(scene, camera);
};
