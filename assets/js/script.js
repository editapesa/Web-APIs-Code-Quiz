var timerEl = document.getElementById('time');
var secondsLeft = 75;
var timerInterval;

var startButton = document.getElementById('start-btn')
var questionEl = document.getElementById('question-container')

var answerButtonsEl = document.getElementById('answer-buttons')
var rightOrWrong = document.getElementById('right-wrong')

var currentQuestionIndex = 0;

var initialsEl = document.getElementById("user-initials");
var submitBtn = document.getElementById("submit");

//Start quiz, hide pg
function startGame() {
    var startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');
    questionEl.removeAttribute('class');
    timerInterval = setInterval(setTimer, 1000);
    timerEl.textContent = secondsLeft;
    showQuestion();
}

//question appears - multiple choice, 4 answers
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionHeader = document.getElementById('question-header');
    questionHeader.textContent = currentQuestion.question;

    answerButtonsEl.innerHTML = "";
    
    currentQuestion.choices.forEach(function(choice, i) {
        var answerChoice = document.createElement('button');
        answerChoice.setAttribute('class', 'choice');
        answerChoice.setAttribute('value', choice);

        answerChoice.textContent = i + 1 + '. ' + choice;

        answerChoice.onclick = selectAnswer;
        answerButtonsEl.appendChild(answerChoice);

    });
}


//after question is answered, another question appears 4x, "Correct!" or "Wrong!" appears
//if question is answered incorrectly, 10 secs are subtracted from clock
function selectAnswer() {
    
    if (this.value !== questions[currentQuestionIndex].answer) {
        secondsLeft -= 15;

        if (secondsLeft < 0) { 
            secondsLeft = 0;
    }

    timerEl.textContent = secondsLeft;

    rightOrWrong.textContent = "Wrong"

    } else {
        rightOrWrong.textContent = "Correct";
    }

    rightOrWrong.setAttribute("class", "right-wrong");
    setTimeout(function() {
        rightOrWrong.setAttribute('class', 'right-wrong hide');
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        addScoreTotal();
    } else {
        showQuestion();
    }
}

function addScoreTotal () {
    clearInterval(timerInterval);

    var gameEnd = document.getElementById('game-end');
    gameEnd.removeAttribute('class');

    var finalScore = document.getElementById('score');
    finalScore.textContent = secondsLeft;

    questionEl.setAttribute('class', 'hide');
}

function setTimer() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    if (secondsLeft <= 0) {
        addScoreTotal();
    }
}

var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ____.",
        choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        answer: "3. parentheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
]


//at end of game, user can save their initials & score - submit button

function saveHighScores() {
    var initials = initialsEl.value.trim();
    
    if (initials !== "") {
        var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
        var newScore = {
            score: secondsLeft,
            initials: initials
        };

        //save to local storage
        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScores();
    }
}

submitBtn.onclick = saveHighScores;

startButton.onclick = startGame;

initialsEl.onkeyup = checkForEnter;



