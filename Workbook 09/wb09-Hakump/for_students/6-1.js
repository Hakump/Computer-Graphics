/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {house1,house2,house3} from "../for_students/6-buildings.js"

// your buildings are defined in another file... you should import them
// here

function test() {
  let world = new GrWorld();

  // place your buildings and trees into the world here
  let h1 = new house1(["h1"]);
  h1.objects[0].translateX(-3);
  world.add(h1);

  let h2 = new house2(["h2"]);
  world.add(h2);

  let h3 = new house3(["h3"]);
  h3.objects[0].translateX(3);
  h3.objects[0].translateZ(-3);
  world.add(h3);

  world.go();
}
Helpers.onWindowOnload(test);
