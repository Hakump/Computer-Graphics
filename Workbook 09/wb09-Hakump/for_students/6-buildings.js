/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your buildings here - remember, they need to be imported
// into the "main" program
export class house1 extends GrObject{
    constructor(props) {
        let length = 1;
        let geom = new T.Geometry();
        let roof = new T.Geometry();

        roof.faceVertexUvs = [[]];

        geom.faceVertexUvs = [[]];

        geom.vertices.push(new T.Vector3(0,0,0));
        geom.vertices.push(new T.Vector3(0,0,length));
        geom.vertices.push(new T.Vector3(length,0,length));
        geom.vertices.push(new T.Vector3(length,0,0));
        geom.vertices.push(new T.Vector3(2*length,0,length));
        geom.vertices.push(new T.Vector3(2*length,0,0));

        geom.vertices.push(new T.Vector3(0,1,0));roof.vertices.push(new T.Vector3(0,1,0));
        geom.vertices.push(new T.Vector3(0,1,length));roof.vertices.push(new T.Vector3(0,1,length));
        geom.vertices.push(new T.Vector3(length,1,length));
        geom.vertices.push(new T.Vector3(length,1,0));
        geom.vertices.push(new T.Vector3(2*length,1,length)); roof.vertices.push(new T.Vector3(2*length,1,length));
        geom.vertices.push(new T.Vector3(2*length,1,0)); roof.vertices.push(new T.Vector3(2*length,1,0));

        function addUV1(a,b,c,d,e,f){
            roof.faceVertexUvs[0].push([new T.Vector2(a,b), new T.Vector2(c,d),new T.Vector2(e,f)]);
        }

        function addFace(v1,v2,v3) {
            geom.faces.push(new T.Face3(v1,v2,v3));
        }
        function addFace1(v1,v2,v3) {
            roof.faces.push(new T.Face3(v1,v2,v3));
        }
        function addUV(a,b,c,d,e,f){
            geom.faceVertexUvs[0].push([new T.Vector2(pos(a),pos1(b)), new T.Vector2(pos(c),pos1(d)),new T.Vector2(pos(e),pos1(f))]);
        }

        function pos(n){
            return n/2250
        }
        function pos1(n){
            return 1-n/500
        }

        addFace(7,1,2); addUV(850,0,850,500,1450,500); // f
        addFace(7,2,8); addUV(850,0,1450,500,1450,0);
        addFace(8,2,4); addUV(200,0,200,400,860,400);
        addFace(8,4,10); addUV(200,0,860,400,860,0);
        addFace(6,0,1); // l
        addFace(6,1,7);
        addFace(10,4,5); // r
        addFace(10,5,11);
        addFace(11,5,0); // b
        addFace(11,0,6);

        addFace1(0,1,2); addUV1(0,1,0,0,1,0);
        addFace1(0,2,3); addUV1(0,1,1,0,1,1); // top

        geom.computeFaceNormals();
        geom.uvsNeedUpdate = true;
        roof.computeFaceNormals();
        roof.uvsNeedUpdate = true;

        let tl = new T.TextureLoader().load("../images/house.png");
        let t2 = new T.TextureLoader().load("../images/UV_Grid_Sm.jpg");
        let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
        let material1 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
        let mesh = new T.Mesh(geom, material);
        let mesh1 = new T.Mesh(roof,material1);
        let gr = new T.Group();
        gr.add(mesh,mesh1);
        super(props[0], gr);
    }
}

export class house2 extends GrObject{
    constructor(props) {
        let length = 1;
        let geom = new T.Geometry();
        let roof = new T.Geometry();
        roof.faceVertexUvs = [[]];

        geom.faceVertexUvs = [[]];

        geom.vertices.push(new T.Vector3(0,0,0));
        geom.vertices.push(new T.Vector3(0,0,length));
        geom.vertices.push(new T.Vector3(length,0,length));
        geom.vertices.push(new T.Vector3(2*length,0,length));
        geom.vertices.push(new T.Vector3(2*length,0,0));

        geom.vertices.push(new T.Vector3(0,1,0));
        geom.vertices.push(new T.Vector3(0,1,length));
        geom.vertices.push(new T.Vector3(length,1,length));
        geom.vertices.push(new T.Vector3(2*length,1,length));
        geom.vertices.push(new T.Vector3(2*length,1,0));

        roof.vertices.push(new T.Vector3(0,1,0));
        roof.vertices.push(new T.Vector3(0,1,length));
        roof.vertices.push(new T.Vector3(2*length,1,length));
        roof.vertices.push(new T.Vector3(2*length,1,0));
        roof.vertices.push(new T.Vector3(1.5*length,2,length/2));
        roof.vertices.push(new T.Vector3(0.5*length,2,length/2));

        function addFace(v1,v2,v3) {
            geom.faces.push(new T.Face3(v1,v2,v3));
        }
        function addFace1(v1,v2,v3) {
            roof.faces.push(new T.Face3(v1,v2,v3));
        }
        function pos(n){
            return n/2250
        }
        function pos1(n){
            return 1-n/500
        }
        function addUV(a,b,c,d,e,f){
            geom.faceVertexUvs[0].push([new T.Vector2(pos(a),pos1(b)), new T.Vector2(pos(c),pos1(d)),new T.Vector2(pos(e),pos1(f))]);
        }
        function addUV1(a,b,c,d,e,f){
            roof.faceVertexUvs[0].push([new T.Vector2(a,b), new T.Vector2(c,d),new T.Vector2(e,f)]);
        }

        addFace(6,1,2); addUV(850,0,850,500,1450,500); // f
        addFace(6,2,7); addUV(850,0,1450,500,1450,0);
        addFace(7,2,3); addUV(0,0,0,350,560,350);
        addFace(7,3,8); addUV(0,0,560,350,560,0);
        addFace(8,3,4); addUV(0,0,0,350,560,350);// r
        addFace(8,4,9); addUV(0,0,560,350,560,0);
        addFace(5,0,1); // l
        addFace(5,1,6);
        addFace(9,4,0); // b
        addFace(9,0,5);

        addFace1(0,1,5); // l
        addFace1(5,1,2); // f
        addFace1(5,2,4);
        addFace1(4,2,3); // r
        addFace1(4,3,0); // b
        addFace1(4,0,5);

        let height = Math.sin(Math.atan2(1.12,0.5))*1.12;
        addUV1(0.5,height,0,0,1,0);
        addUV1(0,0,0,1,1,1);
        addUV1(0,0,1,1,1,0);
        addUV1(0.5,height,0,0,1,0);
        addUV1(0,0,0,1,1,1);
        addUV1(0,0,1,1,1,0);

        geom.computeFaceNormals();
        geom.uvsNeedUpdate = true;
        roof.computeFaceNormals();
        roof.uvsNeedUpdate = true;

        let tl = new T.TextureLoader().load("../images/house.png");
        let t2 = new T.TextureLoader().load("../images/UV_Grid_Sm.jpg");
        let material = new T.MeshStandardMaterial({ map: tl, roughness: 0.75 });
        let material1 = new T.MeshStandardMaterial({ map: t2, roughness: 0.75 });
        let mesh = new T.Mesh(geom, material);
        let mesh1 = new T.Mesh(roof,material1);
        let gr = new T.Group();
        gr.add(mesh,mesh1);

        super(props[0],gr);
    }
}

export class house3 extends GrObject {
    constructor(props) {
        let length = 1;
        let geom = new T.Geometry();
        let roof = new T.Geometry();
        roof.faceVertexUvs = [[]];

        geom.faceVertexUvs = [[]];

        geom.vertices.push(new T.Vector3(0, 0, 0));
        geom.vertices.push(new T.Vector3(0, 0, length));
        geom.vertices.push(new T.Vector3(length, 0, length));
        geom.vertices.push(new T.Vector3(2 * length, 0, length));
        geom.vertices.push(new T.Vector3(2 * length, 0, 0));

        geom.vertices.push(new T.Vector3(0, 1, 0));
        geom.vertices.push(new T.Vector3(0, 1, length));
        geom.vertices.push(new T.Vector3(length, 1, length));
        geom.vertices.push(new T.Vector3(2 * length, 1, length));
        geom.vertices.push(new T.Vector3(2 * length, 1, 0));

        geom.vertices.push(new T.Vector3(0, 2, 0));
        geom.vertices.push(new T.Vector3(0, 2, length));
        geom.vertices.push(new T.Vector3(length, 2, length));
        geom.vertices.push(new T.Vector3(2 * length, 2, length));
        geom.vertices.push(new T.Vector3(2 * length, 2, 0));

        roof.vertices.push(new T.Vector3(0, 2, 0));
        roof.vertices.push(new T.Vector3(0, 2, length));
        roof.vertices.push(new T.Vector3(2 * length, 2, length));
        roof.vertices.push(new T.Vector3(2 * length, 2, 0));
        roof.vertices.push(new T.Vector3(1.5 * length, 2.5, length / 2));
        roof.vertices.push(new T.Vector3(0.5 * length, 2.5, length / 2));

        roof.vertices.push(new T.Vector3(0, 2, 0.25));
        roof.vertices.push(new T.Vector3(0, 2, 0.75));
        roof.vertices.push(new T.Vector3(0.5, 2, 0.75));
        roof.vertices.push(new T.Vector3(0.5, 2, 0.25));
        roof.vertices.push(new T.Vector3(0.25, 3, 0.5));

        function addFace(v1, v2, v3) {
            geom.faces.push(new T.Face3(v1, v2, v3));
        }

        function addFace1(v1, v2, v3) {
            roof.faces.push(new T.Face3(v1, v2, v3));
        }

        function pos(n) {
            return n / 2250
        }

        function pos1(n) {
            return 1 - n / 500
        }

        function addUV(a, b, c, d, e, f) {
            geom.faceVertexUvs[0].push([new T.Vector2(pos(a), pos1(b)), new T.Vector2(pos(c), pos1(d)), new T.Vector2(pos(e), pos1(f))]);
        }

        function addUV1(a, b, c, d, e, f) {
            roof.faceVertexUvs[0].push([new T.Vector2(a, b), new T.Vector2(c, d), new T.Vector2(e, f)]);
        }

        addFace(6, 1, 2);
        addUV(850, 0, 850, 500, 1450, 500); // f
        addFace(6, 2, 7);
        addUV(850, 0, 1450, 500, 1450, 0);
        addFace(7, 2, 3);
        addUV(0, 0, 0, 350, 560, 350);
        addFace(7, 3, 8);
        addUV(0, 0, 560, 350, 560, 0);

        addFace(11, 6, 7); // f1
        addUV(0, 0, 0, 350, 560, 350);
        addFace(11, 7, 12);
        addUV(0, 0, 560, 350, 560, 0);
        addFace(12, 7, 8);
        addUV(0, 0, 0, 350, 560, 350);
        addFace(12, 8, 13);
        addUV(0, 0, 560, 350, 560, 0);

        addFace(8, 3, 4); // r
        addUV(0, 0, 0, 350, 560, 350);
        addFace(8, 4, 9);
        addUV(0, 0, 560, 350, 560, 0);
        addFace(13, 8, 9); // r1
        addUV(0, 0, 0, 350, 560, 350);
        addFace(13, 9, 14);
        addUV(0, 0, 560, 350, 560, 0);

        addFace(10, 5, 6); addUV(160, 0, 160, 350, 820, 350); // l1
        addFace(10, 6, 11); addUV(160, 0, 820, 350, 820, 0);
        addFace(5, 0, 1); // l
        addFace(5, 1, 6);

        addFace(9, 4, 0); // b
        addFace(9, 0, 5);
        addFace(14, 9, 5); // b1
        addFace(14, 5, 10);


        addFace1(0, 1, 5); // l
        addFace1(5, 1, 2); // f
        addFace1(5, 2, 4);
        addFace1(4, 2, 3); // r
        addFace1(4, 3, 0); // b
        addFace1(4, 0, 5);

        addFace1(10,6,7);
        addFace1(10,7,8);
        addFace1(10,8,9);
        addFace1(10,9,6);

        let height = Math.sin(Math.atan2(0.707, 0.5)) * 0.707;
        addUV1(0.5, height, 0, 0, 1, 0);
        addUV1(0, 0, 0, 1, 1, 1);
        addUV1(0, 0, 1, 1, 1, 0);
        addUV1(0.5, height, 0, 0, 1, 0);
        addUV1(0, 0, 0, 1, 1, 1);
        addUV1(0, 0, 1, 1, 1, 0);

        geom.computeFaceNormals();
        geom.uvsNeedUpdate = true;
        roof.computeFaceNormals();
        roof.uvsNeedUpdate = true;

        let tl = new T.TextureLoader().load("../images/house.png");
        let t2 = new T.TextureLoader().load("../images/UV_Grid_Sm.jpg");
        let material = new T.MeshStandardMaterial({map: tl, roughness: 0.75});
        let material1 = new T.MeshStandardMaterial({map: t2, roughness: 0.75});
        let mesh = new T.Mesh(geom, material);
        let mesh1 = new T.Mesh(roof, material1);
        let gr = new T.Group();
        gr.add(mesh, mesh1);

        super(props[0], gr);
    }
}

