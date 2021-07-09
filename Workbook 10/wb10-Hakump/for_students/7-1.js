/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {GrSphere,GrCube} from "../libs/CS559-Framework/SimpleObjects.js";

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

function spinY(obj, speed = 1) {
  obj.tick = function(delta, timeOfDay) {
    obj.objects.forEach(obj => {obj.rotateY(((speed * delta) / 1000) * Math.PI); obj.positionY = Math.sin(((speed * delta) / 1000) * Math.PI)*2 + 2});
  };
  return obj;
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });
  let texture = cubeTextureHelp("../");
  world.scene.background = texture;

  let cubecam = new T.CubeCamera(1,1000,128);
  cubecam.position.y = 2;

  let materials = new T.MeshStandardMaterial({metalness:1, roughness:0.1});
  materials.envMap = cubecam.renderTarget.texture;

  world.add(new GrCube({x:1,y:4,z:1,size:1,material:materials}));

  let sphereG = new T.SphereGeometry(1,32,32);
  let matG = new T.MeshStandardMaterial({color: "blue", metalness: 1, roughness:0.5});
  let sp = new T.Mesh(sphereG,matG);
  sp.translateX(3);
  let gr = new T.Group();gr.add(sp);

  let temp = new GrObject("cube",gr);
  spinY(temp);
  world.add(temp);

  world.go({
    predraw:function () {
      let prev = world.scene.children;
      world.scene.children.filter(
          t=>!(t.material == materials)
      );
      cubecam.update(world.renderer,world.scene);
      world.scene.children = prev;
    }
  });
}
Helpers.onWindowOnload(test);
