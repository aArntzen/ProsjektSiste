const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameoverSound = document.getElementById("gameover");
const jumpCounter = document.getElementById("jumpCounter");
const highScoreDisplay = document.getElementById("highScore");

let character, obstacle;
let jumpCount = 0;
let highScore = localStorage.getItem("highScore") || 0;

highScoreDisplay.textContent = `High Score: ${highScore}`;

async function init() {
    character = {
        x: 50,
        y: canvas.height - 30,
        width: 30,
        height: 30,
        velocityY: 0,
        jumping: false
    };

    obstacle = {
        x: canvas.width - 40,
        y: canvas.height - 60,
        width: 40,
        height: getRandomHeight(),
        speed: 10
    };

    jumpCount = 0;
    updateJumpCounter();
}

async function startGame() {
    document.getElementById("startScreen").style.display = "none";
    canvas.style.display = "block";
    jumpCounter.style.display = "block";
    highScoreDisplay.style.display = "block";

    await init();

    update();
}

function getRandomHeight() {
    return Math.floor(Math.random() * 41) + 30;
}

function drawCharacter() {
    ctx.fillStyle = "blue";
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawObstacle() {
    ctx.fillStyle = "black";
    ctx.fillRect(obstacle.x, canvas.height - obstacle.height, obstacle.width, obstacle.height);
}

function jump() {
    if (!character.jumping) {
        character.velocityY = -10;
        character.jumping = true;
        jumpCount++;
        updateJumpCounter();
    }
}

function updateJumpCounter() {
    jumpCounter.textContent = `SCORE: ${jumpCount}`;
}

function updateHighScore() {
    if (jumpCount > highScore) {
        highScore = jumpCount;
        localStorage.setItem("highScore", highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

function update() {
    character.velocityY += 0.5;
    character.y += character.velocityY;

    if (character.y > canvas.height - character.height) {
        character.y = canvas.height - character.height;
        character.jumping = false;
    }

    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        obstacle.height = getRandomHeight();
    }

    if (
        character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x &&
        character.y + character.height > canvas.height - obstacle.height &&
        character.y < canvas.height
    ) {
        if (character.y + character.height - character.velocityY <= canvas.height - obstacle.height) {
            character.y = canvas.height - obstacle.height - character.height;
            character.velocityY = 0;
            character.jumping = false;
        } else {
            gameoverSound.currentTime = 0;
            gameoverSound.play();
            alert("Game Over, Du tapte. Start på nytt:");
            updateHighScore();
            resetGame();
            return;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCharacter();
    drawObstacle();

    requestAnimationFrame(update);
}

function resetGame() {
    init();
    update();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});
