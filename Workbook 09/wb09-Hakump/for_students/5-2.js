/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";

// define a class of Domino here - it should be a subclass of GrObject
let length = 0.5;
class domino extends GrObject{
  constructor(props) {
    let geom = new T.Geometry();
    geom.faceVertexUvs = [[]];
    // counter clock bottom1
    geom.vertices.push(new T.Vector3(0,0,0));
    geom.vertices.push(new T.Vector3(0,0,length));
    geom.vertices.push(new T.Vector3(length,0,length));
    geom.vertices.push(new T.Vector3(length,0,0));
    // counter clock top1
    geom.vertices.push(new T.Vector3(0,0.1,0));
    geom.vertices.push(new T.Vector3(0,0.1,length));
    geom.vertices.push(new T.Vector3(length-0.02,0.1,length));
    geom.vertices.push(new T.Vector3(length-0.02,0.1,0));
    // counter clock bottom2
    geom.vertices.push(new T.Vector3(length,0,0));
    geom.vertices.push(new T.Vector3(length,0,length));
    geom.vertices.push(new T.Vector3(1,0,length));
    geom.vertices.push(new T.Vector3(1,0,0));
    // counter clock top2
    geom.vertices.push(new T.Vector3(length+0.02,0.1,0));
    geom.vertices.push(new T.Vector3(length+0.02,0.1,length));
    geom.vertices.push(new T.Vector3(1,0.1,length));
    geom.vertices.push(new T.Vector3(1,0.1,0));
    //the two
    geom.vertices.push(new T.Vector3(length,0.1,0));
    geom.vertices.push(new T.Vector3(length,0.1,length));

    // middle
    let middle  = new T.Geometry();
    middle.faceVertexUvs = [[]];
    middle.vertices.push(new T.Vector3(length-0.02,0.1,0), new T.Vector3(length-0.02,0.1,length)
        , new T.Vector3(length+0.02,0.1,length),new T.Vector3(length+0.02,0.1,0));

    function addFace(v1,v2,v3) {
      geom.faces.push(new T.Face3(v1,v2,v3));
    }
    function addFace1(v1,v2,v3) {
      middle.faces.push(new T.Face3(v1,v2,v3));
    }
    function addUV(a,b,c,d,e,f){
      geom.faceVertexUvs[0].push([new T.Vector2(a,b), new T.Vector2(c,d),new T.Vector2(e,f)]);
    }

    addUV(1,0, 2/3,0,2/3,1/3); addUV(1,0, 2/3,0,2/3,1/3);
    addUV(1,0,2/3,1/3,1,1/3); addUV(1,0,2/3,1/3,1,1/3);
    addFace(4,5,6);addFace(12,13,14);
    addFace(4,6,7);addFace(12,14,15);
    addFace(1,0,3);addFace(9,8,12);
    addFace(1,3,2);addFace(9,11,10);
    addFace(4,0,1);
    addFace(4,1,5);
    addFace(5,1,2);addFace(17,9,10);
    addFace(5,2,17);addFace(17,10,14);
    addFace(16,3,0);addFace(14,10,11);
    addFace(16,0,4);addFace(14,11,15);
                              addFace(15,11,8);
                              addFace(15,8,16);

    addFace1(0,1,2);
    addFace1(0,2,3);

    geom.computeFaceNormals();
    geom.uvsNeedUpdate = true;

    let tl = new T.TextureLoader().load("../images/dice_texture.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let material1 = new T.MeshStandardMaterial({color:"black"});
    let mesh = new T.Mesh(geom, material);
    let mesh1 = new T.Mesh(middle, material1);
    let group = new T.Group();
    group.add(mesh,mesh1);
    super(props[0], group);
  }
}

class domino_dynamic extends GrObject{
  constructor(props) {
    let geom = new T.Geometry();
    let geom1 = new T.Geometry();
    geom.faceVertexUvs = [[]];
    geom1.faceVertexUvs = [[]];
    // counter clock bottom1
    geom.vertices.push(new T.Vector3(0,0,0));
    geom.vertices.push(new T.Vector3(0,0,length));
    geom.vertices.push(new T.Vector3(length,0,length));
    geom.vertices.push(new T.Vector3(length,0,0));
    // counter clock top1
    geom.vertices.push(new T.Vector3(0,0.1,0));
    geom.vertices.push(new T.Vector3(0,0.1,length));
    geom.vertices.push(new T.Vector3(length-0.02,0.1,length));
    geom.vertices.push(new T.Vector3(length-0.02,0.1,0));
    // counter clock bottom2
    geom.vertices.push(new T.Vector3(length,0,0));
    geom.vertices.push(new T.Vector3(length,0,length));
    geom.vertices.push(new T.Vector3(1,0,length));
    geom.vertices.push(new T.Vector3(1,0,0));
    // counter clock top2
    geom.vertices.push(new T.Vector3(length+0.02,0.1,0));
    geom.vertices.push(new T.Vector3(length+0.02,0.1,length));
    geom.vertices.push(new T.Vector3(1,0.1,length));
    geom.vertices.push(new T.Vector3(1,0.1,0));
    //the two
    geom.vertices.push(new T.Vector3(length,0.1,0));
    geom.vertices.push(new T.Vector3(length,0.1,length));

    // geom1
    geom1.vertices.push(new T.Vector3(length+0.02,0.1,0));
    geom1.vertices.push(new T.Vector3(length+0.02,0.1,length));
    geom1.vertices.push(new T.Vector3(1,0.1,length));
    geom1.vertices.push(new T.Vector3(1,0.1,0));

    // middle
    let middle  = new T.Geometry();
    middle.faceVertexUvs = [[]];
    middle.vertices.push(new T.Vector3(length-0.02,0.1,0), new T.Vector3(length-0.02,0.1,length)
        , new T.Vector3(length+0.02,0.1,length),new T.Vector3(length+0.02,0.1,0));

    function addFace(v1,v2,v3) {
      geom.faces.push(new T.Face3(v1,v2,v3));
    }
    function addFace1(v1,v2,v3) {
      middle.faces.push(new T.Face3(v1,v2,v3));
    }
    function addFace2(v1,v2,v3) {
      geom1.faces.push(new T.Face3(v1,v2,v3));
    }
    function addUV(a,b,c,d,e,f){
      geom.faceVertexUvs[0].push([new T.Vector2(a,b), new T.Vector2(c,d),new T.Vector2(e,f)]);
    }
    function addUV1(a,b,c,d,e,f){
      geom1.faceVertexUvs[0].push([new T.Vector2(a,b), new T.Vector2(c,d),new T.Vector2(e,f)]);
    }

    addUV(props[1][0],props[1][1], props[1][2],props[1][3],props[1][4],props[1][5]);
    addUV1(props[2][0],props[2][1], props[2][2],props[2][3],props[2][4],props[2][5]);
    addUV(props[1][0],props[1][1], props[1][4],props[1][5],props[1][6],props[1][7]);
    addUV1(props[2][0],props[2][1], props[2][4],props[2][5],props[2][6],props[2][7]);
    addFace(4,5,6); addFace2(0,1,2);
    addFace(4,6,7); addFace2(0,2,3);
    addFace(1,0,3);addFace(9,8,12);
    addFace(1,3,2);addFace(9,11,10);
    addFace(4,0,1);
    addFace(4,1,5);
    addFace(5,1,2);addFace(17,9,10);
    addFace(5,2,17);addFace(17,10,14);
    addFace(16,3,0);addFace(14,10,11);
    addFace(16,0,4);addFace(14,11,15);
    addFace(15,11,8);
    addFace(15,8,16);

    addFace1(0,1,2);
    addFace1(0,2,3);

    geom.computeFaceNormals();
    geom.uvsNeedUpdate = true;
    geom1.computeFaceNormals();
    geom1.uvsNeedUpdate = true;

    let tl = new T.TextureLoader().load("../images/dice_texture.png");
    let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
    let material1 = new T.MeshStandardMaterial({color:"black"});
    let mesh = new T.Mesh(geom, material);
    let mesh1 = new T.Mesh(middle, material1);
    let mesh2 = new T.Mesh(geom1, material);
    let group = new T.Group();
    group.add(mesh,mesh1,mesh2);
    super(props[0], group);
  }
}
function test() {
  let world = new GrWorld();

  // put the domino into the world Here
  // you can, of course, add more than 1
  let d1 = new domino(["one"]);
  world.add(d1);
  let d2 = new domino_dynamic(["two",[1,0, 2/3,0,2/3,1/3,1,1/3],[1/3,2/3,1/3,1,2/3,1,2/3,2/3]]);
  d2.objects[0].translateX(0.5);d2.objects[0].translateZ(0.5);
  world.add(d2);
  let d3 = new domino_dynamic(["three",[1/3,2/3,1/3,1,2/3,1,2/3,2/3],[1/3,0,1/3,1/3,2/3,1/3,2/3,0]]);
  d3.objects[0].translateX(1);d3.objects[0].translateZ(1);
  world.add(d3);
  let d4 = new domino_dynamic(["four",[1/3,0,1/3,1/3,2/3,1/3,2/3,0],[2/3,1/3,2/3,2/3,1,2/3,1,1/3]]);
  d4.objects[0].translateX(1.5);d4.objects[0].translateZ(1.5);
  world.add(d4);
  world.go();
}
Helpers.onWindowOnload(test);
