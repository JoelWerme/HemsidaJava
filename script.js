const gameBoard = document.getElementById("board");
const gameBoard_ctx = board.getContext("2d");

let snake = [  
    {x: 200, y: 200},  
];

let score = 0;
let horizontal = 25;
let vertical = 0;
let foodX;
let foodY;
let gameOverMsg = 'Refresh this page to start over.';
let winMsg = 'Congrats, you have won!'

main();
generate();

document.addEventListener("keydown", direction)

function main() 
{
    if(gameOver()) return document.getElementById("gameOver").innerHTML = gameOverMsg;
    if (score == 255) return document.getElementById("win").innerHTML = winMsg + gameOverMsg;
    setTimeout(function onTick() 
   {    
     clearCanvas();
     drawNet();   
     movement();
     drawFood();  
     drawSnake();
     main();
   }, 100)
}

function drawSnakeBody(snakeBody) 
{  
    gameBoard_ctx.fillStyle = 'orange';  
    gameBoard_ctx.strokestyle = 'darkblue';
    gameBoard_ctx.fillRect(snakeBody.x, snakeBody.y, 25, 25);  
    gameBoard_ctx.strokeRect(snakeBody.x, snakeBody.y, 25, 25);
}
 
function drawSnake() 
{  
    snake.forEach(drawSnakeBody);
}

function clearCanvas() 
{
    gameBoard_ctx.fillStyle = '#87CEEB';
    gameBoard_ctx.strokestyle = 'black';
    gameBoard_ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    gameBoard_ctx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function drawNet()
{
    for(let i = 0; i < gameBoard.width; i += 25)
    {
        for(let j = 0; j < gameBoard.height; j += 25)
        {
            // Funkar inte att ändra färg?
            gameBoard_ctx.strokestyle = '#FFFFFF';
            gameBoard_ctx.strokeRect(i, j, 25, 25);
        }
    }
}

function movement() {
    const head = {x: snake[0].x + horizontal, y: snake[0].y + vertical};
    snake.unshift(head);
    const growSnake = snake[0].x === foodX && snake[0].y === foodY;
    if (growSnake) 
    {
        score += 1;
        document.getElementById('score').innerHTML = score;
        generate();
    } 
    else 
    {
        snake.pop();
    }
  }

function direction(event) 
{  
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;
 
    const keyPressed = event.keyCode;
    const goingUp = vertical === -25;
    const goingDown = vertical === 25;
    const goingRight = horizontal === 25;  
    const goingLeft = horizontal === -25;

    if (keyPressed === left && !goingRight)
    {    
        horizontal = -25;
        vertical = 0;  
    }
    if (keyPressed === up && !goingDown)
    {    
        horizontal = 0;
        vertical = -25;
    }
    if (keyPressed === right && !goingLeft)
    {    
        horizontal = 25;
        vertical = 0;
    }
    if (keyPressed === down && !goingUp)
    {    
        horizontal = 0;
        vertical = 25;
    }
}

function gameOver()
{  
    for (let i = 4; i < snake.length; i++)
    {    
        const collision = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (collision) 
        return true
    }
    const leftWall = snake[0].x < 0;  
    const rightWall = snake[0].x > gameBoard.width - 25;
    const topWall = snake[0].y < 0;
    const bottomWall = snake[0].y > gameBoard.height - 25;
 
    return leftWall ||  rightWall || topWall || bottomWall
}

function foodSpawn(min, max)
{  
    return Math.round((Math.random() * (max-min) + min) / 25) * 25;
}
 
function generate()
{  
    foodX = foodSpawn(0, gameBoard.width - 25);
    foodY = foodSpawn(0, gameBoard.height - 25);
    snake.forEach(function growSnake(part){
    const growSnake = part.x == foodX && part.y == foodY;
    if (growSnake) generate();});
}

function drawFood()
{
    gameBoard_ctx.fillStyle = 'lightgreen';
    gameBoard_ctx.strokestyle = 'darkgreen';
    gameBoard_ctx.fillRect(foodX, foodY, 25, 25);
    gameBoard_ctx.strokeRect(foodX, foodY, 25, 25);
}