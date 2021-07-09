/**
 * 5-1.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

/**
 * If you want to read up on JavaScript classes, check out your favorite book or...
 * the chapter in the Exploring JS book: http://exploringjs.com/es6/ch_classes.html
 * 
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x, y, vx = 1, vy = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.collision = 0;
        this.alternatecolor = "#F6F"
        this.prevx = x;
        this.prevy = y;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context, s) {
        if (this.x <= 0 || this.x >= 600){
            console.log("wrong: " + this.x)
        }
        let speed = Math.sqrt(this.vy**2 + this.vx**2)*s*1.5;
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.collision > 0 ? this.alternatecolor: "#22AA22";
        context.arc(0,0,5,0,Math.PI*2); //fillRect(-5, -5, 10, 10);
        context.fill();
        let angle = Math.atan2(this.vy, this.vx);
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(speed*Math.cos(angle), speed*Math.sin(angle));
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        /*
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the bonus points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        const angle = 2 * Math.PI / 180;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        let ovx = this.vx;
        let ovy = this.vy;

        this.vx =  ovx * c + ovy * s;
        this.vy = -ovx * s + ovy * c;
		*/

        // collision avoidance



    }
}

window.onload = function () {
    /** @type Array<Boid> */
    let theBoids = [];

    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
    let context = canvas.getContext("2d");

    let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

    let alignment = /** @type {HTMLInputElement} */ (document.getElementById("alignment"));

    let sp = /** @type {HTMLInputElement} */ (document.getElementById("sep"));

    let coh = /** @type {HTMLInputElement} */ (document.getElementById("coh"));

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.fillStyle = 'rgba(0,0,177,0.8)';
        context.fillRect(150,200,100,200);
        context.restore();
        theBoids.forEach(boid => boid.draw(context, Number(speedSlider.value)));
    }

    /**
     * Create some initial boids
     * STUDENT: may want to replace this
     */
    theBoids.push(new Boid(100, 100));
    theBoids.push(new Boid(380, 180, -1, 0));
    theBoids.push(new Boid(500, 300, 0, -1));
    theBoids.push(new Boid(400, 500, 0, 1));

    /**
     * Handle the buttons
     */
    document.getElementById("add").onclick = function () {
        // Students Fill This In
        for (let i = 0; i < 10; i++) {
            let x = 480*Math.random()+5;
            let y = 380*Math.random()+5;
            x = x < 255 && x > 145 ? x + 110 : x;
            y = y < 405 && x > 195 ? y + 210 : y;
            theBoids.push(new Boid(x, y,Math.random(), Math.random()));
        }
    };
    document.getElementById("clear").onclick = function () {
        // Student Fill This In
        theBoids = [];
    };

    /**
     * The Actual Execution
     */
    function loop(callbackfn, thisArg) {
        // change directions
        //theBoids.forEach(boid => boid.steer(theBoids));
        let center = ali();
        cohesion(center, Number(coh.value)/200.0);
        separation(600, Number(sp.value)**2/16.0);
        // move forward
        let speed = Number(speedSlider.value);
        theBoids.forEach(function (boid) {
            boid.prevx = boid.x; boid.prevy = boid.y;
            boid.x += boid.vx * speed;
            boid.y += boid.vy * speed;
            if (boid.collision > 0 ) boid.collision -= 1;
        });
        // make sure that we stay on the screen
        for (let i = 0; i < theBoids.length; i++) {
            // crash between each
            for (let j = i+1; j < theBoids.length; j++) {
                if (dist(theBoids[i].x,theBoids[j].x,theBoids[i].y,theBoids[j].y) < 10){
                    //let angle = Math.atan2(theBoids[i].y - theBoids[j].y, theBoids[i].x - theBoids[j].x);
                    let tempy = theBoids[i].vy; theBoids[i].vy = theBoids[j].vy; theBoids[j].vy = tempy;
                    let tempx = theBoids[i].vx; theBoids[i].vx = theBoids[j].vx; theBoids[j].vx = tempx;
                    theBoids[i].collision = 10; theBoids[j].collision = 10;
                    theBoids[i].x += theBoids[i].vx; theBoids[i].y += theBoids[i].vy;
                    theBoids[j].x += theBoids[j].vx; theBoids[j].y += theBoids[j].vy;
                }
            }

            // handle crash to walls
            if (theBoids[i].y <= 5 ){
                if (theBoids[i].vy <=0 ) theBoids[i].vy *= -1;
                theBoids[i].y = 6;
                theBoids[i].collision = 10;
            }
            if (theBoids[i].y >= 595 ){
                if (theBoids[i].vy >=0)theBoids[i].vy *= -1;
                theBoids[i].y = 594;
                theBoids[i].collision = 10;
            }
            if (theBoids[i].x <= 5){
                if (theBoids[i].vx <=0) theBoids[i].vx *= -1;
                theBoids[i].x = 6;
                theBoids[i].collision = 10;
            }
            if ( theBoids[i].x >= 595){
                if (theBoids[i].vx >=0 ) theBoids[i].vx *= -1;
                theBoids[i].x = 594;
                theBoids[i].collision = 10;
            }

            // crash on obstacle
            if ((theBoids[i].x <= 255 && theBoids[i].x >= 145) && (theBoids[i].y <= 405 && theBoids[i].y >= 195)){
                if (theBoids[i].prevx >= 255){
                    if (theBoids[i].vx <=0 )theBoids[i].vx *= -1;
                    theBoids[i].x = 256;
                    theBoids[i].collision = 10;
                }
                if (theBoids[i].prevx <= 145){
                    if (theBoids[i].vx>=0 ) theBoids[i].vx *= -1;
                    theBoids[i].x = 144;
                    theBoids[i].collision = 10;
                }
                if (theBoids[i].prevy >= 405){
                    if (theBoids[i].vy <=0 )theBoids[i].vy *= -1;
                    theBoids[i].y = 406;
                    theBoids[i].collision = 10;
                }
                if (theBoids[i].prevy <= 195){
                    if (theBoids[i].vy >=0 )theBoids[i].vy *= -1;
                    theBoids[i].y = 194;
                    theBoids[i].collision = 10;
                }
            }
        }
        // now we can draw
        draw();
        // and loop
        window.requestAnimationFrame(loop);

    }
    loop();

    function ali(){
        let tempx = []; let tempy = [];
        let centerX = 0; let centerY = 0;
        for (let i = 0; i < theBoids.length; i++) {
            let sumX = 0; let sumY = 0;
            for (let j = 0; j < theBoids.length; j++) {
                let dis = dist(theBoids[i].x,theBoids[j].x,theBoids[i].y,theBoids[j].y);
                let norm = Math.sqrt(theBoids[j].vx**2+theBoids[j].vy**2);
                sumX += (theBoids[j].vx/norm)/(dis+Number(alignment.value));
                sumY += (theBoids[j].vy/norm)/(dis+Number(alignment.value));
            }
            let nm = Math.sqrt(sumX**2+sumY**2);
            tempx.push(sumX/nm); tempy.push(sumY/nm);
        }
        for (let i = 0; i < theBoids.length; i++) {
            let spd = Math.sqrt(theBoids[i].vx**2+theBoids[i].vy**2);
            theBoids[i].vx = spd * tempx[i];
            theBoids[i].vy = spd * tempy[i];
            centerX += theBoids[i].x; centerY += theBoids[i].y;
        }
        centerX/=(theBoids.length); centerY /= (theBoids.length);
        return [centerX, centerY];
    }
    function separation(space, force) {
        if (force === 0) return;
        for (let i = 0; i < theBoids.length; i++) {
            let temp = theBoids[i];
            for (let j = i + 1; j < theBoids.length; j++) { // todo: i + 1 or 0
                let temp2 = theBoids[j];
                let distance = dist(temp.x,temp2.x,temp.y,temp2.y);
                if (distance < space){
                    let y1 = temp.y; let y2 = temp2.y;
                    let angle = Math.atan2(y2-y1,temp2.x - temp.x);
                    let si = Math.abs(Math.sin(angle));
                    let co = Math.abs(Math.cos(angle));

                    if (temp.x > temp2.x){
                        temp.vx += co*force/distance**2;
                        temp2.vx -= co*force/distance**2;
                    } else {
                        temp.vx -= co*force/distance**2;
                        temp2.vx += co*force/distance**2;
                    }
                    if (y1 > y2){
                        temp.vy += si*force/distance**2;
                        temp2.vy -= si*force/distance**2;
                    } else {
                        temp.vy -= si*force/distance**2;
                        temp2.vy += si*force/distance**2;
                    }

                    let normNew1 = Math.sqrt(temp.vx**2 + temp.vy**2);
                    let normNew2 = Math.sqrt(temp2.vx**2 + temp2.vy**2);
                    temp.vx /= normNew1; temp.vy /= normNew1;
                    temp2.vx /= normNew2; temp2.vy /= normNew2;
                }
            }
        }
    }

    function cohesion(centers, attraction){
        if (attraction === 0) return;
        for (let i = 0; i < theBoids.length; i++) {
            let temp = theBoids[i];
            let distance = dist(temp.x,centers[0], temp.y, centers[1]);
            let dx = attraction*distance*(centers[0]-temp.x)/600;
            let dy = attraction*distance*(centers[1]-temp.y)/600;
            temp.vx += dx;
            temp.vy += dy;
            let normS = Math.sqrt(temp.vx**2 + temp.vy**2);
            temp.vx /= normS;
            temp.vy /= normS;
        }
    }

    function dist(x1,x2,y1,y2) {
        return Math.sqrt((x1-x2)**2+(y1-y2)**2);
    }
};