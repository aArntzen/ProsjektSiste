const customizescreen = document.getElementById("customizescreen");
const startScreen = document.getElementById("startScreen");
const intro = document.getElementById("intro");

function tostartscreen() {
    intro.classList.add("fade-out");

    setTimeout(function () {
        intro.style.display = "none";
        startScreen.style.display = "block";
    }, 1500);
}

function customize() {
    startScreen.classList.add("fade-out");

    setTimeout(function () {
        startScreen.style.display = "none";
        customizescreen.style.display = "block";
    }, 1500);
}