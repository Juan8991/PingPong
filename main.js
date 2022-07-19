import {Board} from "./Board.js"

class Bar{
    constructor(x,y,width,height,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;
        this.board.bars.push(this)
        this.kind="rectangle";
        this.speed=10;
    }
    down(){
        this.y+=this.speed;

    }
    up(){
        this.y-=this.speed;

    }
    toString(){
        return "x:"+this.x+"y:"+this.y;
    }
    /* self.Bar.prototype={
        down: function(){

        }
        up: function(){

        }

    } */
}

class Ball{
    constructor(x,y,radius,board){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.speed_y=0;
        this.speed_x=3;
        this.speed=3;
        this.board = board;
        this.direction=1;
        this.bounce_angle=0;
        this.max_bounce_angle=Math.PI/12;


        board.ball=this;
        this.kind="circle";
    }
    move(){
        this.x+=(this.speed_x *this.direction)
        this.y += (this.speed_y);
    }
    get width(){
        return this.radius*2;
    }
    get height(){
        return this.radius*2;
    }
    collision(bar){
        let relative_intersect_y=(bar.y+(bar.height/2))-this.y;
        let normalized_intersect_y=relative_intersect_y/(bar.height/2);
        this.bounce_angle=normalized_intersect_y*this.max_bounce_angle;
                             
        this.speed_y=this.speed*-Math.sin(this.bounce_angle);
        this.speed_x=this.speed*Math.cos(this.bounce_angle);
        if(this.x>(this.board.width/2))this.direction=-1;
        else this.direction=1;

    }
}
class BoardView{
    constructor(canvas,board){
        this.canvas = canvas;
        this.canvas.width =board.width;
        this.canvas.height=board.height;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
    
    draw = function(){
        
        for(let i= this.board.elements.length-1;i>=0;i--) {
                let el=this.board.elements[i];
                draw2(this.ctx,el);
            }
    }
    clean(){
        this.ctx.clearRect(0,0,this.board.width,this.board.height);
    }
    checkCollisions(){
        for(let i=this.board.bars.length-1;i>=0;i--){
            let barr=this.board.bars[i];
            if(golpeo(barr,this.board.ball)){
                this.board.ball.collision(bar);
            }
        }
    }
    play(){
        if(this.board.playing){
            this.clean();
            this.draw();
            this.checkCollisions();
            this.board.ball.move();
        }
        
    }
        
}
function golpeo(a,b){
    let hit=false;
    
    if(b.x+b.width >= a.x && b.x < a.x + a.width){
        if(b.y+b.height>= a.y && b.y < a.y +a.height){
            hit=true;
        }
    }
    //colision de a con b
    if(b.x<= a.x && b.x + b.width >= a.x + a.width){
        if(b.y<= a.y && b.y + b.height >= a.y + a.height){
            hit=true;
        }
    }
    if(a.x<= b.x && a.x + a.width >= b.x + b.width){
        if(a.y<= b.y && a.y + a.height >= b.y + b.height){
            hit=true;
        }
    }

    return hit;

}
function draw2(ctx,element){

    
    switch(element.kind){
        case "rectangle":
                ctx.fillRect(element.x,element.y,element.width,element.height);
                 break;
        case "circle":
            ctx.beginPath();
            ctx.arc(element.x,element.y,element.radius,0,7);
            ctx.fill();
            ctx.closePath();
            break;
            
    }
        
}
let board = new Board(800,400);
let bar = new Bar(20,100,40,100,board)
let bar2 = new Bar(700,100,40,100,board)
let canvas = document.getElementById("canvas");
let board_view=new BoardView(canvas,board);
let ball= new Ball(350,100,10,board)

board_view.draw();
window.requestAnimationFrame(controller)
setTimeout(()=>{
    ball.direction=-1;}
,3000);


document.addEventListener("keydown",(ev)=>{
    ev.preventDefault();
    console.log(ev.code);
    if(ev.code==="ArrowUp"){
        console.log("entrearriba")
        bar.up();
    }
    else if(ev.code==="ArrowDown"){
        console.log("entreabajo")
        bar.down();
    }else if(ev.code==="KeyW"){
        console.log("entrearribaW")
        bar2.up();
    }
    else if(ev.code==="KeyS"){
        console.log("entreabajoS")
        bar2.down();
    }else if(ev.code==="Space"){
        console.log("espacio")
        board.playing= !board.playing;
    }
    

})
//window.addEventListener("load",controller)

function controller(){
    board_view.play();
    
    window.requestAnimationFrame(controller)
}