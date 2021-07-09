/**
 * Starter file for 5-2.js - the second exercise of page 5 of Workbook 2
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
    // object: type? location, updating/ed path, creating new small ones, filterout
    let canvas2 = document.getElementById("box2canvas");
    let context2 = canvas2.getContext("2d");
    let listFW = [];
    let listEXP = []; // exploded particles
    let gravity = 0.1;
    let timing = 0;
    const T = 60;

    function lunchAll() {
        drawFW(context2);
        updateFW();
        drawEXP(context2);
        updateEXP();
    }

    function createFW(x, y, hight) {
        listFW.push({"x": x, "y":hight, 'fx': x, 'fy': y, "s": 4, "speedx": 0, "speedy": -9, "style": randomCol(),
            "posx": x, "posy": hight, 'dist': dist(x,x,y,hight), });
    }

    function drawFW(context){
        listFW.forEach(function (FW) {
            context.save();
            context.beginPath();
            context.arc(FW.posx, FW.posy, FW.s, 0, Math.PI*2);
            context.fillStyle = FW.style;
            context.fill();
            context.restore();
        });
    }
    function updateFW(){
        listFW = listFW.filter(
            function (FW) {
                FW.posx += FW.speedx;
                FW.posy += FW.speedy;
                FW.speedy += gravity;
                if (dist(FW.posx, FW.x, FW.posy, FW.y) < FW.dist){
                    return true
                } else {
                    let tR = Math.floor(randomRange(0,255));
                    let tG = Math.floor(randomRange(0,255));
                    let tB = Math.floor(randomRange(0,255));
                    for (let i = 0; i < 20; i++){
                        createEXP(FW.posx,FW.posy, tR, tG, tB);
                    }
                    return false
                }
            }
        );
        if (timing > T){
            createFW(randomRange(0,600),randomRange(0,400), canvas2.height);
            timing = 0;
        }
        timing++;
    }

    canvas2.onclick = function (event) {
        let x = event.clientX;
        let y = event.clientY;
        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();

        x -= box.left;
        y -= box.top;
        let hight = canvas2.height;
        createFW(x,y,hight);
        // listFW.push({"x": x, "y":hight, 'fx': x, 'fy': y, "s": 4, "speedx": 0, "speedy": -2, "style": "#0F8",
        //     "posx": x, "posy": hight, 'dist': dist(x,x,y,hight), }); // dist is the value that need to be traveled
        timing = 0;
    };

    function createEXP(x, y, r, g, b){
        listEXP.push({'x':x, 'y': y, 'lx':x, 'ly': y, 'speedx': randomRange(-4, 4),
            'speedy': randomRange(-6, 6),'R':r, 'G':g,'B':b, 'fade': 1.0});
    }
    function drawEXP(context){
        listEXP.forEach(function (EXP) {
            context.save();
            context.beginPath();
            //context.arc(EXP.x, EXP.y, 2, 0, Math.PI*2);
            //context.fillStyle = createColor(EXP.R, EXP.G, EXP.B,EXP.fade);
            // temp: draw lines
            context.strokeStyle = createColor(EXP.R, EXP.G, EXP.B,EXP.fade);
            context.lineWidth = 2;
            context.moveTo(EXP.lx,EXP.ly);
            context.lineTo(EXP.x,EXP.y);
            context.stroke();
            //context.fill();
            context.restore();
        });
    }
    function updateEXP() {
        listEXP = listEXP.filter(
            function (EXP) {
                if (EXP.fade > 0 && EXP.x > 0 && EXP.x < canvas2.width && EXP.y > 0 && EXP.y < canvas2.width){
                    EXP.fade -= 0.015;
                    EXP.lx = EXP.x;
                    EXP.ly = EXP.y;
                    EXP.x += EXP.speedx;
                    EXP.y += EXP.speedy;
                    EXP.speedy += gravity;
                    return true
                } else {
                    return false
                }
            }
        )
    }

    function animation() {
        context2.clearRect(0,0,canvas2.width,canvas2.height);
        lunchAll();
        window.requestAnimationFrame(animation);
    }
    animation();
};

function randomRange(x, y) {
    return Math.random()*(y-x)+ x;
}

function dist(x1, x2, y1, y2) {
    return (x1-x2)**2 + (y1-y2)**2
}

function createColor(r,g,b,a){
    return "rgba(" + r +", "+g +", "+b + ", " + a +")"
}

function randomCol() {
    return "#"+Math.floor(Math.random()*4096).toString(16);
}

