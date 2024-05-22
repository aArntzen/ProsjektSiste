const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameoverSound = document.getElementById("gameover");
const jumpCounter = document.getElementById("jumpCounter");

let character, obstacle;
let jumpCount = 0;

function init() {
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

function getRandomHeight() {
    return Math.floor(Math.random() * 41) + 20;
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
    jumpCounter.textContent = `Score: ${jumpCount}`;
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
        character.y < canvas.height - obstacle.height + obstacle.height &&
        character.y + character.height > canvas.height - obstacle.height
    ) {
        gameoverSound.currentTime = 0;
        gameoverSound.play();
        alert("Game Over, Du tapte. Start på nytt:");
        resetGame();
        return;
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

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    canvas.style.display = "block";
    jumpCounter.style.display = "block";
    init();
    update();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

