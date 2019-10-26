import p5 from 'p5'
import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {
    let turret;

    p.setup = function(){
        p.createCanvas(800, 500);
        turret = new Turret();
    }
    p.draw = function(){
        p.background(255)
        turret.show()
        turret.update()
    }

    class Turret{
        constructor(){
            this.x = 30
            this.y = 30
        }
        show(){
            p.push()
            p.translate(p.width / 2, p.height);
            p.stroke(0);
            p.line = (0, 0, this.x, this.y);
            p.pop()
        }
        update(){
            let mouseAngle = p.map(p.mouseX, 0, p.width, 0, 180);
            let v = p5.Vector.fromAngle(p.radians(mouseAngle), 30);
            this.x = v.x
            this.y = v.y
        }
    }

}