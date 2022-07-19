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
    }
    /* self.Bar.prototype={
        down: function(){

        }
        up: function(){

        }

    } */
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
        
}
function draw2(ctx,element){
        if(element !== null ){
            switch(element.kind){
                case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    break;
            }
        } 
    }

window.addEventListener("load",main)

function main(){
    let board = new Board(800,400);
    let bar = new Bar(20,100,40,100,board)
    let bar2 = new Bar(700,100,40,100,board)
    let canvas = document.getElementById("canvas");
    let board_view=new BoardView(canvas,board);
    console.log(board)
    board_view.draw();
}