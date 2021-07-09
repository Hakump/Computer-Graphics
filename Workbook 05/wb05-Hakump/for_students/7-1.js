// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw the spiral - account for the checkbox and slider
 **/
window.onload = function() {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext("2d");

    let slider = document.getElementById("slider");
    let connect = document.getElementById("checkbox");


    function draw(){
        //console.log(connect.checked);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        let number = Number(slider.value);
        let arr = calculate(number);
        for (let i = 0; i < number; i++) {
            drawdots(arr[i][0],arr[i][1],2);
        }
        if (connect.checked){
            context.beginPath();
            context.strokeStyle = "#000";
            context.moveTo(arr[0][0],arr[0][1]);
            for (let i = 1; i < number; i++) {
                context.lineTo(arr[i][0],arr[i][1]);
            }
            context.stroke();
        }
        context.restore();
        window.requestAnimationFrame(draw);
    }

    function drawdots(x1,y1,r) {
        //context.moveTo(x1,y1);
        context.beginPath();
        context.arc(x1,y1,r,0,Math.PI*2);
        context.fill();
    }

    function calculate(number){
        let d = 1.0/number;
        let temp = [];
        for (let i = 0; i < number; i++) {
            temp.push([200 + i*d*180*Math.cos(2*Math.PI*4*i*d),200 + i*d*180*Math.sin(2*Math.PI*4*i*d)]);
        }
        return temp;
    }
    draw();
};
