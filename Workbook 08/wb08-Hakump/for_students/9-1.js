/*jshint esversion: 6 */
// @ts-check

// get things we need
import * as T from "../libs/CS559-THREE/build/three.module.js";
import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { HingeCube } from "../libs/CS559-Framework/TestObjects.js";
import { AutoUI } from "../libs/CS559-Framework/AutoUI.js";
import { GrCrane, GrExcavator, GrCrane2, back_hoe } from "./9-constructionobjects.js";

function startWorld() {
  let cDiv = document.getElementById("construction");
  let world = new GrWorld({ groundplanesize: 10, where: cDiv });

  let crane = new GrCrane({ x: 2, z: -2 });
  world.add(crane);
  let c_ui = new AutoUI(crane, 300, cDiv);

  let crane2 = new GrCrane2({x: -5, z: -5});
  world.add(crane2);
  let c2_ui = new AutoUI(crane2,300, cDiv);

  let excavator = new GrExcavator({ x: -2, z: 2 });
  world.add(excavator);
  let e_ui = new AutoUI(excavator, 300, cDiv);
  e_ui.set("x", 6);
  e_ui.set("z", 3);
  e_ui.set("theta", 36);

  let backhoe = new back_hoe({x:-5, z: -5});
  world.add(backhoe);
  let b_ui = new AutoUI(backhoe,300,cDiv);
  b_ui.set("x", -3); b_ui.set("z", 2);

  function loop() {
    world.animate();
    window.requestAnimationFrame(loop);
  }
  loop();
}
window.onload = startWorld;
