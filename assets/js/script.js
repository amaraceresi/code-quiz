var mainEl = document.querySelector("main");
var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#time-el")

var interval;
var time = 100;
var questionIndex = 0;
var score = 0;
var lastQuestionCorrect = 'Correct';

var questions = [ 
    {
        questionsText: "What is the tallest animal in the world?",
        questionChoices: ["Monkey","Giraffe","Elephant","Ostrich"],
        correctAnswer: 1
    },
    {
        questionsText: "How many legs does an octopus have?",
        questionChoices: ["Four","Six","Eight","Ten"],
        correctAnswer: 2
    },
    {
        questionsText: "Which is the only bird that can fly backwards?",
        questionChoices: ["Ostrich","Hummingbird","Falcon","Crow"],
        correctAnswer: 1
    },
    {
        questionsText: "How many years can a snail sleep?",
        questionChoices: ["Six","Two","Four","One"],
        correctAnswer: 0
    },
];    

function displayQuestion() {
    mainEl.innerHTML = "";

    if (questionIndex >= questions.length) {
        endGame();
        return;
    }

    var h1El = document.createElement('h1');
    h1El.textContent = questions[questionIndex].questionsText;
    mainEl.appendChild(h1El);
    
    var btnDivEl = document.createElement("div");
    mainEl.appendChild(btnDivEl);
    
    var pEl = document.createElement('p');
    
    btnDivEl.addEventListener("click", function(event) {
        var target = event.target;
        
        if (target.getAttribute("class") !== 'btn') return;
        
        var clickedQuestionIndex = parseInt(target.getAttribute("data-index"));
        
        console.log(clickedQuestionIndex);
        
        if (clickedQuestionIndex === questions[questionIndex].correctAnswer) {
            lastQuestionCorrect = "Correct"
            score = score + 1
        } else {
            time = time - 10;
            lastQuestionCorrect = "Incorrect"
        }
        pEl.textContent = lastQuestionCorrect;
        mainEl.appendChild(pEl);
        setTimeout(function() {
            questionIndex++;
            displayQuestion();
        }, 1000)
    });

    for (var i = 0; i < questions[questionIndex].questionChoices.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = questions[questionIndex].questionChoices[i];
        buttonEl.setAttribute("class","btn");
        buttonEl.setAttribute("data-index", i);
        btnDivEl.appendChild(buttonEl);
    }
};


startBtnEl.addEventListener("click", function (event) {
    mainEl.innerHTML = "";

    interval = setInterval(function() {
        time--;
        timerEl.textContent = `Time: ${time}`;

        if (time <= 0) {
            clearInterval(interval);
            endGame();
            return;
        }

    }, 1000);

    displayQuestion();

});

var prevScores = JSON.parse(localStorage.getItem("scores")) || []

function endGame() {
    clearInterval(interval);
    var outcome = document.createElement("h1")
    outcome.innerHTML = "You got a score of: " + score + "/4"
    mainEl.append(outcome)
    var input = document.createElement("input")
    input.setAttribute("placeholder", "Initials...")
    mainEl.append(input)
    var submitBtn = document.createElement("button")
    submitBtn.innerHTML = "Submit"
    mainEl.append(submitBtn)
    submitBtn.addEventListener("click", function() {
        var initials = input.value
        var info = {
            initials: initials,
            score: score
        }
        prevScores.push(info)
        localStorage.setItem("scores", JSON.stringify(prevScores))
    })
};

