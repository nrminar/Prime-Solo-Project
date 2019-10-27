import p5 from 'p5'

export default function sketch (p) {
    let bubbles = [];

    p.setup = function(){
        p.createCanvas(p.windowWidth, p.windowHeight);
        for(let i=0; i<150; i++){
            bubbles.push(new Bubbles());
        }
    }
    p.draw = function(){
        p.background('#9CCAFE');
        for(let i=0; i<bubbles.length; i++){
            bubbles[i].show();
            bubbles[i].update();
            bubbles[i].edges();
        }
    }
    class Bubbles{
        constructor(){
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.r = p.random(5, 25);
            this.vel = p5.Vector.random2D();
        }
        show(){
            p.stroke(255);
            p.fill('rgba(255,255,255, 0.7)');
            p.circle(this.pos.x, this.pos.y, this.r);
        }
        update(){
            this.pos.add(this.vel);
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
    }
}