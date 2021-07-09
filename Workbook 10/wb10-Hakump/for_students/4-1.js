/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js"

class outbox extends GrObject{
  constructor() {
    let px = new T.TextureLoader().load("../px.png");
    let material = [
        new T.MeshStandardMaterial({map: px,side:T.DoubleSide}),
        new T.MeshStandardMaterial({map: new T.TextureLoader().load("../nx.png"),side:T.DoubleSide}),
        new T.MeshStandardMaterial({map: new T.TextureLoader().load("../py.png"),side:T.DoubleSide}),
        new T.MeshStandardMaterial({map: new T.TextureLoader().load("../ny.png"),side:T.DoubleSide}),
        new T.MeshStandardMaterial({map: new T.TextureLoader().load("../pz.png"),side:T.DoubleSide}),
        new T.MeshStandardMaterial({map: new T.TextureLoader().load("../nz.png"),side:T.DoubleSide})
    ];
    let box = new T.Mesh(new T.BoxGeometry(1000,1000,1000,1,1,1),material);
    box.position.set(0,0,0);
    super("Scene",box);
  }
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas, groundplane:false });
  world.add(new SimpleObjects.GrCube({x:-2,y:0.5,z:-1,size:1}));
  world.add(new outbox());
  world.go();
}
Helpers.onWindowOnload(test);
