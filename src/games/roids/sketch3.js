import p5 from 'p5'
import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {
    let ship;
    let asteroids = [];
    let lasers = [];
    let score = 0;
    let lives = 10;
    let gameID = 2;
    let user;
    const c = 5;
    let G =6;
    let dt= .1;
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var keyCode = evt.keyCode;
        if (((keyCode >= 37 && keyCode <= 40) || (keyCode === 32)) && (evt.target === document.body)) {
            return false;
        }
    }
    p.setup = function(){
        user = gameStore.get().user.id;
        p.createCanvas(800, 600);
        ship = new Ship();
        for(let i=0; i<5; i++){
            asteroids.push(new Asteroid());
        }
        // setInterval(asteroids.push(new Asteroid(), 1000))
    }
    p.draw = function(){
        p.background(255);
        p.textSize(20);
        p.text(`Score: ${score}`, 20, 20);
        p.text(`Lives: ${lives}`, 40, 40);
        for(let i=0; i<asteroids.length; i++){
            asteroids[i].show();
            asteroids[i].update();
            asteroids[i].edges();
            let distance = p.dist(ship.pos.x, ship.pos.y, asteroids[i].pos.x, asteroids[i].pos.y)
            if(distance < 400 && distance > 40){
                ship.pull(asteroids[i])
            }
            if((distance < (ship.r + asteroids[i].r)) && (asteroids[i].r >= ship.r)){
                lives--;
                asteroids.splice(i, 1);
                asteroids.push(new Asteroid());
            }
        }
        for(let i=lasers.length -1; i>=0; i--){
            lasers[i].show();
            lasers[i].update();
            for(let j=asteroids.length - 1; j>= 0; j--){
                if(lasers[i].hits(asteroids[j])){
                    if(asteroids[j].r > 20){
                        let newAsteroids = asteroids[j].split();
                        asteroids.push(newAsteroids[0]);
                        asteroids.push(newAsteroids[1]);
                    }else{
                        asteroids.push(new Asteroid());
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    score++;
                    break;
                }
            }
        }
        if(lives < 1){
            p.noLoop();
            axios.post('/api/score', {game: gameID, user: user, score: score})
            .then((response) =>{
                console.log('test post response:', response)
            }).catch((error) =>{console.log('test error:', error)})
            if(window.confirm(`You lost with a score of: ${score} Would you like to play again?`)){
                window.location.reload(true);
            }else{
                console.log('no new game')
            }
        }
        ship.show();
        ship.turn();
        ship.update();
        ship.edges();
    }
    p.keyPressed = function(){
        if(p.key === ' '){
            lasers.push(new Laser(ship.pos, ship.dir));
        }
        if(p.keyCode === p.RIGHT_ARROW){
            ship.setRotation(0.1);
        }else if(p.keyCode === p.LEFT_ARROW){
            ship.setRotation(-0.1)
        }else if(p.keyCode === p.UP_ARROW){
            ship.thrust(true);
        }
    }
    p.keyReleased = function(){
        if(p.keyCode === p.RIGHT_ARROW || p.keyCode === p.LEFT_ARROW){
            ship.setRotation(0);
        }
        if(p.keyCode === p.UP_ARROW){
            ship.thrust(false);
        }
    }
    class Ship{
        constructor(){
            this.pos = p.createVector(p.width/2, p.height/2);
            this.r = 15;
            this.dir = 0;
            this.rotation = 0;
            this.vel = p.createVector(0,0)
            this.isAcc = false;
            this.mass = 50;
            this.rs = (2 * G * this.mass / (c * c))
        }
        show(){
            p.push();
            p.fill(0, 255, 100);
            p.translate(this.pos.x, this.pos.y);
            p.rotate(this.dir + p.PI / 2);
            p.triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
            p.pop();
        }
        setRotation(angle){
            this.rotation = angle;
        }
        turn(){
            this.dir += this.rotation;
        }
        update(){
            if(this.isAcc){
                this.acc();
            }
            this.pos.add(this.vel);
            this.vel.mult(0.99)
        }
        acc(){
            let force = p5.Vector.fromAngle(this.dir);
            force.mult(0.1);
            this.vel.add(force);
        }
        thrust(boolean){
            this.isAcc = boolean;
        }
        pull(asteroid){
            let force = p5.Vector.sub(this.pos, asteroid.pos);
            let r = force.mag();
            let fg = this.mass * G / (r * r);
            force.setMag(fg); 
            asteroid.vel.add(force);
            asteroid.vel.limit(c);
        }
        edges(){
            if(this.pos.x > p.width + this.r){
                this.pos.x = -this.r
            }else if(this.pos.x < -this.r){
                this.pos.x =  p.width + this.r
            }
            if(this.pos.y > p.height + this.r){
                this.pos.y = -this.r
            }else if(this.pos.y < -this.r){
                this.pos.y = p.height + this.r
            }
        }
    }
    class Asteroid{
        constructor(pos, r){
            if(pos){
                this.pos = pos.copy();
                this.r = r
            }else{
                this.pos = p.createVector(p.random(p.width), p.random(p.height));
                this.r = p.random(15, 50);
            }
            this.total = p.floor(p.random(5, 15));
            this.offset = [];
            for(let i=0; i<this.total; i++){
                this.offset[i] = p.random(-this.r * 0.5, this.r * 0.5);
            }
            this.vel = p5.Vector.random2D();
        }
        show(){
            p.push();
            p.fill(0);
            p.translate(this.pos.x, this.pos.y)

            p.beginShape();
            for(let i=0; i<this.total; i++){
                let angle = p.map(i, 0, this.total, 0, p.TWO_PI)
                var x = (this.r + this.offset[i])*p.cos(angle);
                var y = (this.r + this.offset[i])*p.sin(angle);
                p.vertex(x, y);
            }
            p.endShape(p.CLOSE);
            p.pop();
        }
        update(){
            this.pos.add(this.vel);
            let DeltaV = this.vel.copy();
            DeltaV.mult(dt);
            this.pos.add(DeltaV);
        }
        edges(){
            if(this.pos.x > p.width + this.r){
                this.pos.x = -this.r
            }else if(this.pos.x < -this.r){
                this.pos.x = p.width + this.r
            }
            if(this.pos.y > p.height + this.r){
                this.pos.y = -this.r
            }else if(this.pos.y < -this.r){
                this.pos.y = p.height + this.r
            }
        }
        split(){
            let newA = [];
            for(let i=0; i<2; i++){
                newA.push(new Asteroid(this.pos, this.r/2))
            }
            return newA;
        }
    }
    class Laser{
        constructor(start, angle){
            this.pos = p.createVector(start.x, start.y);
            this.vel = p5.Vector.fromAngle(angle);
            this.vel.mult(10);
        }
        show(){
            p.push();
            p.stroke(255, 0, 0);
            p.strokeWeight(4);
            p.point(this.pos.x, this.pos.y);
            p.pop();
        }
        update(){
            this.pos.add(this.vel);
        }
        hits(asteroid){
            const d = p.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)
            if(d < asteroid.r){
                return true;
            }else{
                return false;
            }
        }
    }
}