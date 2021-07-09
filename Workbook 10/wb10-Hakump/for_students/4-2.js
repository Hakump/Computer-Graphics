/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js"

function cubeTextureHelp(name,ext=".png", swapBottomFront=false) {
  return new T.CubeTextureLoader().load([
    name + "px"  +ext,
    name + "nx"   +ext,
    name + "py"    +ext,
    name + (swapBottomFront ? "nz"  : "ny") +ext,
    name + "pz"   +ext,
    name + (swapBottomFront ? "ny" : "nz")  +ext
  ]);
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({where: parentOfCanvas, groundplane:false, lookfrom:new T.Vector3(0, 0, -100), far:20000});
  world.scene.background = cubeTextureHelp("../");
  world.add(new SimpleObjects.GrCube({x:-2,y:0.5,z:-1,size:10}));
  world.go();
}
Helpers.onWindowOnload(test);
