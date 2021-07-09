/**
 * 9-1.js - a simple JavaScript file that gets loaded with
 * page 9 of Workbook 7 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as T from "../libs/THREE/build/three.module.js";
import { OrbitControls } from "../libs/THREE/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "../libs/THREE/examples/jsm/loaders/OBJLoader.js";

window.onload = function() {
  /** @type{T.Scene} */
  let scene = new T.Scene();
  /** @type{number} */
  let wid = 670; // window.innerWidth;
  /** @type{number} */
  let ht = 500; // window.innerHeight;
  /** @type{T.PerspectiveCamera} */
  let main_camera = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  main_camera.position.set(0, 4, 6);
  main_camera.rotation.set(-0.5, 0, 0);
  let active_camera = main_camera;
  /** @type{T.WebGLRenderer} */
  let renderer = new T.WebGLRenderer();
  renderer.setSize(wid, ht);
  renderer.shadowMap.enabled = true;

  document.getElementById("museum_area").appendChild(renderer.domElement);
  setupButtons();
  setupBasicScene();

  // added!!!
  let position_float = 0;
  function floating(obj, pos){
    obj.position.y = pos + 0.1*Math.sin(0.01*position_float++);
  }

  // Here, we add a basic, simple first object to the museum.
  /**@type{T.Material} */
  let material = new T.MeshPhongMaterial({
    color: "#00aa00",
    shininess: 15,
    specular: "#00ff00"
  });
  /**@type{T.Geometry} */
  let geometry = new T.BoxGeometry(0.5, 0.5, 0.5);
  /**@type{T.Mesh} */
  let cube = new T.Mesh(geometry, material);
  cube.position.set(2, 1.35, 2);
  cube.rotation.set(Math.PI / 4, 0, Math.PI / 4);
  cube.castShadow = true;

  // TODO: You need to create three more objects, and place them on pedestals.
  // First one
  let loader = new OBJLoader();
  loader.load("../for_students/objects/astronaut.obj", function(astronaut) {
    astronaut.position.set(-2, 1.8, 2);
    astronaut.scale.set(0.15, 0.15, 0.15);
    scene.add(astronaut);
    astronaut.castShadow = true;

    function animate() {
      astronaut.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
      floating(astronaut,1.8);
      requestAnimationFrame(animate);
    }
    animate();

  });
  // Second one
  loader.load("../for_students/objects/suzanne.obj", function(suzanne) {
    suzanne.position.set(-2, 1.65, -2);
    suzanne.scale.set(0.05, 0.05, 0.05);
    scene.add(suzanne);
    suzanne.castShadow = true;

    function animate() {
      suzanne.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
      floating(suzanne,1.65);
      requestAnimationFrame(animate);
    }
    animate();

  });
  // Third one
  loader.load("../for_students/objects/teapot.obj", function(suzanne) {
    suzanne.position.set(2, 1.55, -2);
    suzanne.scale.set(0.02, 0.02, 0.02);
    scene.add(suzanne);
    suzanne.castShadow = true;

    function animate() {
      suzanne.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
      floating(suzanne,1.55);
      requestAnimationFrame(animate);
    }
    animate();

  });

  /**@type{T.SpotLight} */
  let spotlight_1 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_1.angle = Math.PI / 16;
  spotlight_1.position.set(2, 5, 2);
  spotlight_1.target = cube;
  spotlight_1.castShadow = true;
  scene.add(spotlight_1);

  // TODO: You need to place the lights.
  let spotlight_2 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_2.angle = Math.PI / 16;
  spotlight_2.position.set(-2, 5, 2);
  spotlight_2.castShadow = true;
  let cube1 = cube.clone(); cube1.scale.set(0.01,0.01,0.01);
  cube1.position.set(-2, 1.35, 2);
  scene.add(cube1);
  spotlight_2.target = cube1;
  scene.add(spotlight_2);

  let spotlight_3 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_3.angle = Math.PI / 16;
  spotlight_3.position.set(-2, 5, -2);
  spotlight_3.castShadow = true;
  let cube2 = cube1.clone();
  cube2.position.set(-2, 1.35, -2);
  scene.add(cube2);
  spotlight_3.target = cube2;
  scene.add(spotlight_3);

  let spotlight_4 = new T.SpotLight(0xaaaaff, 0.5);
  spotlight_4.angle = Math.PI / 16;
  spotlight_4.position.set(2, 5, -2);
  spotlight_4.castShadow = true;
  let cube3 = cube1.clone();
  cube3.position.set(2, 1.55, -2);
  scene.add(cube3);
  spotlight_4.target = cube3;
  scene.add(spotlight_4);

  // TODO: You need to place these cameras.
  let camera_1 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_1.position.set(2, 2.2, 3.8);
  camera_1.rotation.set(-0.4, 0, 0);

  let camera_2 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_2.position.set(-2, 2.2, 3.4);
  camera_2.rotation.set(-0.5, 0, 0);

  let camera_3 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_3.position.set(-2, 2.2, -0.3);
  camera_3.rotation.set(-0.25, 0, 0);

  let camera_4 = new T.PerspectiveCamera(60, wid / ht, 1, 100);
  camera_4.position.set(2, 2.2, -0.3);
  camera_4.rotation.set(-0.25, 0, 0);

  scene.add(cube);

  // finally, draw the scene. Also, add animation.
  renderer.render(scene, main_camera);
  function animate() {
    cube.rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.005);
    renderer.render(scene, active_camera);
    requestAnimationFrame(animate);
  }
  animate();

  // Simple wrapper function for code to set up the basic scene
  // Specifically, sets up the stuff students don't need to use directly.
  function setupBasicScene() {
    // make a ground plane.
    let geometry1 = new T.BoxGeometry(10, 0.1, 10);
    let material1 = new T.MeshStandardMaterial({
      color: "#dddddd",
      metalness: 0.2,
      roughness: 0.8
    });
    /**@type{T.Mesh} */
    let ground = new T.Mesh(geometry1, material1);
    ground.position.set(0, -1, 0);
    scene.add(ground);

    let locs = [-2, 2];
    /**@type{T.Geometry} */
    let geometry2 = new T.CylinderGeometry(0.5, 0.75, 2, 16, 8);
    /**@type{T.Material} */
    let material2 = new T.MeshPhongMaterial({
      color: "#888888",
      shininess: 50
    });
    locs.forEach(function(x_loc) {
      locs.forEach(function(z_loc) {
        /**@type{T.Mesh} */
        let object = new T.Mesh(geometry2, material2);
        object.position.x = x_loc;
        object.position.z = z_loc;
        object.position.y = 0;
        object.receiveShadow = true;

        scene.add(object);
      });
    });

    /**@type{T.AmbientLight} */
    let amb_light = new T.AmbientLight(0xffffff, 0.2);
    scene.add(amb_light);
  }

  function setupButtons() {
    document.getElementById("main_cam").onclick = function() {
      active_camera = main_camera;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_1").onclick = function() {
      active_camera = camera_1;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_2").onclick = function() {
      active_camera = camera_2;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_3").onclick = function() {
      active_camera = camera_3;
      renderer.render(scene, active_camera);
    };
    document.getElementById("cam_4").onclick = function() {
      active_camera = camera_4;
      renderer.render(scene, active_camera);
    };
  }
};
