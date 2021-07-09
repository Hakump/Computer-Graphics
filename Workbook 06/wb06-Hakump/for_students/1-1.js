// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw something.
 **/
window.onload = function() {
  /** @type {HTMLCanvasElement} */
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));

  let context = canvas.getContext("2d");

  // change this to draw a more complex shape that meets the requirement
  function path() {
      context.moveTo(50,50);
      context.lineTo(150,50);
      context.lineTo(100,120);
      context.lineTo(50,50);
  }

  context.save();
  context.beginPath();
  draw_leaf(40,40);
  context.translate(0,10);
  context.scale(0.5,0.5);
  draw_leaf(80,90);
  context.fill("nonzero");           // change this to one rule
    context.restore();

  context.save();
  context.translate(200,0);
  context.beginPath();
  draw_leaf(40,40);
  context.translate(0,10);
  context.scale(0.5,0.5);
  draw_leaf(80,90);
  context.closePath();
  context.fill("evenodd");// change this to use a filling rule
  context.restore();

  function draw_leaf(x,y) {
        context.moveTo(x,y);
        context.bezierCurveTo(x+20,y+70,x+30,y+70,x+10,y+100);
        context.bezierCurveTo(x,y+90,x,y+80,x,y+60);
        context.bezierCurveTo(x-10,y+85,x-5,y+90,x-5,y+100);
        context.bezierCurveTo(x-35,y+75,x-15,y+40,x,y);
  }
};
