$(document).ready(function () {

    //Grab DOM elements
    var startPanel = document.querySelector(".start-panel");
    var endPanel = document.querySelector(".end-panel");
    var scoresPanel = document.querySelector(".scores-panel");
    var scoresBtn = document.querySelector(".hi-scores-btn");
    var timer = document.querySelector("#timer");
    var questionArea = document.querySelector(".question-area");
    var answerArea = document.querySelector("#answers");

    // Set variables
    var questionIndex = 0;
    var score = 0;
    var time = 75;
    var interval;
    var alertTimeout;

    // Add high scores bank
    var highScores = [];

    // Add question bank
    var questions = [
        {
            question: "What is the HTML tag used to link a Javascript file?",
            answers: ["<h1>", "<script>", "<img>", "<Javascript>"],
            correctAnswer: "<script>"
        },
        {
            question: "Which of the following is a popular Javascript library?",
            answers: ["Java", "Coffeebeans", "JQuery", "Bootstrap"],
            correctAnswer: "JQuery"
        },
        {
            question: "How do you select an element using its ID in Javascript?",
            answers: ["document.getID()", "document.selectQuery()", "document.innerHTML", "document.getElementByID()", "document.elementSelector()"],
            correctAnswer: "document.getElementByID()"
        },
        {
            question: "Javascript and Java are the same language.",
            answers: ["True", "False"],
            correctAnswer: "False"
        },
        {
            question: "Which of the following is NOT an HTML element?",
            answers: ["Div", "Section", "ID", "Anchor Link"],
            correctAnswer: "ID"
        },
        {
            question: "Which of the following is not an operator?",
            answers: ["@", "+", "*", "==="],
            correctAnswer: "@"
        },
        {
            question: "Javascript is one of the 3 main languages of the modern web.",
            answers: ["True", "False"],
            correctAnswer: "True"
        },
        {
            question: "What do you assign to an HTML element to give it functionality when clicked?",
            answers: ["On Click", "Event Listener", "CSS", "Query Selector"],
            correctAnswer: "Event Listener"
        },
        {
            question: "Which of the following is not a Javascript keyword?",
            answers: ["func", "return", "var", "if"],
            correctAnswer: "func"
        },
        {
            question: "'1' === 1",
            answers: ["True", "False"],
            correctAnswer: "False"
        }

    ]

    // Initialize quiz

    function init() {
        //Reset variables
        reset();
        //Hide questions and show start panel
        questionArea.style.display = "none";
        startPanel.style.display = "block";
    }

    init();

    // Reset variables
    function reset() {
        time = 75;
        score = 0;
        questionIndex = 0;

        timer.textContent = time;
    }

    // Start Quiz button
    document.querySelector(".start-btn").addEventListener("click", function () {
        //Hide the start panel
        startPanel.style.display = "none";
        endPanel.style.display = "none";
        scoresBtn.style.display = "none";

        //Start the timer
        startTimer();

        //Display the question area
        questionArea.style.display = "block";

        //Render the first question
        renderQuestion();

    })

    // Return to main menu buttons
    document.querySelectorAll(".menu-btn").forEach(element => {
        element.addEventListener("click", function () {

            //Hide the start panel
            startPanel.style.display = "block";
            scoresBtn.style.display = "block";
            endPanel.style.display = "none";
            scoresPanel.style.display = "none";

            reset();

        });

    });

    //When we click an answer
    answerArea.addEventListener("click", function (event) {

        //check that we clicked a button
        if (event.target.matches("button")) {
            //If user's answer is correct...
            if (event.target.textContent === questions[questionIndex].correctAnswer) {
                //Add 10 points
                score += 10;
                displayAlert(true);
            } else {
                //subtract 10 seconds
                time -= 10;
                //update the timer
                timer.textContent = time;
                displayAlert(false);
            }
            //Go to the next question and render
            questionIndex++;
            renderQuestion();
        }

    })

    //Start the timer
    function startTimer() {

        //Set HTML to display current time
        timer.textContent = time;

        //Every 1 second, decrement the timer
        interval = setInterval(function () {

            if (time > 0) {
                time--;
                timer.textContent = time;
            } else {
                endGame();
            }

        }, 1000);

    }

    // Display an alert to the user
    function displayAlert(status) {

        var alertArea = $("#alert-area");

        //clear the alert if theres one already there
        clearTimeout(alertTimeout);

        alertArea.fadeIn("fast");
        if (status) {
            alertArea.html("<div class='alert alert-success w-75 mx-auto' role='alert'> <strong>Correct!</strong> +10 points!</div>");
        } else {
            alertArea.html("<div class='alert alert-danger w-75 mx-auto' role='alert'> <strong>Wrong!</strong> -10 seconds.</div>");
        }

        alertTimeout = setTimeout(function () { alertArea.fadeOut("slow"); }, 1000);
    }


    //Render the current question at questionIndex
    function renderQuestion() {

        if (questions[questionIndex]) {

            //Update the question text
            document.querySelector("#question").textContent = questions[questionIndex].question;

            //Clear the previous answers, if any
            answerArea.innerHTML = "";

            //Add each potential answer button
            for (var i = 0; i < questions[questionIndex].answers.length; i++) {
                var answerOption = document.createElement("button");
                answerOption.textContent = questions[questionIndex].answers[i];
                answerOption.setAttribute("class", "btn btn-primary my-2 quiz-answer");
                answerOption.style.display = "block";
                answerArea.appendChild(answerOption);
            }
        } else {
            // If out of questions, end game
            endGame();
        }


    }

    // End game function
    function endGame() {
        clearInterval(interval);
        document.querySelector(".final-score span").textContent = score;
        questionArea.style.display = "none";
        endPanel.style.display = "block";
    }

    // Display the high scores panel

    function displayHighScores() {
        scoresBtn.style.display = "none";
        startPanel.style.display = "none";
        endPanel.style.display = "none";
        scoresPanel.style.display = "block";

        var scoresList = document.querySelector(".high-scores-list");

        //Clear the previous list
        scoresList.innerHTML = "";

        //Render the high scores list

        if (localStorage.getItem("highScores")) {

            // Get the high scores
            highScores = JSON.parse(localStorage.getItem("highScores"));

        }

        // Sort the high scores by value
        highScores.sort( function(a, b){
            return parseInt(b.score) - parseInt(a.score);
        })

        highScores.forEach(item => {

            var scoreDiv = document.createElement("div");
            scoreDiv.innerHTML = "<h2>" + item.name + " : " + item.score + " points</h2>";

            scoresList.appendChild(scoreDiv);
        });
    }

    // If we click the high score button, show the high scores panel
    scoresBtn.addEventListener("click", displayHighScores);

    document.querySelector(".clear-scores-btn").addEventListener("click", function () {
        localStorage.setItem("highScores", JSON.stringify([]));
        document.querySelector(".high-scores-list").innerHTML = "";
    });

    // If we click save, save the user's high score
    document.querySelector("#save-btn").addEventListener("click", function (e) {
        // prevent page reload
        e.preventDefault();

        // Grab the name input field
        var nameInput = document.querySelector("#name-input");

        // if there is a value in Name field, save
        if (nameInput.value) {

            if (localStorage.getItem("highScores")) {
                highScores = JSON.parse(localStorage.getItem("highScores"));
            }

            // Create an object with name and score
            var highScore = {
                name: nameInput.value,
                score: score
            }

            //Push the object into the highscores array
            highScores.push(highScore);

            // Store the high scores array as a string
            localStorage.setItem("highScores", JSON.stringify(highScores));

            // Reset the name input field
            nameInput.value = "";

        }

    })



});