const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');    
const box = 25;
const canvasSize = 23;
let gameSpeed = 1000;
const speedIncrement = 100;

// score variables
let score = 0;
// load snake starting position
let snake = [];

snake[0] = {
    x: Math.floor((canvasSize/2)) * box,
    y: Math.floor((canvasSize/2)) * box
}

let dir;
document.addEventListener('keydown', direction);
// set direction pressed by arrow keys
function direction(event) {
        if (event.keyCode == 37 && dir != 'Right'){
        dir = "Left";
        } else
        if (event.keyCode == 38 && dir != 'Down') { 
        dir = "Up";
        } else
        if (event.keyCode == 39 && dir != 'Left') { 
        dir = "Right";
        } else
        if (event.keyCode == 40 && dir != 'Up') { 
        dir = "Down";
        }
        }
    
         // set the location of our food
         let food ={
            x:Math.floor( 1 + (Math.random() * (canvasSize -1))) * box,
            y:Math.floor( 1 + (Math.random() * (canvasSize -1))) * box
                   }

//draw function
function draw() {
    // draw the background
    ctx.fillStyle = 'lightgreen';
    ctx.fillRect(box, box, (canvasSize*box) -box, (canvasSize*box) - box);
    // draw the snake head and tail
    for (let i = 0 ; i < snake.length ; i++) 
    {
         ctx.fillStyle = 'green';
         ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // move the snake head
    let snakeX = snake[0].x;    
    let snakeY = snake[0].y;

    if(dir == "Left") 
    snakeX -= box;
    if(dir == "Right")
    snakeX += box;
    if(dir == "Up")
    snakeY -= box;
    if(dir == "Down")
    snakeY += box;

    //if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) 
    {
        score += 1;
        food = {
            x:Math.floor( 1 + (Math.random() * (canvasSize -1))) * box,
            y:Math.floor( 1 + (Math.random() * (canvasSize -1))) * box
        }
        if (score % 2 == 0) {
            gameSpeed -= speedIncrement;
            clearInterval(game);
            game = setInterval(draw, gameSpeed);
        }
    }
    else {
        snake.pop();
    };
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };

   

    //check collision   
    function collision(newHead, snake) {
        for (let i = 0 ; i < snake.length ; i++){
        if(newHead.x == snake[i].x && newHead.y == snake[i].y) {
            return true;
        }
    }
    return false;
    }
    if (snakeX < box || snakeY < box || snakeY > (canvasSize - 1) * box || snakeX > (canvasSize - 1) * box || collision(newHead, snake)) {
        clearInterval(game, 2000);
    };

    snake.unshift(newHead);

    // snake food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

   //draw the score
   ctx.fillStyle = 'white';
   ctx.font = '24px changa one';
   ctx.clearRect(0, 0, 50, 25);
   ctx.fillText( score , box , 0.8 * box);

   // game speed
//    function gameSpeed (){
//        let gameSpeed = 10;
//    if (score % 5 == 0) {
//         gameSpeed +=100
//     } else {
//     gameSpeed = 1;
//     }
//     }
//      let xxxxxx = gameSpeed();
}
   


let game = setInterval (draw, 1000);
