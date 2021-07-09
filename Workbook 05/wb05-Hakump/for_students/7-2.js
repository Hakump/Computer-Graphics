// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 2
 * 
 * draw a picture using curves!
 **/
window.onload = function() {
  /** @type {HTMLCanvasElement} */
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
  let context = canvas.getContext("2d");

  draw_template(100,100);
  //draw_leaf(60,250);

  context.beginPath();
  context.moveTo(200,300);
  context.bezierCurveTo(320,250,280,250,400,300);
  context.moveTo(200,100);
  context.bezierCurveTo(200,150, 150,150,100,100);
  context.stroke();


  context.fillStyle="#72ec6f";
  context.moveTo(0,0);
  context.save();
  context.translate(40,180);
  context.rotate(-Math.PI/6);
  draw_leaf(0,0);
  context.restore();

  context.save();
  context.translate(130,130);
  context.rotate(Math.PI/18);
  context.scale(1.2,1.25);
  draw_leaf(0,0);
  context.restore();

  context.save();
  context.translate(187,203);
  context.rotate(Math.PI/4);
  context.scale(0.88,0.83);
  draw_leaf(0,0);
  context.restore();

  context.fillStyle="#f48417";
  context.moveTo(0,0);
  context.save();
  context.translate(30,300);
  context.rotate(-Math.PI/6);
  draw_leaf(0,0);
  context.restore();

  context.save();
  context.translate(120,250);
  context.rotate(Math.PI/18);
  context.scale(1.2,1.25);
  draw_leaf(0,0);
  context.restore();

  context.save();
  context.translate(177,323);
  context.rotate(Math.PI/4);
  context.scale(0.88,0.83);
  draw_leaf(0,0);
  context.restore();

  function draw_template(x,y) {
    context.beginPath();
    context.moveTo(x,y);
    context.bezierCurveTo(x+50,y-50,x+100,y-50,x+100,y);
    context.moveTo(x+100,100);
    context.bezierCurveTo(x+100,y+50, x+50,y+50,x,100);
    context.stroke();
  }

  function draw_leaf(x,y) {
    context.beginPath();
    context.moveTo(x,y);
    context.bezierCurveTo(x+20,y+70,x+30,y+70,x+10,y+100);
    context.bezierCurveTo(x,y+90,x,y+80,x,y+60);
    context.bezierCurveTo(x-10,y+85,x-5,y+90,x-5,y+100);
    context.bezierCurveTo(x-35,y+75,x-15,y+40,x,y);
    context.closePath();
    context.fill();
  }

};
