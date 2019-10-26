import p5 from 'p5'
import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {
    let ship;

    p.setup = function(){
        p.createCanvas(600, 500);
        ship = new Ship();
    }
    p.draw = function(){
        p.background(255);
        ship.show();
        ship.update();
    }
    p.keyPressed = function(){
        
    }
    class Ship{
        constructor(){
            this.pos = p.createVector(p.width/2, 450)
            this.r = 30;
        }
        show(){
            p.circle(this.pos.x, this.pos.y, this.r);
        }
        update(){
            if (p.keyIsDown(p.LEFT_ARROW)) {
                ship.pos.x -= 5;
            }
            if(p.keyIsDown(p.RIGHT_ARROW)){
                ship.pos.x += 5;
            }
        }
    }
}