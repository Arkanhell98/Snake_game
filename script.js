const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".high-score");

let gameOver= false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let speedX = 0, speedY = 0;
let snakeBody = [];
let setIntervalID;
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

highscoreElement.innerHTML = `High Score: ${highScore}`

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random()  * 30) +1;
    foodY = Math.floor(Math.random()  * 30) +1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalID)
    alert("¡Game Over!");
    location.reload();
}
const changeDirection = (e) => {
    if(e.key === "ArrowUp" && speedY != 1){
        speedX = 0;
        speedY = -1;
    }
    else if(e.key === "ArrowDown" && speedY != -1){
        speedX = 0;
        speedY = 1;
    } 
    else if(e.key === "ArrowLeft" && speedX != 1){
        speedX = -1;
        speedY = 0;
    }
    else if(e.key === "ArrowRight" && speedX != -1){
        speedX = 1;
        speedY = 0;
    }
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
        score++;

        highScore = score >= highScore ? score: highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`

        highscoreElement.innerHTML = `High Score: ${highScore}`
    }

    for(let i = snakeBody.length -1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];
    snakeX += speedX;
    snakeY += speedY;
    
if(snakeX <= 0 || snakeX >30 || snakeY <= 0 || snakeY > 30){
    gameOver = true

}

    for(let i = 0; i < snakeBody.length; i++){
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition();
setIntervalID = setInterval(initGame, 125);
document.addEventListener("keydown",changeDirection);