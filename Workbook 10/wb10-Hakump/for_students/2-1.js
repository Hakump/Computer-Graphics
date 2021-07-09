/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

class simpleObject extends GrObject{
  constructor(props) {
    let spG = new T.SphereGeometry(1);
    let matP = {};
    let check   = new T.TextureLoader().load("../4x4.png");
    let checkbw = new T.TextureLoader().load("../4x4bw.png");

    if (props.color){
      matP.color = props.color;
    }
    if (props.metal){
      matP.metalnessMap = checkbw;
      matP.metalness = 1;
      matP.roughness = 0.5;
    }
    if (props.emis){
      matP.emissiveMap = check;
      matP.emissive = "#665f63"
    }
    if (props.alpha){
      matP.alphaMap = checkbw;
    }
    let material = new T.MeshStandardMaterial(matP);
    let mesh = new T.Mesh(spG,material);
    super("Sphere", mesh);
  }
}


function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });
  world.add(new simpleObject({metal: true, emis: true, color:"red"}));

  world.go();
}
Helpers.onWindowOnload(test);
