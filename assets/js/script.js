let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake[0] = { 
    x: 5*box, 
    y: 8*box
}
/* snake[1] = { 
    x: 4*box, 
    y: 8*box
}
snake[2] = { 
    x: 3*box, 
    y: 8*box
}
snake[3] = { 
    x: 2*box, 
    y: 8*box
} */

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

let eaten_food = {
    x: null,
    y: null
}

let direction = "right";

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box);
}

function setSnake() {
    for(let i=0; i < snake.length; i++) {    
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

}

function setFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
function newFood(){
    eaten_food.x = food.x;
    eaten_food.y = food.y

    do {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    } while(is_in_snake(food));
    
}

function is_in_snake(box) {
    let r = false;
    for(let i=1; i<snake.length; i++){
        if(snake[i].x == box.x && snake[i].y == box.y){
            r = true;
        }
    }

    return r;
}

function restartGame() {
    snake = [];
    snake[0] = { 
        x: 5*box, 
        y: 8*box
    }
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box, 
        y: Math.floor(Math.random() * 15 + 1) * box
    }
    eaten_food = {
        x: null,
        y: null
    }
    direction = "right";
}

function startGame(){
    if(is_in_snake(snake[0])){
        window.alert("GAME OVER");
        restartGame();
    } 

    if(snake[0].x > 15*box) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 16*box;
    if(snake[0].y > 15*box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 16*box;

    criarBG();
    setFood();
    setSnake();

    let snake_x = snake[0].x;
    let snake_y = snake[0].y;

    if(direction == "right") snake_x += box;
    if(direction == "left") snake_x -= box;
    if(direction == "up") snake_y -= box;
    if(direction == "down") snake_y += box;

    if(snake[0].x == food.x && snake[0].y == food.y) newFood();

    if(snake[snake.length-1].x == eaten_food.x && snake[snake.length-1].y == eaten_food.y){
        snake.push(eaten_food);
        eaten_food.x = null;
        eaten_food.y = null;
    } 

    snake.pop();
    
    let newHead = {
        x: snake_x,
        y: snake_y
    }
    snake.unshift(newHead);
}

function update(event){
    if(event.keyCode == 37 && direction != "right") {
        direction = "left";
    } if(event.keyCode == 38 && direction != "down") {
        direction = "up";
    } if(event.keyCode == 39 && direction != "left") {
        direction = "right";
    } if(event.keyCode == 40 && direction != "up") {
        direction = "down";
    } 
}

document.addEventListener('keydown', update);

let game = setInterval(startGame, 100);

