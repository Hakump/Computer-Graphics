/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {GrSphere} from "../libs/CS559-Framework/SimpleObjects.js";

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
  let world = new GrWorld({});
  let texture = cubeTextureHelp("../");
  world.scene.background = texture;

  let cubecam = new T.CubeCamera(1,1000,128);
  cubecam.position.y = 2;

  let materials = new T.MeshStandardMaterial({envMap:texture, metalness:.8, roughness:0.1});
  materials.envMap = cubecam.renderTarget.texture;
  world.add(new GrSphere({x: 1, y: 2, material:materials, size:1}));
  world.go({
    predraw: function () {
      let olds = world.scene.children;
      world.scene.children.filter(
          s => !(s.material == materials)
      );
      cubecam.update(world.renderer,world.scene);
      world.scene.children = olds;
    }
  });
}
Helpers.onWindowOnload(test);
