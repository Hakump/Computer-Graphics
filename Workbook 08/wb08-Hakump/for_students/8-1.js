/*jshint esversion: 6 */
// @ts-check

// get things we need
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import {
  GrSimpleSwing,
  GrColoredRoundabout,
  GrColoredRoundabout_2,
  GrSimpleRoundabout,
  GrCarousel,
  GrAdvancedSwing
} from "./8-parkobjects.js";
import { SimpleBouncer } from "./8-simplepark.js";



function test() {
  let parkDiv = document.getElementById("div1");
  let world = new GrWorld({ groundplanesize: 20, where: parkDiv });

  //world.add(new SimpleBouncer(0, 5));

  let roundabout = new GrSimpleRoundabout({ x: -2 });
  //roundabout.add(new SimpleBouncer(0, 5));
  world.add(roundabout);

  let roundabout_2 = new GrColoredRoundabout({ x: 5 });
  world.add(roundabout_2);

  let roundabout_3 = new GrColoredRoundabout_2({x:5,z:10,size:2});
  //let obj = roundabout_3.objects[0].children[0];

  world.add(roundabout_3);

  let swing_1 = new GrAdvancedSwing({ x: 5,z:-6 });
  //swing_1.platform.rotateY(Math.PI/2);
  world.add(swing_1);
  let swing_2 = new GrAdvancedSwing({ x: 10 });
  world.add(swing_2);

  let carousel = new GrCarousel({x:-10});
  world.add(carousel);

  function loop() {
    world.animate();
    window.requestAnimationFrame(loop);
  }
  loop();
}
window.onload = test;
