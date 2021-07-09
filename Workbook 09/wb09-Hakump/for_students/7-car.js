/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

// define your vehicles here - remember, they need to be imported
// into the "main" program

export class bus extends GrObject{
    constructor(props) {
        //let body = new T.Geometry();
        let windows = new T.Geometry();
        let box = new T.BoxGeometry(3,0.9,1,32,32,32);


        // function pushPoints(body, y){
        //     body.vertices.push(new T.Vector3(0,y,0));
        //     body.vertices.push(new T.Vector3(0,y,0.1));
        //     body.vertices.push(new T.Vector3(0,y,0.9));
        //     body.vertices.push(new T.Vector3(0,y,1));
        //     body.vertices.push(new T.Vector3(0.1,y,1));
        //     body.vertices.push(new T.Vector3(0.8,y,1));
        //     body.vertices.push(new T.Vector3(1.2,y,1));
        //     body.vertices.push(new T.Vector3(1.8,y,1));
        //     body.vertices.push(new T.Vector3(2.2,y,1));
        //     body.vertices.push(new T.Vector3(2.8,y,1));
        //     body.vertices.push(new T.Vector3(3,y,1));
        //     body.vertices.push(new T.Vector3(3,y,0.9));
        //     body.vertices.push(new T.Vector3(3,y,0.1));
        //     body.vertices.push(new T.Vector3(3,y,0));
        //     body.vertices.push(new T.Vector3(2.8,y,0));
        //     body.vertices.push(new T.Vector3(2.2,y,0));
        //     body.vertices.push(new T.Vector3(1.8,y,0));
        //     body.vertices.push(new T.Vector3(1.2,y,0));
        //     body.vertices.push(new T.Vector3(0.8,y,0));
        //     body.vertices.push(new T.Vector3(0.2,y,0));
        // }
        function pushPoints(body, y){
            body.vertices.push(new T.Vector3(0,y,0));
            body.vertices.push(new T.Vector3(-0.01,y,0.1));
            body.vertices.push(new T.Vector3(-0.01,y,0.9));
            body.vertices.push(new T.Vector3(0,y,1));
            body.vertices.push(new T.Vector3(0.1,y,1.01));
            body.vertices.push(new T.Vector3(0.8,y,1.01));
            body.vertices.push(new T.Vector3(1.2,y,1.01));
            body.vertices.push(new T.Vector3(1.8,y,1.01));
            body.vertices.push(new T.Vector3(2.2,y,1.01));
            body.vertices.push(new T.Vector3(2.8,y,1.01));
            body.vertices.push(new T.Vector3(3,y,1));
            body.vertices.push(new T.Vector3(3.01,y,0.9));
            body.vertices.push(new T.Vector3(3.01,y,0.1));
            body.vertices.push(new T.Vector3(3,y,0));
            body.vertices.push(new T.Vector3(2.8,y,-0.01));
            body.vertices.push(new T.Vector3(2.2,y,-0.01));
            body.vertices.push(new T.Vector3(1.8,y,-0.01));
            body.vertices.push(new T.Vector3(1.2,y,-0.01));
            body.vertices.push(new T.Vector3(0.8,y,-0.01));
            body.vertices.push(new T.Vector3(0.2,y,-0.01));
        }
        pushPoints(windows,0.4);
        pushPoints(windows,0.8);

        windows.vertices.push(new T.Vector3(0.8,0.2,-0.01));
        windows.vertices.push(new T.Vector3(0.4,0.2,-0.01));
        windows.vertices.push(new T.Vector3(0.4,0.8,-0.01));

        function addFaces(v1,v2,v3) {
            windows.faces.push(new T.Face3(v1,v2,v3));
            windows.faces.push(new T.Face3(v1,v3,v1+1));
        }

        addFaces(21,1,2);

        addFaces(24,4,5);
        addFaces(26,6,7);
        addFaces(28,8,9);

        addFaces(31,11,12);

        addFaces(34,14,15);
        addFaces(36,16,17);
        windows.faces.push(new T.Face3(38,40,41));
        windows.faces.push(new T.Face3(38,41,42));

        windows.computeFaceNormals();
        windows.uvsNeedUpdate = true;

        let cylG = new T.CylinderGeometry(0.2,0.2,0.1,32);
        let cylM = new T.MeshStandardMaterial({color: "gray"});
        let cyl_1 = new T.Mesh(cylG,cylM); let cyl_2 = new T.Mesh(cylG,cylM);
        let cyl_3 = new T.Mesh(cylG,cylM); let cyl_4 = new T.Mesh(cylG,cylM);

        let material = new T.MeshStandardMaterial({color: "red"});
        let material1 = new T.MeshStandardMaterial({color:"#b39f72"});
        let window = new T.Mesh(windows,material1);
        let car_body = new T.Mesh(box,material);
        car_body.add(cyl_1,cyl_2,cyl_3,cyl_4);
        cyl_1.rotateX(Math.PI/2);cyl_2.rotateX(Math.PI/2);
        cyl_3.rotateX(Math.PI/2);cyl_4.rotateX(Math.PI/2);
        cyl_1.position.set(-1.2,-0.4,0.5); cyl_2.position.set(-1.2,-0.4,-0.5);
        cyl_3.position.set(1.2,-0.4,0.5); cyl_4.position.set(1.2,-0.4,-0.5);
        car_body.translateX(1.5); car_body.translateY(0.6); car_body.translateZ(0.5);

        let gr = new T.Group(); gr.add(car_body,window);
        super(props, gr);
    }
}

export class simple_train extends GrObject{
    constructor(props) {
        function createGeometries() {

            const nose = new T.CylinderBufferGeometry( 0.75, 0.75, 3, 12 );

            const cabin = new T.BoxBufferGeometry( 2, 2.25, 1.5 );

            const chimney = new T.CylinderBufferGeometry( 0.3, 0.1, 0.5 );

            // we can reuse a single cylinder geometry for all 4 wheels
            const wheel = new T.CylinderBufferGeometry( 0.4, 0.4, 1.75, 16 );
            wheel.rotateX( Math.PI / 2 );


            return {
                nose,
                cabin,
                chimney,
                wheel,
            };

        }

        function createMaterials() {
            const body = new T.MeshStandardMaterial( {
                color: 0xff3333, // red
                flatShading: true,
            } );

            // just as with textures, we need to put colors into linear color space
            body.color.convertSRGBToLinear();

            const detail = new T.MeshStandardMaterial( {
                color: 0x333333, // darkgrey
                flatShading: true,
            } );

            detail.color.convertSRGBToLinear();

            return {

                body,
                detail,

            };
        }


        function createMeshes() {
            // create a Group to hold the pieces of the train
            const train = new T.Group();

            const materials = createMaterials();
            const geometries = createGeometries();

            const nose = new T.Mesh( geometries.nose, materials.body );
            nose.rotation.z = Math.PI / 2;

            nose.position.x = -1;

            const cabin = new T.Mesh( geometries.cabin, materials.body );
            cabin.position.set( 1.5, 0.4, 0 );

            const chimney = new T.Mesh( geometries.chimney, materials.detail );
            chimney.position.set( -2, 0.9, 0 );

            const smallWheelRear = new T.Mesh( geometries.wheel, materials.detail );
            smallWheelRear.position.set( 0, -0.5, 0 );

            const smallWheelCenter = smallWheelRear.clone();
            smallWheelCenter.position.x = -1;

            const smallWheelFront = smallWheelRear.clone();
            smallWheelFront.position.x = -2;

            const bigWheel = smallWheelRear.clone();
            bigWheel.scale.set( 2, 2, 1.25 );
            bigWheel.position.set( 1.5, -0.1, 0 );

            train.add(

                nose,
                cabin,
                chimney,

                smallWheelRear,
                smallWheelCenter,
                smallWheelFront,
                bigWheel,

            );
            return train;
        }

        let windows = new T.Geometry();
        windows.vertices.push(new T.Vector3(0.6,1.4,0.76));
        windows.vertices.push(new T.Vector3(0.6,1.1,0.76));
        windows.vertices.push(new T.Vector3(1.6,1.1,0.76));
        windows.vertices.push(new T.Vector3(1.6,1.4,0.76));

        windows.vertices.push(new T.Vector3(1.0,1.2,-0.76));
        windows.vertices.push(new T.Vector3(1,0.6,-0.76));
        windows.vertices.push(new T.Vector3(2.2,0.6,-0.76));
        windows.vertices.push(new T.Vector3(2.2,1.2,-0.76));
        // windows.vertices.push(new T.Vector3(2.2,y,1.01));
        // windows.vertices.push(new T.Vector3(2.8,y,1.01));
        // windows.vertices.push(new T.Vector3(3,y,1));
        // windows.vertices.push(new T.Vector3(3.01,y,0.9));
        function addFaces(v1,v2,v3,v4) {
            windows.faces.push(new T.Face3(v1,v2,v3));
            windows.faces.push(new T.Face3(v1,v3,v4));
        }
        addFaces(0,1,2,3);
        addFaces(7,6,5,4);

        windows.computeFaceNormals();
        windows.uvsNeedUpdate = true;

        let material1 = new T.MeshStandardMaterial({color:"#fff8fc"});
        let windowG = new T.Mesh(windows,material1);


        let group = createMeshes(); //
        group.add(windowG);
        group.scale.set(0.3,0.3,0.3);
        group.translateY(0.26); group.translateZ(-0.9);
        super(props,group);
    }

}
