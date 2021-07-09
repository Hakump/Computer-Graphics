// empty shell for students to do their quadcopter
// exercise

// we do enable typescript type checking - see
// https://graphics.cs.wisc.edu/Courses/559-sp2020/pages/typed-js/
// and
// https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files
// @ts-check

/* Set options for jshint (my preferred linter)
 * disable the warning about using bracket rather than dot
 * even though dot is better
 * https://stackoverflow.com/questions/13192466/how-to-suppress-variable-is-better-written-in-dot-notation
 */
/* jshint -W069, esversion:6 */

window.onload = function (angle) {
    // somewhere in your program (maybe not here) you'll want a line
    // that looks like:
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
    let context = canvas.getContext('2d');
    let pos = [];
    let target = [];
    let bullet = [];
    let mousepos = {"x": 0, "y": 0};
    let listEXP = [];
    let blinking = 0;
    pos.push({"radius": 100, "angle":0});
    target.push({"x": 200, "y":200, "tx":200, "ty":200, "sx":200, "sy":200, "dist":0, "angle": 0, "dir": true, "moving": false});

    context.translate(300,300);
    function animation(){
        context.clearRect(-300,-300,600,600);
        drawEXP(context);
        updateEXP();
        pos.forEach(function (c) {
            draw(context,c.angle, c.radius);
            update(c,0.01);
        });
        target.forEach(function (c) {
            draw2(c.angle, c.x,c.y, c.moving);
            update2(c,0.01);
        });
        update3();
        blinking++;
        window.requestAnimationFrame(animation)
    }
    animation();

    function blink(context) {
        context.save();
        let temp = blinking%100;
        if (target[0].moving === true){
            temp = (2*temp)%100;
        }
        if (temp<50){
            context.fillStyle = "#F00";
        } else {
            context.fillStyle = "#00F";
        }
        context.beginPath();
        context.arc(0,0,3,0,2*Math.PI);
        context.fill();
        context.restore();
    }

    function update(p, speed){
        p.angle += speed;
    }

    // the speed is angle one
    function update2(t, speed) {
        if (t.dir === false){
            let temp = Math.atan2(t.tx-t.x, t.y - t.ty )-Math.PI;
            let nearest = Math.min(Math.abs(temp - t.angle), Math.abs((temp-Math.PI/2 - t.angle)%Math.PI*-2)
                ,Math.abs((temp-Math.PI - t.angle)%Math.PI*-2),Math.abs((temp-Math.PI*3/2 - t.angle)%Math.PI*-2));
            if (nearest<speed*2){
                t.angle = temp;
                t.dir = true;
                t.moving = true;
            }
            t.angle -= speed*2;
            t.angle%=Math.PI*-2;
            // t.angle = Math.atan2(t.tx-t.x, t.y - t.ty )-Math.PI;
            // t.dir = true;
        } else {
            // need to
            if (t.dist >= Math.sqrt((t.sx - t.x)**2 + (t.sy - t.y)**2)){
                t.x += (t.tx - t.sx)*0.01;//t.tx > t.sx ? 10*speed : -10*speed;
                t.y += (t.ty - t.sy)*0.01;//t.ty > t.sy ? 10*speed : -10*speed;
            } else {
                t.x = t.tx; t.sx = t.tx;
                t.y = t.ty; t.sy = t.ty;
                t.dist = 0;
                t.moving = false;
            }
        }
    }

    function draw(context,angle,radius) {
        context.save();
        context.rotate(angle);
        context.translate(radius,0);
        body(context, angle);
        context.restore();
    }

    function draw2(angle, x, y, move) {
        context.save();
        context.translate(x,y);
        context.rotate(angle);
        body(context, 0.01*blinking, move);
        context.restore();
    }

    function body(context, angle, move) {
        context.save();
        context.beginPath();
        context.arc(0,0,30,0,Math.PI*2);
        context.strokeStyle = '#000';
        context.stroke();
        context.fillStyle="#d3ccd0";
        context.fill();
        context.rotate(-1*Math.PI/4);
        arm(context,1, angle, move);arm(context,-1, angle, move);
        arm(context,1, angle, move);arm(context,-1, angle, move);
        context.restore();
    }

    function arm(context, direction, angle, move) {
        context.rotate(Math.PI/2);
        context.beginPath();
        context.fillStyle = '#CFC';
        context.fillRect(-10,0,20,80);
        let faster = move? 2 : 1;
        blade(context,0,70, direction*(Math.PI/4+10*angle*faster));
    }

    function blade(context,x,y, angle) {
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.beginPath();
        context.fillStyle = '#878';
        context.bezierCurveTo(5,5,   15,5,  20,5);
        context.bezierCurveTo(25,5,  35,5,  40,0);
        context.bezierCurveTo(35,-5, 25,-5, 20,-5);
        context.bezierCurveTo(15,-5, 5,-5,  0,0);
        context.fill();
        context.scale(-1,1);
        context.bezierCurveTo(5,5,   15,5,  20,5);
        context.bezierCurveTo(25,5,  35,5,  40,0);
        context.bezierCurveTo(35,-5, 25,-5, 20,-5);
        context.bezierCurveTo(15,-5, 5,-5,  0,0);
        context.fill();
        //context.fillRect(-4,-20, 8, 40);
        blink(context);
        context.restore();
    }
    
    document.onclick = function (event) {
        let x = event.clientX;
        let y = event.clientY;

        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= box.left;
        y -= box.top;
        console.log(x + " " + y);

        let t = target[0];
        t.tx = x - 300;
        t.ty = y - 300;
        t.sx = t.x;
        t.sy = t.y;
        t.dist = Math.sqrt((t.x -t.tx)**2 + (t.y -t.ty)**2);
        t.dir = false;
        t.moving = true;
    };

    document.onmousemove = function(event){
        let x = event.clientX;
        let y = event.clientY;

        let box = /** @type {HTMLCanvasElement} */(event.target).getBoundingClientRect();
        x -= (box.left + 300);
        y -= (box.top + 300);
        mousepos.x = x;
        mousepos.y = y;
    };

    document.onkeydown = function (event) {
        if (event.keyCode === 32){
            console.log("S"+ mousepos.x + " "+ mousepos.y);
            console.log(Math.cos(pos[0].angle));
            shoot(mousepos.x,mousepos.y);
        }
    };

    function shoot(x, y){
        bullet.push({"sx": target[0].x, "sy": target[0].y, "tx": x, "ty":y, "x":target[0].x, "y":target[0].y});
    }

    function update3() {
        context.save();
        bullet.forEach(function (b) {
            let prevx = b.x;
            let prevy = b.y;
            let nextx = 0;
            let nexty = 0;
            let temp = Math.sqrt((b.sx - b.tx)**2 + (b.sy - b.ty)**2);
            if (temp <= Math.sqrt((b.sx - b.x)**2 + (b.sy - b.y)**2)){
                bullet.splice(bullet.indexOf(b));
                nextx = b.tx; nexty = b.ty;
                explode(nextx,nexty)
            } else if(Math.sqrt((Math.cos(pos[0].angle)*100 - b.x)**2 + (-Math.sin(pos[0].angle) - b.y)**2) < 80){
                bullet.splice(bullet.indexOf(b));
                nextx = b.x; nexty = b.y;
                explode(nextx,nexty)
            } else {
                b.x += (b.tx - b.sx)/temp*25;
                b.y += (b.ty - b.sy)/temp*25;
                nextx = b.x; nexty = b.y;
            }
            context.beginPath();
            context.moveTo(prevx,prevy);
            context.lineTo(nextx,nexty);
            context.strokeStyle = "rgba(155, 0, 0, 0.8)";
            context.lineWidth = 4;
            context.stroke()
        });
        context.restore();
    }

    function explode(x,y){
        for (let i = 0; i < 20; i++) {
            createEXP(x,y, 255,192,151)
        }
    }

    function createEXP(x, y, r, g, b){
        listEXP.push({'x':x, 'y': y, 'lx':x, 'ly': y, 'speedx': randomRange(-4, 4),
            'speedy': randomRange(-6, 6),'R':r, 'G':g,'B':b, 'fade': 1.0});
    }
    function drawEXP(context){
        listEXP.forEach(function (EXP) {
            context.save();
            context.beginPath();
            context.strokeStyle = createColor(EXP.R, EXP.G, EXP.B,EXP.fade);
            context.lineWidth = 3;
            context.moveTo(EXP.lx,EXP.ly);
            context.lineTo(EXP.x,EXP.y);
            context.stroke();
            context.restore();
        });
    }
    function updateEXP() {
        listEXP = listEXP.filter(
            function (EXP) {
                if (EXP.fade > 0 && EXP.x > -300 && EXP.x < 300 && EXP.y > -300 && EXP.y < 300){
                    EXP.fade -= 0.015;
                    EXP.lx = EXP.x;
                    EXP.ly = EXP.y;
                    EXP.x += EXP.speedx;
                    EXP.y += EXP.speedy;
                    return true
                } else {
                    return false
                }
            }
        )
    }


    function randomRange(x, y) {
        return Math.random()*(y-x)+ x;
    }

    function createColor(r,g,b,a){
        return "rgba(" + r +", "+g +", "+b + ", " + a +")"
    }

};