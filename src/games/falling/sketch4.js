import axios from 'axios';
import gameStore from '../connect';

export default function sketch (p) {

    const layer = [];
    const lines = [];
    let gameID = 1;
    let user;
    let play;
    let timeCount = -15;
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var keyCode = evt.keyCode;
        if (keyCode >= 37 && keyCode <= 40) {
            return false;
        }
    }
    function addLayer(x = 800, y = 100){
        layer.push(new comet(p.random(0, x), p.random(0, y)));
        timeCount++;
    }
    function compare(a, b){
        let difference = a.distance - b.distance;
        return difference;
    }
    p.setup = function(){
       user = gameStore.get().user.id;
       p.createCanvas(800, 600);
       p.stroke(0);
       p.noFill();
       for(let i=0; i<15; i++){
            addLayer(800,300);
       }
       play = new player(0,0);
    //    for(let i=0; i<8; i++){
    //         lines.push(new closeLine(100, 100));
    //    }
       setInterval(addLayer,1000);
    }
    p.draw = function() {
        p.background(255, 204, 0);
        play.show();
        play.update();
        for(let comet of layer) {
            comet.collide();
            comet.show();
            comet.update();
        }
        // for(let i=0; i<lines.length; i++){
        //     lines[i].update(i);
        //     lines[i].show();
        // }
        p.text(layer.length-15, 50, 50)
     }
    class comet{
        constructor(x, y) {
            this.pos = p.createVector(x, y);
            this.r = 30;
            this.distance = 0;
        }
        show(){
            p.stroke(0);
            p.fill(255);
            p.circle(this.pos.x, this.pos.y, this.r);
       }
       update(){
           if(this.pos.y > 800){
            this.pos.y = 0;
            this.pos.x = p.random(0,800);
           }
           if(layer.length <= 25){
            this.pos.y += 3;
           }else if(25 < layer.length){
            this.pos.y += 5;
           }
           this.distance = p.dist(play.pos.x, play.pos.y, this.pos.x, this.pos.y);
        }
       collide(){
        if(p.dist(this.pos.x, this.pos.y, play.pos.x, play.pos.y) < ((this.r + 40)/2)){
            axios.post('/api/score', {game: gameID, user: user, score: timeCount})
            .then((response) =>{
                console.log('test post response:', response)
            }).catch((error) =>{console.log('test error:', error)})
            if(window.confirm(`You lost with a score of: ${timeCount} Would you like to play again?`)){
                window.location.reload(true);
            }else{
                console.log('no new game')
            }
            p.noLoop();
        }
       }
    }
    class player{
        constructor(x,y){
            this.pos = p.createVector(x + 400, y + 400);
        }
        show(){
            p.stroke(0);
            p.fill(0);
            p.circle(this.pos.x,this.pos.y, 40);
        }
        update(){
            if (p.keyIsDown(p.LEFT_ARROW)) {
                play.pos.x -= 5;
            }
            if(p.keyIsDown(p.RIGHT_ARROW)){
                play.pos.x += 5;
            }
            if (p.keyIsDown(p.UP_ARROW)) {
                play.pos.y -= 5;
            }
            if(p.keyIsDown(p.DOWN_ARROW)){
                play.pos.y += 5;
            }
            layer.sort(compare);
        }
    }
    class closeLine{
        constructor(x, y){
            this.pos = p.createVector(x, y)
        }
        show(){
            p.stroke(0);
            p.fill(0);
            p.line(play.pos.x, play.pos.y, this.pos.x, this.pos.y);
        }
        update(index){
            let close = layer[index];
            this.pos.x = close.pos.x;
            this.pos.y = close.pos.y;
        }
    }
}