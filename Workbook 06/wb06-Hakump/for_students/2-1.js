/*jshint esversion: 6 */
// @ts-check

import { draggablePoints } from "../libs/dragPoints.js";
import { RunCanvas } from "../libs/runCanvas.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [150, 450],
  [450, 450],
  [450, 150]
];

let theDerivatives = [];// the derivative of each point

let theDistnce = []; // the pts separate each interval PT[Curve[[x,y]]] todo: refresh these 3 for each run

let lookup_tb = []; // dist of each interval

let dist_pt = []; // sum of dist n + 1

let rail_lpt = [];

let rail_rpt = [];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  // now, the student should add code to draw the track and train
  let tension = document.getElementById("tension").value;
  draw_curve(context,tension);
  let par = document.getElementById("param").checked;
  drawTies(context);
  draw_train(param,context, par);
}

function draw_curve(context,tension){
  let x1 = 0; let x2 = 0; let y1 = 0; let y2 = 0;
  theDerivatives = []; theDerivatives.push([0,0]);
  theDerivatives.push([(thePoints[2%thePoints.length][0] - thePoints[0][0])*tension,
    (thePoints[2%thePoints.length][1] - thePoints[0][1])*tension]);

  context.beginPath();
  for (let i = 1; i <= thePoints.length; i++) {
    context.moveTo(thePoints[i%thePoints.length][0],thePoints[i%thePoints.length][1]);

    let dx1 = (thePoints[(i+2)%thePoints.length][0] - thePoints[(i)%thePoints.length][0])*tension;
    let dy1 = (thePoints[(i+2)%thePoints.length][1] - thePoints[(i)%thePoints.length][1])*tension;
    theDerivatives[(i+1)%thePoints.length] = [dx1,dy1];

    x1 = 1/3*theDerivatives[i%thePoints.length][0] + thePoints[i%thePoints.length][0];
    y1 = 1/3*theDerivatives[i%thePoints.length][1] + thePoints[i%thePoints.length][1];
    x2 = thePoints[(i+1)%thePoints.length][0]-1/3*theDerivatives[(i+1)%thePoints.length][0];
    y2 = thePoints[(i+1)%thePoints.length][1]-1/3*theDerivatives[(i+1)%thePoints.length][1];
    context.bezierCurveTo(x1,y1,x2,y2,thePoints[(i+1)%thePoints.length][0],thePoints[(i+1)%thePoints.length][1]);
  }
  context.stroke();
  context.closePath();
}


function draw_train(param, context, pa){
  let l = thePoints.length; let pos = []; let pos2 = [];

  if (!pa){
    let interval = Math.floor(param);
    let step = param%1;
    //let interval2 = Math.floor(param-)

    // the not param ones
    let temp = [thePoints[interval],theDerivatives[interval],thePoints[(interval+1)%l],theDerivatives[(interval+1)%l]];
    pos = hermite(temp,step);
    //let temp2 = [thePoints[interval],theDerivatives[interval],thePoints[(interval+1)%l],theDerivatives[(interval+1)%l]];
    //pos2 = hermite(())

    let p_interval = 0; let num = 0;
    let p_param = step*(dist_pt[(interval+1)*100]-dist_pt[(interval)*100]) + dist_pt[(interval)*100];
    while (p_param > dist_pt[num] && num < dist_pt.length){
      num++;
    }
    p_param = Math.min(p_param,dist_pt[dist_pt.length-1]); // prevent divided by 0
    p_interval=Math.floor(num/100);
    if (p_interval === thePoints.length) {p_interval = 0; p_param = 0}
    let p_nextinterval = (p_interval + 1)%(l+1);
    //console.log(p_interval)
    let p_u = (p_param-dist_pt[p_interval*100])/(dist_pt[p_nextinterval*100] - dist_pt[p_interval*100]+0.0000001);
    if (p_u < 0) {p_u = 1; p_interval -=1}
    let p_temp = [thePoints[p_interval],theDerivatives[p_interval],thePoints[(p_interval+1)%l],theDerivatives[(p_interval+1)%l]];

    if (p_param-20 < dist_pt[p_interval*100]){
      let p_next = p_interval - 1 < 0 ? thePoints.length : p_interval;
      let p_this = p_interval - 1 < 0 ? thePoints.length - 1 : p_interval - 1;
      let p_u2 = (dist_pt[p_next*100] + p_param-40-dist_pt[p_this*100])/(dist_pt[p_next*100] - dist_pt[p_this*100]+0.0000001);
      console.log(p_next +" "+dist_pt.length);
      if (p_next === thePoints.length){
        p_next = 0;
      }
      let p_temp2 = [thePoints[p_this],theDerivatives[p_this],thePoints[p_next],theDerivatives[p_next]];
      pos2 = hermite(p_temp2,p_u2);
    } else {
      pos2 = hermite(p_temp,p_u-40/(dist_pt[p_nextinterval*100] - dist_pt[p_interval*100]+0.0000001));
    }

  }else {
    let p_interval = 0; let num = 0;
    let p_param = param/l*dist_pt[dist_pt.length-1];
    while (p_param > dist_pt[num] && num < dist_pt.length){
      num++;
    }
    p_param = Math.min(p_param,dist_pt[dist_pt.length-1]); // prevent divided by 0
    p_interval=Math.floor(num/100);
    if (p_interval === thePoints.length) {p_interval = 0; p_param = 0}
    let p_nextinterval = (p_interval + 1)%(l+1);
    //console.log(p_interval)
    let p_u = (p_param-dist_pt[p_interval*100])/(dist_pt[p_nextinterval*100] - dist_pt[p_interval*100]+0.0000001);
    if (p_u < 0) {p_u = 1; p_interval -=1}
    console.log(p_param + " " +dist_pt[dist_pt.length-1] + " " +  dist_pt[(p_interval)*100] + " " +  dist_pt[(p_interval+1)*100] + " " + p_u);
    let p_temp = [thePoints[p_interval],theDerivatives[p_interval],thePoints[(p_interval+1)%l],theDerivatives[(p_interval+1)%l]];
    pos = hermite(p_temp,p_u);

    if (p_param-40 < dist_pt[p_interval*100]){
      let p_next = p_interval - 1 < 0 ? thePoints.length : p_interval;
      let p_this = p_interval - 1 < 0 ? thePoints.length - 1 : p_interval - 1;
      let p_u2 = (dist_pt[p_next*100] + p_param-40-dist_pt[p_this*100])/(dist_pt[p_next*100] - dist_pt[p_this*100]+0.0000001);
      console.log(p_next +" "+dist_pt.length);
      if (p_next === thePoints.length){
        p_next = 0;
      }
      let p_temp2 = [thePoints[p_this],theDerivatives[p_this],thePoints[p_next],theDerivatives[p_next]];
      pos2 = hermite(p_temp2,p_u2);
    } else {
      pos2 = hermite(p_temp,p_u-20/(dist_pt[p_nextinterval*100] - dist_pt[p_interval*100]+0.0000001));
    }
  }

  context.save();
  context.translate(pos[0],pos[1]);
  context.rotate((Math.atan2(pos[3],pos[2])));
  // context.translate(p_pos[0],p_pos[1]);
  // context.rotate((Math.atan2(p_pos[3],p_pos[2])));
  context.beginPath();
  // context.moveTo(0,0);
  // context.lineTo(30,0);
  drawFront(context);
  context.strokeStyle = "#f8f";
  context.lineWidth = 5;
  context.stroke();
  context.closePath();
  context.restore();

  // for 2
  context.save();
  context.beginPath();
  context.translate(pos2[0],pos2[1]);
  context.rotate((Math.atan2(pos2[3],pos2[2])));
  context.fillStyle = "#26ee9a";
  context.fillRect(-20,-8,30,16);
  context.restore();

}

function drawFront(context) {
  context.fillStyle = "#45dbee";
  context.fillRect(-20,-8,30,16);
  context.moveTo(10,-8);
  context.lineTo(25,0);
  context.lineTo(10,8);
  context.closePath();
  context.stroke();
}

function drawTies(context) {

  theDistnce = []; lookup_tb = []; dist_pt = []; rail_lpt = []; rail_rpt = [];
  for (let i = 0; i < thePoints.length; i++) {
    let templ = [thePoints[i],theDerivatives[i],thePoints[(i+1)%thePoints.length],theDerivatives[(i+1)%thePoints.length]];
    param_lookup(templ, context);
  }
  p_paramt(theDistnce);

  for (let i = 0; i < thePoints.length; i++) {
    let templist = [thePoints[i], theDerivatives[i],
      thePoints[(i+1)%thePoints.length], theDerivatives[(i+1)%thePoints.length]];
    let dist_points = dist_pt[(i+1) * 100] - dist_pt[i * 100];

    for (let j = 0; j < dist_points-12; j+=5) {
      let pos = hermite(templist,j/dist_points);
        context.save();
        context.translate(pos[0],pos[1]);
        let angle = Math.atan2(pos[3],pos[2]);
        context.rotate(angle);
        let oneside = [pos[0] + Math.cos(angle-Math.PI/2)*10,pos[1]+Math.sin(angle-Math.PI/2)*10];
        let otherside = [pos[0] - Math.cos(angle-Math.PI/2)*10,pos[1]-Math.sin(angle-Math.PI/2)*10];
        rail_lpt.push(oneside);
        rail_rpt.push(otherside);
        if (j%25 === 0){
          context.fillStyle = "#a84e0b";
          context.fillRect(-4,-11,8,22);
        }
        context.restore();
    }
  }
  context.save();
  context.beginPath();
  context.moveTo(rail_lpt[0][0],rail_lpt[0][1]);
  for (let j = 1; j < rail_lpt.length; j++) {
    context.lineTo(rail_lpt[j][0],rail_lpt[j][1]);
  }
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(rail_rpt[0][0],rail_rpt[0][1]);
  for (let j = 1; j < rail_rpt.length; j++) {
    context.lineTo(rail_rpt[j][0],rail_rpt[j][1]);
  }
  context.closePath();
  context.stroke();
  context.restore();
}

function param_lookup(pts,context){
  //f(t)=(1 - t)^3 * P0 + 3t(1-t)^2 * P1 + 3t^2 (1-t) * P2 + t^3 * P3;
  let temp = []; // todo: push plenty of points
  context.save();
  for (let i = 0; i < 101; i++) {
    let u = i*0.01;
    let pt = hermite(pts,u);
    temp.push(pt);
  }
  context.restore();
  theDistnce.push(temp);
}

function p_paramt(dists){
  let temp = 0;
  dist_pt.push(temp);
  for (let i = 0; i < thePoints.length; i++) {
    for (let j = 0; j < 100; j++) { // todo: 20???
      let v = Math.sqrt((dists[i][j][0]-dists[i][j+1][0])**2 + (dists[i][j][1]-dists[i][j+1][1])**2);
      lookup_tb.push(v);
      temp += v;
      dist_pt.push(temp);
    }
    console.log(temp);
  }
}

function hermite(pts, u){
  let x = (1-3*u**2+2*u**3)*pts[0][0] + (u-2*u**2+u**3)* pts[1][0] + (3*u**2-2*u**3)* pts[2][0] + (u**3-u**2)* pts[3][0];
  let y = (1-3*u**2+2*u**3)*pts[0][1] + (u-2*u**2+u**3)* pts[1][1] + (3*u**2-2*u**3)* pts[2][1] + (u**3-u**2)* pts[3][1];

  // (-6u+6u^2)*Pi + (1-4u+3u^2)*Pi' + (6u-6u^2)*(Pi+1) + (-2u+3u^2)
  let dx = (-6*u+6*u**2)*pts[0][0] + (1-4*u+3*u**2)*pts[1][0] + (6*u-6*u**2)*pts[2][0] + (-2*u+3*u**2)*pts[3][0];
  let dy = (-6*u+6*u**2)*pts[0][1] + (1-4*u+3*u**2)*pts[1][1] + (6*u-6*u**2)*pts[2][1] + (-2*u+3*u**2)*pts[3][1];

  return [x,y,dx,dy];
}

/**
 * Setup stuff - make a "window.onload" that sets up the UI and starts
 * the train
 */
let oldOnLoad = window.onload;
window.onload = function() {
  let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById(
    "canvas1"
  ));
  let context = canvas.getContext("2d");
  // we need the slider for the draw function, but we need the draw function
  // to create the slider - so create a variable and we'll change it later
  let slider = document.createElement("input"); // = undefined;
  slider.type = 'range';


  // note: we wrap the draw call so we can pass the right arguments
  function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length);
  }
  // create a UI
  let runcavas = new RunCanvas(canvas, wrapDraw);
  // now we can connect the draw function correctly
  slider = runcavas.range;

  // this is a helper function that makes a checkbox and sets up handlers
  // it sticks it at the end after everything else
  // you could also just put checkboxes into the HTML, but I found this more
  // convenient
  function addCheckbox(name, initial = false) {
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    document.getElementsByTagName("body")[0].appendChild(checkbox);
    checkbox.id = name;
    checkbox.onchange = wrapDraw;
    checkbox.checked = initial;
    let checklabel = document.createElement("label");
    checklabel.setAttribute("for", name);
    checklabel.innerText = name;
    document.getElementsByTagName("body")[0].appendChild(checklabel);
  }
  // note: if you add these features, uncomment the lines for the checkboxes
  // in your code, you can test if the checkbox is checked by something like:
  // document.getElementById("simple-track").checked
  // in your drawing code
  //
  // lines to uncomment to make checkboxes
  // addCheckbox("simple-track",false);
  // addCheckbox("arc-length",true);
  // addCheckbox("bspline",false);

  addCheckbox("param",false);

  // helper function - set the slider to have max = # of control points
  function setNumPoints() {
    runcavas.setupSlider(0, thePoints.length, 0.05);
  }

  document.getElementById("tension").onchange =  function (){wrapDraw();};
  setNumPoints();
  runcavas.setValue(0);

  // add the point dragging UI
  draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);
};
