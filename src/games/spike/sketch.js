// import axios from 'axios'
import gameStore from '../connect'
//CONNECT TO AXIOS AND REDUX STORE
// axios.post('/api/pet', test).then((response) =>{
//     console.log('test post response:', response)
// }).catch((error) =>{console.log('test error:', error)})

// console.log('Store items:', connect().user.id)

export default function sketch (p) {
    let play;
    let food = [];
    let time = 0;
    let playerScore = 0;
    function addFood(){
        food.push(new Food(p.random(p.width), p.random(p.height)))
        time++;
    }
    p.setup = function () {
        p.createCanvas(800, 500);
        play = new Player(p.width/2, p.height/2, 50);
        for(let i=0; i<20; i++){
            food.push(new Food(p.random(p.width), p.random(p.height)))
        }
        setInterval(addFood,1000);
    };
    p.draw = function () {
        p.background(0);
        play.show();
        play.update();
        for(let i=0; i<food.length; i++){
            food[i].show();
        }
        if(time>3){
            p.noLoop();
            console.log(gameStore.get());
            console.log(gameStore.post());
        }
        p.text(`Score: ${playerScore}`, 50, 50)
    };
    class Player{
        constructor(x, y, r){
            this.pos = p.createVector(x, y);
            this.r = r;
        }
        show(){
            p.stroke(0);
            p.fill(255);
            p.circle(this.pos.x, this.pos.y, this.r);
        }
        update(){
            let mouse = p.createVector(p.mouseX, p.mouseY);
            mouse.sub(this.pos);
            mouse.setMag(3);
            //TO GET RID OF JITTERING, MAKES STUTTERING
            // if(this.pos.x - p.mouseX < 3 && this.pos.y - p.mouseY < 3){
            //     console.log('mag 0');
            //     mouse.setMag(0);
            // }else{
            //     console.log('mag 3');
            //     mouse.setMag(3);
            // }
            this.pos.add(mouse);

            for(let i=0; i<food.length; i++){
                if(p.dist(this.pos.x, this.pos.y, food[i].pos.x, food[i].pos.y) <= (this.r + food[i].r)/2){
                    food.splice(i, 1);
                    playerScore++;
                }
            }
        }
    }
    class Food{
        constructor(x, y){
            this.pos = p.createVector(x, y);
            this.r = 10
        }
        show(){
            p.circle(this.pos.x, this.pos.y, this.r);
            p.stroke(0);
            p.fill(255);
        }
    }
  };