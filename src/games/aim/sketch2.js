import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {
    let discs = [];
    let score = 0;
    let lives = 3;
    let gameID = 3;
    let user;
    function addDisc(){
        discs.push(new Disc(p.random(p.width), p.random(p.height), 20));
    }
    p.setup = function(){
        user = gameStore.get().user.id;
        p.createCanvas(800, 500);
        setInterval(addDisc, 600)
    }
    p.draw = function(){
        p.background(0);
        for(let i=0; i<discs.length; i++){
            discs[i].show();
            discs[i].update();

            let tooBig = discs[i].large();
            if(tooBig){
                lives--;
                discs.splice(i, 1);
            }
        }
        p.textSize(30);
        p.text(`Score: ${score}   Lives: ${lives}`, 55, 55);
        if(lives < 1){
            p.noLoop();
            axios.post('/api/score', {game: gameID, user: user, score: score})
            .then((response) =>{
                console.log('test post response:', response)
            }).catch((error) =>{console.log('test error:', error)})
        }
    }
    p.mousePressed = function(){
        for(let i=0; i<discs.length; i++){
            let hit = discs[i].click();
            if (hit){
                discs.splice(i, 1);
                score++;
            }
        }
    }
    class Disc{
        constructor(x, y, d){
            this.pos = p.createVector(x, y);
            this.d = d;
        }
        show(){
            p.stroke(0);
            p.fill(255);
            p.circle(this.pos.x, this.pos.y, this.d)
        }
        update(){
            this.d = this.d + 0.3;
        }
        click(){
            let distance = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY)
            if(distance <= this.d/2){
                return true;
            }else{
                return false;
            }
        }
        large(){
            if(this.d > 50){
                return true;
            }
        }
    }
    // class Button{
    //     constructor(){
    //         this.pos = p.createVector(10, 10);
    //         this.d = 20
    //     }
    //     show(){
    //         p.fill(255, 0, 0);
    //         p.circle(this.pos.x, this.pos.y, this.d);
    //     }
    //     click(){
    //         let distance = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY)
    //         if(distance <= this.d/2){
    //             return true;
    //         }else{
    //             return false;
    //         } 
    //     }
    //     update(){
    //         console.log(gameStore.get());
    //         user = gameStore.get().userReducer.user;
    //     }
    // }
}