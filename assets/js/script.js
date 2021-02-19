//code quiz intro & start button clicked

//Start quiz (need to do this), timer starts
var timerEl = document.querySelector(".timer");

var startEl = document.getElementById("start");

var secondsLeft = 75;

function setTimer() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }   //else if questions all answered
    }, 1000);
}

function sendMessage() {
    timerEl.textcontent = "Time is up. Game is over.";
}  //this is not happening

setTimer();

//question appears - multiple choice, 4 answers
//after question is answered, another question appears 4x, "Correct!" or "Wrong!" appears
//if question is answered incorrectly, time is subtracted from clock
//if all questions answered or timer = 0, game is over
//at end of game, user can save their initials & score - submit button

var initialsEl = document.querySelector("#user-initials");
var highScore;
var submitBtn = document.querySelector("#submit");

renderHighScores();

function addInitials(event) {
    event.preventDefault();
    var initialsEntered = initialsEl;
}

function renderHighScores() {
    var initials = localStorage.getItem("user-initials");
    var highScore = localStorage.getItem("score");
}

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var initials = document.querySelector("#user-initials");
    var highScore = document.querySelector("#score");

        localStorage.setItem("user-initials", initials);
        localStorage.setItem("score", highScore);
        renderHighScores();
});

//choose "go back" or "clear high scores" buttons
