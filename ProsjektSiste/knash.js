const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gameoverSound = document.getElementById("gameover");
let character, obstacle;

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
        y: canvas.height - 80,
        width: 40,
        height: 80,
        speed: 10
    };
}

function drawCharacter() {
    ctx.fillStyle = "blue";
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawObstacle() {
    ctx.fillStyle = "black";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function jump() {
    if (!character.jumping) {
        character.velocityY = -14;
        character.jumping = true;
        obstacle.speed += 1;
    }
}

function update() {
    character.velocityY += 0.8;
    character.y += character.velocityY;

    if (character.y > canvas.height - character.height) {
        character.y = canvas.height - character.height;
        character.jumping = false;
    }

    obstacle.x -= obstacle.speed;
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
    }

    if (
        character.x < obstacle.x + obstacle.width &&
        character.x + character.width > obstacle.x &&
        character.y < obstacle.y + obstacle.height &&
        character.y + character.height > obstacle.y
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
    init();
    update();
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});