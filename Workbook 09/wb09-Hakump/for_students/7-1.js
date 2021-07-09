/*jshint esversion: 6 */
// @ts-check

import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as Helpers from "../libs/CS559-Libs/helpers.js";
import {bus, simple_train} from "../for_students/7-car.js";

// your vehicles are defined in another file... you should import them
// here

function test() {
  let world = new GrWorld();

  // place your vehicles into the world here
  let box1 = new bus("bus");
  world.add(box1);
  let train = new simple_train("train");
  world.add(train);
  world.go();
}
Helpers.onWindowOnload(test);
