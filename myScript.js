let myH1 = document.createElement("H1");
myH1.innerHTML = "Hello World!";
document.body.append(myH1);

const BOX = 32;

let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");

let myBackground = new Image();
myBackground.src = "ground.png";

let myFood = new Image();
myFood.src = "carrot.png";

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

document.addEventListener("keypress", (e) => {
    if(e.key === "w" && dir != "down") dir = "up";
    if(e.key === "s" && dir != "up") dir = "down";
    if(e.key === "a" && dir != "right") dir = "left";
    if(e.key === "d" && dir != "left") dir = "right";
});

function myGame(){
    ctx.drawImage(myBackground, 0, 0);
    ctx.drawImage(myFood, food_coord.x, food_coord.y);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText("Score: " + score, 6*BOX, 2*BOX);

    ctx.fillStyle = "rgba(109, 16, 216, 1)";
    for(let i = 0; i < snake_coord.length; i++){
        ctx.fillRect(snake_coord[i].x, snake_coord[i].y, BOX, BOX);
    }

    snakeX = snake_coord[0].x;
    snakeY = snake_coord[0].y;

    if (dir === "right") snakeX += BOX;
    if (dir === "left") snakeX -= BOX;
    if (dir === "up") snakeY -= BOX;
    if (dir === "down") snakeY += BOX;

    if(snakeX === food_coord.x && snakeY === food_coord.y){
        food_coord = {
            x: BOX * (Math.floor(17 * Math.random()) + 1),
            y: BOX * (Math.floor(15 * Math.random()) + 3)
        }
        score++;
    } else {
        snake_coord.pop();
    }

    if(snakeX < 1*BOX || snakeX > 17*BOX || snakeY > 17*BOX || snakeY < 3*BOX){
        clearInterval(game);
        console.log("Game Over!!!");
    }

    newHead = {
        x: snakeX,
        y: snakeY
    }

    snake_coord.unshift(newHead);
}

let game = setInterval(myGame, 100);