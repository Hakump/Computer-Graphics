// JavaScript file to be filled in by the student for Box 3-1
// we'll give you something to get started...

window.onload = function() {
    // you should start by getting the canvas
    let canvas2 = document.getElementById("canvas2");
    let context2 = canvas2.getContext("2d");
    // add dashed lines outside the blocks, make a "eater", use transparency to  each part of it
    function drawEater(x,y,dir){
        context2.beginPath();
        context2.arc(x,y,30,Math.PI/6, 11*Math.PI/6);
        context2.lineTo(x-16,y);
        context2.fill();
        context2.closePath();
    }
    context2.fillStyle = `rgba(59, 92, 49, 0.5)`;
    context2.fillRect(105, 350, 340, 90);

    context2.fillStyle = `rgba(144, 99, 69, 0.7)`;
    context2.strokeStyle = 'hsla(220, 90%, 60%, 0.7)';
    context2.lineWidth = 2;
    context2.beginPath();
    context2.moveTo(365, 400);
    context2.lineTo(315,370);
    context2.lineTo(315, 430);
    context2.closePath();
    context2.stroke();
    context2.fill();

    context2.fillStyle = `rgba(235, 255, 9, 0.7)`;
    context2.strokeStyle = 'hsla(290, 60%, 30%, 0.5)';
    context2.lineWidth = 6;
    context2.beginPath();
    context2.moveTo(415, 400);
    context2.lineTo(395,390);
    context2.lineTo(395, 410);
    context2.closePath();
    context2.stroke();
    context2.fill();

    for (let i = 0; i < 4; i++){
        context2.fillStyle = `rgba(255,170,170,${(i+1)/4.0}`;
        drawEater(150 + i * 30, 400, 0);
    }
    // context1.beginPath();
    // context1.moveTo(150, 145);
    // context1.lineTo(150, 170);
    // context1.lineTo(250, 170);
    // context1.lineTo(250,145);
    // context1.lineTo(225, 120);
    // context1.lineTo(200, 145);
    // context1.lineTo(175, 120);
    // context1.lineTo(150, 145);
    // context1.fillStyle = "#777";
    // context1.strokeStyle = "#000";
    // context1.lineWidth = 5;
    // context1.stroke();
    // context1.fill();
    // then draw whatever you want!
};