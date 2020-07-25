$(document).ready(function(){

    var startBtn = document.querySelector("#start-btn");
    var startPanel = document.querySelector(".start-panel");
    var timer = document.querySelector("#timer");
    var questionArea = document.querySelector(".question-area");
    var answerArea = document.querySelector("#answers");

    var questionIndex = 0;

    var questions = [
        { 
            question: "What is the HTML tag used to link a Javascript file?",
            answers: ["<h1>" , "<script>" , "<img>" , "<Javascript>"],
            correctAnswer: "<script>"
        } , 
        { 
            question: "Which of the following is a popular Javascript library?",
            answers: ["Java" , "Coffeebeans" , "JQuery" , "Bootstrap"],
            correctAnswer: "JQuery"
        } , 
        { 
            question: "How do you select an element using its ID in Javascript?",
            answers: ["document.getID()" , "document.selectQuery()" , "document.innerHTML" , "document.getElementByID()", "document.elementSelector()"],
            correctAnswer: "document.getElementByID()"
        } , 
        { 
            question: "Javascript and Java are the same language",
            answers: ["True" , "False"],
            correctAnswer: "False"
        } 

    ]

    var startTime = 75;

    function init(){
        questionArea.style.display = "none";
        startPanel.style.display = "block";
        
    }
    
    init();

    startBtn.addEventListener("click", function(){

        startPanel.style.display = "none";

        startTimer();

        questionArea.style.display = "block";

        renderQuestion();

    })

    answerArea.addEventListener("click", function(event){

        if (event.target.matches("button")){
            if (event.target.textContent === questions[questionIndex].correctAnswer){
                console.log("You got it right!");
            } else {
                console.log("You got it wrong dumb dumb!")
            }
        }

    })

    function startTimer(){

        timer.textContent = startTime;

        var interval = setInterval(function(){

            if (startTime >0){
                startTime--;
                timer.textContent = startTime;
            } else {
                clearInterval(interval);
            }

        }, 1000);

    }

    function renderQuestion(){

        document.querySelector("#question").textContent = questions[questionIndex].question;
        

        for (var i = 0; i < questions[questionIndex].answers.length; i++){
            var answerOption = document.createElement("button");
            answerOption.textContent = questions[questionIndex].answers[i];
            answerOption.setAttribute("class", "btn btn-primary my-2 quiz-answer");
            answerOption.style.display = "block";
            answerArea.appendChild(answerOption);
        }
    }





});