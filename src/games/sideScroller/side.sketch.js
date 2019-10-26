import p5 from 'p5'
import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {
    p.setup = function(){
        p.createCanvas(800, 500);
    }
    p.draw = function(){
        p.background(255);
    }

}