/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var score, roundScore, activePlayer, gamePlaying, previousDice, scoreLimit, previousDice2;

init();

document.querySelector(".btn-roll").addEventListener("click", function(){
    if(gamePlaying)
    {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        document.querySelector(".dice").style.display = "block";
        document.querySelector(".dice2").style.display = "block";
        document.querySelector(".dice").src = "dice-" + dice + ".png";
        document.querySelector(".dice2").src = "dice-" + dice2 + ".png";

        if(dice !== 1 && dice2 !== 1)
        {
            roundScore += dice + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else
        {
            nextPlayer();
        }

        previousDice = dice;
        previousDice2 = dice2;
    }
});

document.querySelector(".btn-hold").addEventListener("click", function(){
    if(gamePlaying)
    {
        score[activePlayer] += roundScore;
    
        document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
    
        if(score[activePlayer] >= scoreLimit)
        {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
    
        }
        else
        {
            nextPlayer();
        }
    }
});

document.querySelector(".btn-submit").addEventListener("click", function(){
    scoreLimit = document.getElementById("set-score").value;
    if(scoreLimit == "")
    {
        scoreLimit = 100
    }
});

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init()
{
    score = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    scoreLimit = 100;

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1" ).textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");

}


