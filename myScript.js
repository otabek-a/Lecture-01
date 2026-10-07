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
    x: BOX*Math.floor(17*Math.random()),
    y: BOX*Math.floor(17*Math.random())
}

function myGame(){
    ctx.drawImage(myBackground, 0, 0);
    ctx.drawImage(myFood, food_coord.x, food_coord.y);
}

let game = setInterval(myGame, 100);