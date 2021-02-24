var timerEl = document.querySelector(".timer");
var secondsLeft = 75;
var timerInterval;

var startButton = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerButtonsEl = document.getElementById('answer-buttons')

var currentQuestionIndex = 0;
var questionsCorrect = 0;

var initialsEl = document.querySelector("#user-initials");
var submitBtn = document.querySelector("#submit");
var highScore;


startButton.addEventListener('click', startGame)

//if all questions answered or timer = 0, game is over
function setTimer() {
    currentQuestionIndex = 0;
    secondsLeft = 75;
    questionsCorrect = 0;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = ("Time: ") + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            addScoreTotal();
        }
    }, 1000);
}

//Start quiz, hide pg
function startGame() {
    var startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');
    //currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    timerInterval = setInterval(setTimer, 1000);
    showQuestion()
}

//question appears - multiple choice, 4 answers
function showQuestion(question) {
    questionEl.innerHTML = "";
    //answerButtonsEl.innerHTML = "";

    var currentQuestion = questions[currentQuestionIndex].question;
    var currentAnswers = questions[currentQuestionIndex].choices;

    //var questionHeaderEl = document.getElementById('question');
    questionEl.textContent = currentQuestion;
    questionContainerEl.appendChild(questionEl);

    currentAnswers.forEach(choice => {
        var button = document.createElement('button');
        //button.innerText = choice.text;
        button.textContent = choice;
        button.classList.add('btn');

        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button);

    })
    questionContainerEl.appendChild(answerButtonsEl);
}

function selectAnswer(event) {
    var selectedButton = event.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass() //need to finish this function
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
    }
}

//after question is answered, another question appears 4x, "Correct!" or "Wrong!" appears
//if question is answered incorrectly, 10 secs are subtracted from clock


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
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

renderHighScores();

function addInitials(event) {
    event.preventDefault();
    var initialsEntered = initialsEl;
}

function renderHighScores() {
    var initials = localStorage.getItem("user-initials");
    var highScore = localStorage.getItem("score");
}

/*submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    var initials = document.querySelector("#user-initials");
    var highScore = document.querySelector("#score");



        localStorage.setItem("user-initials", initials);
        localStorage.setItem("score", highScore);
        renderHighScores(
}); */

//choose "go back" or "clear high scores" buttons
