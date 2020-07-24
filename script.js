$(document).ready(function(){

    var startBtn = document.querySelector("#start-btn");
    var startPanel = document.querySelector(".jumbotron");
    var timer = document.querySelector("#timer");

    var startTime = 75;

    startBtn.addEventListener("click", function(){

        startPanel.style.display = "none";

        startTimer();

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