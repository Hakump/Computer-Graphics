/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as InputHelpers from "../libs/CS559-Libs/inputHelpers.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import * as SimpleObjects from "../libs/CS559-Framework/SimpleObjects.js"

class simpleBump extends GrObject{
  constructor(){
    let map = new T.TextureLoader().load("../egyptian_friz_2.png");
    let mat = new T.MeshStandardMaterial({color:"white",bumpMap:map,side:T.DoubleSide});
    let obj = new SimpleObjects.GrSquareSign({size:2,material:mat,x:2,y:1}).objects[0];
    obj.scale.set(1.5,0.2,1);
    super("bump", obj);
  }
}

class simpleNormal extends GrObject{
  constructor() {
    let geom = new T.Geometry();

    let normals = [];
    for (let i = 0; i < 8; i++) {
      geom.vertices.push(new T.Vector3(Math.cos(i*Math.PI/4+Math.PI/4)*2,0,Math.sin(i*Math.PI/4+Math.PI/4)*2));
      normals.push(new T.Vector3(Math.cos(i*Math.PI/4+Math.PI/4),0,Math.sin(i*Math.PI/4+Math.PI/4)));
      geom.vertices.push(new T.Vector3(Math.cos(i*Math.PI/4+Math.PI/4)*2,Math.sqrt(2)*2,Math.sin(i*Math.PI/4+Math.PI/4)*2));
      normals.push(new T.Vector3(Math.cos(i*Math.PI/4+Math.PI/4),0,Math.sin(i*Math.PI/4+Math.PI/4)));
    }

    function faces(a,b,c) {
      let f = new T.Face3(a,b,c);
      f.vertexNormals[0] = normals[a];
      f.vertexNormals[1] = normals[b];
      f.vertexNormals[2] = normals[c];
      return f;
    }
    for (let i = 0; i < 8; i++) {
      let j = (i+1)%8;
      geom.faces.push(faces(i*2, i*2+1, j*2));
      geom.faces.push(faces(j*2,i*2+1,j*2+1));
    }
    let f1 = new T.Face3(1,3,5);
    f1.vertexNormals[0] = new T.Vector3(Math.cos(Math.PI/2),Math.sin(Math.PI/2),0);
    f1.vertexNormals[1] = new T.Vector3(0,Math.sin(Math.PI/2),-Math.cos(Math.PI/2));
    f1.vertexNormals[2] = new T.Vector3(-Math.cos(Math.PI/2),Math.sin(Math.PI/2),0);
    let f2 = new T.Face3(1,5,7);
    f2.vertexNormals[0] = new T.Vector3(Math.cos(Math.PI/2),Math.sin(Math.PI/2),0);
    f2.vertexNormals[1] = new T.Vector3(-Math.cos(Math.PI/2),Math.sin(Math.PI/2),0);
    f2.vertexNormals[2] = new T.Vector3(0,Math.sin(Math.PI/2),Math.cos(Math.PI/2));
    //geom.faces.push(f1,f2);
    //geom.computeFlatVertexNormals();
    let material = new T.MeshStandardMaterial({color:"#FFFFFF",side:T.DoubleSide});
    let mesh = new T.Mesh(geom, material);
    mesh.translateX(-4);
    mesh.scale.set(0.5,0.5,0.5);
    super("box",mesh);
  }
}

function test() {
  let parentOfCanvas = document.getElementById("div1");
  let world = new GrWorld({ where: parentOfCanvas });
  world.add(new simpleNormal());
  world.add(new simpleBump());
  world.go();
}
Helpers.onWindowOnload(test);
