// JavaScript file to be filled in by the student for Box 3-1
// we'll give you something to get started...

window.onload = function() {
    // you should start by getting the canvas
    let canvas1 = document.getElementById("canvas1");
    let context1 = canvas1.getContext("2d");

    context1.beginPath();
    context1.arc(50, 60, 30, 0, 2*Math.PI);
    context1.fillStyle = "#F5F";
    context1.fill();
    context1.strokeStyle = "#F0F";
    context1.lineWidth = 5;
    context1.stroke();
    context1.closePath();

    context1.beginPath();
    context1.arc(150,60,30,0.5*Math.PI, 1.5*Math.PI);
    context1.lineTo(250, 30);
    context1.arc(250,60,30, 1.5*Math.PI, 0.5*Math.PI, false);
    context1.lineTo(150,90);
    context1.fillStyle = "#F78";
    context1.strokeStyle = "#833";
    context1.lineWidth = 5;
    context1.fill();
    context1.stroke();
    context1.closePath();

    context1.beginPath();
    context1.moveTo(50, 120);
    context1.lineTo(25, 163);
    context1.lineTo(75, 163);
    context1.lineTo(50,120);
    context1.fillStyle = "#FA5";
    context1.strokeStyle = "#853";
    context1.lineWidth = 5;
    context1.fill();
    context1.stroke();
    context1.closePath();
    // then draw the 4 shapes

    context1.beginPath();
    context1.moveTo(150, 145);
    context1.lineTo(150, 170);
    context1.lineTo(250, 170);
    context1.lineTo(250,145);
    context1.lineTo(225, 120);
    context1.lineTo(200, 145);
    context1.lineTo(175, 120);
    context1.lineTo(150, 145);
    context1.fillStyle = "#777";
    context1.strokeStyle = "#000";
    context1.lineWidth = 5;
    context1.stroke();
    context1.fill();
    context1.closePath();
};