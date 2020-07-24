$(document).ready(function(){

    var startBtn = document.querySelector("#start-btn");
    var startPanel = document.querySelector(".jumbotron");
    var timer = document.querySelector("#timer");
    var container = document.querySelector(".container");

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

    startBtn.addEventListener("click", function(){

        startPanel.style.display = "none";

        startTimer();

        container.innerHTML = "<h1>Question goes here</h1>"

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



});