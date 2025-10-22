let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    
    let randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
}