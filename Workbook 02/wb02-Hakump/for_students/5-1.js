/**
 * Starter file for 5-1.js - the first exercise of page 5 of Workbook 2
 */

// we do enable typescript type checking - see
// http://graphics.cs.wisc.edu/WP/cs559-sp2019/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

window.onload = function() {
    // student puts their code here
    let listCircles = [];
    function createCircles(x, y){
        let inside = false;
        for (let i = listCircles.length-1; i >=0; i--){
            if ((x-listCircles[i].x)**2 + (y-listCircles[i].y)**2 <= 400) {
                inside = true;
                listCircles[i].style = randomCol();
                listCircles[i].style2 = randomCol();
            }
        }
        if (listCircles.length === 0 || !inside){
            listCircles.push({'x': x, 'y': y ,'temp': false, 'style': '#06F', 'style2': '#654'});
        }
    }

    function drawAllcircles(context){
        listCircles.forEach(function (circle) {
            context.save();
            context.beginPath();
            context.arc(circle.x, circle.y, 20, 0, Math.PI*2);
            context.fillStyle = circle.temp ? circle.style2:circle.style;
            context.fill();
            context.closePath();
            context.restore();
        })
    }

    function handlemouseon(x,y){
        let found = false;
        for (let i = listCircles.length-1; i >=0; i--){
            if (!found && (x-listCircles[i].x)**2 + (y-listCircles[i].y)**2 <= 400) {
                listCircles[i].temp = true;
                found = true;
            } else {
                listCircles[i].temp = false;
            }
        }
    }

    let box1canvas = document.getElementById("box1canvas");
    box1canvas.onclick = function(event){
        let x = event.clientX;
        let y = event.clientY;

        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= box.left;
        y -= box.top;
        createCircles(x,y);
    };
    box1canvas.onmousemove = function (event) {
        let x = event.clientX;
        let y = event.clientY;

        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= box.left;
        y -= box.top;
        handlemouseon(x,y)
    };


    function animation() {
        let context = box1canvas.getContext('2d');
        context.clearRect(0,0,box1canvas.width,box1canvas.height);
        drawAllcircles(context);
        window.requestAnimationFrame(animation);
    }
    animation();
    
    function randomCol() {
        return  "#"+Math.floor(Math.random()*4096).toString(16);

    }
}
