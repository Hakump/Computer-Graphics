// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/dragPoints.js";

/**
 * drawing function for box 2
 *
 * Use this UI code!
 **/
window.onload = function() {
  /** @type {HTMLCanvasElement} */
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));
  let context = canvas.getContext("2d");

  let thePoints = [
    [100, 100],
    [50, 186.6],
    [100, 273.2],
    [200, 273.2],
    [250, 186.6],
    [200, 100]
  ];

  function draw() {
    /** student does stuff here **/
    context.clearRect(0, 0, canvas.width, canvas.height);

    thePoints.forEach(function (c) {
      context.beginPath();
      context.arc(c[0],c[1],5,0,Math.PI*2);
      context.fill();
    });
    //context.beginPath();
    for (let i = 0; i < thePoints.length; i++) {
      for (let j = i+1; j < thePoints.length; j++) {
        context.beginPath();
        context.moveTo(thePoints[i][0],thePoints[i][1]);
        context.lineTo(thePoints[j][0],thePoints[j][1]);
        context.stroke();
      }
    }

    window.requestAnimationFrame(draw);
  }

  draggablePoints(canvas, thePoints, draw);
  draw();
};
