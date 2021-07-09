/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";

// define a class of Dice here - it should be a subclass of GrObject
let length = 1; let sub = 1/3;
class dice extends GrObject{
  constructor(name) {
    let geom = new T.Geometry();
    geom.faceVertexUvs = [[]];
    // counter clock bottom
    geom.vertices.push(new T.Vector3(0,0,0));
    geom.vertices.push(new T.Vector3(0,0,length));
    geom.vertices.push(new T.Vector3(length,0,length));
    geom.vertices.push(new T.Vector3(length,0,0));
    // counter clock top
    geom.vertices.push(new T.Vector3(0,length,0));
    geom.vertices.push(new T.Vector3(0,length,length));
    geom.vertices.push(new T.Vector3(length,length,length));
    geom.vertices.push(new T.Vector3(length,length,0));

    // build list of face UVs
    function addFace(v1,v2,v3) {
      geom.faces.push(new T.Face3(v1,v2,v3));
      // faceVertexUVs.push( [vertexUVs[v1], vertexUVs[v2],vertexUVs[v3]]);
    }
    function addUV(v1,v2,v3){
      geom.faceVertexUvs[0].push([new T.Vector2(v1[0], v1[1]), new T.Vector2(v2[0], v2[1]),new T.Vector2(v3[0], v3[1])]);
    }

    addFace(1,0,3); addUV([sub,0],[sub,sub],[sub*2,sub]); //b
    addFace(1,3,2); addUV([sub,0],[sub*2,sub],[sub*2,0]);
    addFace(4,5,6); addUV([sub,2*sub],[sub,1],[2*sub,1]); //t
    addFace(4,6,7); addUV([sub,2*sub],[2*sub,1],[2*sub,2*sub]);
    addFace(4,0,1); addUV([0,sub],[0,2*sub],[sub,2*sub]); //l
    addFace(4,1,5); addUV([0,sub],[sub,2*sub],[sub,sub]);
    addFace(5,1,2); addUV([sub,sub],[sub,2*sub],[2*sub,2*sub]); // f
    addFace(5,2,6); addUV([sub,sub],[2*sub,2*sub],[sub*2,sub]);
    addFace(6,2,3); addUV([2*sub,sub],[2*sub,2*sub],[1,2*sub]); // r
    addFace(6,3,7); addUV([2*sub,sub],[1,2*sub],[1,sub]);
    addFace(7,3,0); addUV([2/3,0],[2/3,1/3],[1,1/3]); // ba
    addFace(7,0,4); addUV([2/3,0],[1,1/3],[1,0]);

    geom.computeFaceNormals();
    geom.uvsNeedUpdate = true;

    let tl = new T.TextureLoader().load("../images/dice_texture.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let mesh = new T.Mesh(geom, material);
    super(name,mesh);
  }
}

function shift(grobj, x) {
  grobj.objects[0].translateX(x);
  return grobj;
}

function test() {
  let world = new GrWorld();

  // put the two dice into the world Here
  // don't forget to orient them so they have different numbers facing up


  let tt = shift(new dice("one"), -3);
  world.add(tt);

  let t2 = new dice("two");
  t2.objects[0].rotateX(Math.PI/2);
  t2.objects[0].translateZ(-1);
  world.add(t2);

  world.go();
}
Helpers.onWindowOnload(test);
