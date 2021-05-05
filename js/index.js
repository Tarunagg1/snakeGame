let inputDir = {
    x: 0,
    y: 0
}

const foodSound = new Audio('music/food.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const sc = document.getElementById("score");
let speed = 4;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 12 },
];
let food = { x: 6, y: 7 }

// game function

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    // console.log('ijuh');
    lastPaintTime = ctime;
    gameEngin();
}

function isColied(snArr) {
    // console.log('ijuh');
    for (let i = 1; i < snArr.length; i++) {
        if (snArr[i].x === snArr[0].x && snArr[i].y === snArr[0].y) {
            return true;
        }
    }
    if (snArr[0].x >= 18 || snArr[0].x <= 0 || snArr[0].y >= 18 || snArr[0].y <= 0) {
        return true;
    }
    // return false
}

function gameEngin() {
    // part 1 updateing snake array
    if (isColied(snakeArr)) {
        musicSound.pause();
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over Press any key to paly again");
        snakeArr = [{ x: 13, y: 12 }];
        score = 0;
    }

    /// if u have eten food then increment score and regnerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        const a = 2;
        const b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score++;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval))
            highScorebox.innerHTML = `high Score is: ${highscoreval}`
        }
        if (score > 10) {
            speed++;
        }
        sc.innerHTML = "Score is: " + score;
    }

    /// mooving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // part 2 /// display the snake and food

    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        snakeElement.classList.add('snakebody')
        board.appendChild(snakeElement);
    })
    musicSound.play();

    /// Display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// main logic
let highscore = localStorage.getItem("highscore");
if (highscore == null) {
    let highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
} else {
    highscoreval = JSON.parse(localStorage.getItem('highscore'));
    console.log(highscoreval);
    highScorebox.innerHTML = `high Score is: ${highscore}`
}

window.requestAnimationFrame(main)

window.addEventListener('keydown', (e) => {
    // alert(e)
    inputDir = { x: 0, y: 1 }; // start game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            // console.log('arrup');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            // console.log('arrowd');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            // console.log('arrle');
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            // console.log('arrri');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})
