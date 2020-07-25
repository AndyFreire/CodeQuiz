$(document).ready(function () {

    //Grab DOM elements
    var startPanel = document.querySelector(".start-panel");
    var endPanel = document.querySelector(".end-panel");
    var timer = document.querySelector("#timer");
    var questionArea = document.querySelector(".question-area");
    var answerArea = document.querySelector("#answers");

    // Set variables
    var questionIndex = 0;
    var score = 0;
    var time = 75;
    var interval;

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
            question: "Javascript and Java are the same language",
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

    function reset() {
        time = 75;
        score = 0;
        questionIndex = 0;
    }

    init();

    document.querySelectorAll(".start-btn").forEach(element => {
        element.addEventListener("click", function () {

            //Hide the start panel
            startPanel.style.display = "none";
            endPanel.style.display = "none"; 
    
            reset();
    
            //Start the timer
            startTimer();
    
            //Display the question area
            questionArea.style.display = "block";
    
            //Render the first question
            renderQuestion();
    
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
            } else {
                //subtract 10 seconds
                time -= 10;
                //update the timer
                timer.textContent = time;
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
            endGame();
        }


    }

    function endGame() {
        clearInterval(interval);
        document.querySelector(".final-score span").textContent = score;
        questionArea.style.display = "none";
        endPanel.style.display = "block";
    }


    document.querySelector("#save-btn").addEventListener("click", function(e){
        e.preventDefault();
        
    })



});