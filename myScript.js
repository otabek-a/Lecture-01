let myH1 = document.createElement("H1");
myH1.innerHTML = "";
document.body.append(myH1);

const BOX = 32;

let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

let myBackground = new Image();
myBackground.src = "ground.png";

let myFood = new Image();
let fruits = ["pineapple.png", "carrot.png", "sausage.png", "watermelon.png", "grape.png", "beef.png"];


function changeFood() {
    let randomIndex = Math.floor(Math.random() * fruits.length);
    myFood.src = fruits[randomIndex];
}
changeFood();




let food_coord = {
    x: BOX*(Math.floor(17*Math.random()) + 1),
    y: BOX*(Math.floor(15*Math.random()) + 3)
}

let snake_coord = [];
snake_coord[0] = {
    x: 9*BOX,
    y: 10*BOX
}

let snakeX = snakeY = 0;
let newHead;
let dir = "";
let score = 0;

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dir !== "down") dir = "up";
    if (e.key === "ArrowDown" && dir !== "up") dir = "down";
    if (e.key === "ArrowLeft" && dir !== "right") dir = "left";
    if (e.key === "ArrowRight" && dir !== "left") dir = "right";
});

function myGame(){
    let bgX = (ctx.canvas.width - myBackground.width) / 2;
    let bgY = (ctx.canvas.height - myBackground.height) / 2;
    
    ctx.drawImage(myBackground, bgX, bgY);
    ctx.drawImage(myFood, food_coord.x, food_coord.y);

    ctx.fillStyle = "gold";
    ctx.font = "50px Arial";
    ctx.fillText("Score: ", 6*BOX, 2*BOX);
    ctx.fillStyle = "white";
    ctx.font = "bold 50px 'Times New Roman'"
    ctx.fillText(score, 10.6 * BOX, 2 * BOX);

    ctx.fillStyle = "rgba(109, 16, 216, 1)";
    let head_snake = new Image();
    head_snake.src = "dragon.png";
    let head_body = new Image();
    head_body.src = "game.png";
    let tail = new Image();
    tail.src = "triangle.png";
    

    
    ctx.drawImage(head_snake, snake_coord[0].x, snake_coord[0].y, BOX, BOX);
    for(let i = 1; i < snake_coord.length-1; i++){
         ctx.drawImage(head_body, snake_coord[i].x, snake_coord[i].y, BOX, BOX);
    }
    if(snake_coord.length > 1){
        let lastIndex = snake_coord.length - 1;
        ctx.drawImage(tail, snake_coord[lastIndex].x, snake_coord[lastIndex].y, BOX, BOX);
    }
    
    snakeX = snake_coord[0].x;
    snakeY = snake_coord[0].y;

    if (dir === "right") snakeX += BOX;
    if (dir === "left") snakeX -= BOX;
    if (dir === "up") snakeY -= BOX;
    if (dir === "down") snakeY += BOX;
    for(let i = 1; i < snake_coord.length; i++){
        if(snakeX === snake_coord[i].x && snakeY === snake_coord[i].y){
            food_coord = {
                x: BOX * (Math.floor(17 * Math.random()) + 1),
                y: BOX * (Math.floor(15 * Math.random()) + 3)
            }
            score++;
            
            
        }
    }

    if(snakeX === food_coord.x && snakeY === food_coord.y ){
        food_coord = {
            x: BOX * (Math.floor(17 * Math.random()) + 1),
            y: BOX * (Math.floor(15 * Math.random()) + 3)
        }
        score++;
        changeFood()
        
    } else {
        snake_coord.pop();
    }
   
    if( snakeY > 17*BOX || snakeY < 3*BOX){
        clearInterval(game);
        ctx.fillStyle = "red";
        ctx.font = "bold 50px 'Times New Roman'"
        ctx.fillText("Game is over", 5 * BOX, 10.6 * BOX);
    }
   

    newHead = {
        x: snakeX,
        y: snakeY
    };
    
    if (newHead.x > 17 * BOX) {
        newHead.x = 0;
    }
    
    if (newHead.x < 0) {
        newHead.x = 17 * BOX;
    }
    
    snake_coord.unshift(newHead);
}

let game = setInterval(myGame, 160);