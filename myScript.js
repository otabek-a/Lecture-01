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
snake_coord[1] = {
    x: 8*BOX,
    y: 10*BOX
}
snake_coord[2] = {
    x: 8*BOX,
    y: 11*BOX
}
snake_coord[3] = {
    x: 8*BOX,
    y: 12*BOX
}
snake_coord[4] = {
    x: 7*BOX,
    y: 12*BOX
}

let snakeX = snakeY = 0;
let newHead;
let dir = "";

document.addEventListener("keypress", (e) => {
    if(e.key === "w") dir = "up";
});

function myGame(){
    ctx.drawImage(myBackground, 0, 0);
    ctx.drawImage(myFood, food_coord.x, food_coord.y);

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

    snake_coord.pop();

    newHead = {
        x: snakeX,
        y: snakeY
    }

    snake_coord.unshift(newHead);
}

let game = setInterval(myGame, 100);