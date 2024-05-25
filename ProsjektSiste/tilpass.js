const customizescreen = document.getElementById("customizescreen");

function customize() {
    var startScreen = document.getElementById("startScreen");
    startScreen.classList.add("fade-out");
    
    setTimeout(function() {
        startScreen.style.display = "none";
        customizescreen.style.display = "block";
    }, 2000);
}