var player1Name = prompt('Enter player 1:');
var player2Name = prompt('Enter player 2:');
var scoreboard = [0,0];
var player0, player1, currentPlayer, playerArr;

var game = {
    
    rollDice: () => {
        return Math.floor( Math.random() * 6 + 1 );
    },

    init: () => {
        player0 = {
            name: player1Name,
            currentScore: 0,
            totalScore: 0,
        };
        player1 = {
            name: player2Name,
            currentScore: 0,
            totalScore: 0,
        };

        playerArr = [player0, player1];
        console.log(playerArr);

        for (let index = 0; index < playerArr.length; index++) {
            document.getElementById('name-' + index).textContent = playerArr[index].name;
            document.getElementById('score-' + index).textContent = 0;
            document.getElementById('current-' + index).textContent = 0;
        }
        currentPlayer = 0;
        document.getElementById('dice').style.display = 'none';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
    },

    changeCurrentPlayer: () => {
        document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');
    },

    updateScoreboard: () => {
        document.getElementById('global-score').textContent = scoreboard[0].toString() + ' - ' + scoreboard[1].toString();
    }

}


game.init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    var diceValue = game.rollDice();
    console.log('value of dice: ' + diceValue +
     ' (Player ' + (currentPlayer + 1) + ')');

    var diceDOM = document.getElementById('dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'resources/dice-' + diceValue + '.png';

    

    if (diceValue !== 1) {
        playerArr[currentPlayer].currentScore += diceValue;
        document.getElementById('current-' + currentPlayer).textContent = 
            playerArr[currentPlayer].currentScore;

    } else {
        playerArr[currentPlayer].currentScore = 0;
        document.getElementById('current-' + currentPlayer).textContent = 
            playerArr[currentPlayer].currentScore;
        
        game.changeCurrentPlayer();
        diceDOM.style.display = 'none';

    }
     
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    console.log(playerArr[currentPlayer]);
    playerArr[currentPlayer].totalScore += playerArr[currentPlayer].currentScore;
    playerArr[currentPlayer].currentScore = 0;
    console.log(playerArr[currentPlayer]);

    document.getElementById('current-' + currentPlayer).textContent = 0;
    document.getElementById('score-' + currentPlayer).textContent = 
        playerArr[currentPlayer].totalScore;

    if (playerArr[currentPlayer].totalScore >= 20) {
        console.log('Player ' + (currentPlayer + 1) + ' won the match!');
        scoreboard[currentPlayer] += 1;
        game.updateScoreboard();
        document.getElementById('dice').style.display = 'none';
        document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
        console.log('Next player!');
        document.getElementById('dice').style.display = 'none';
        game.changeCurrentPlayer();
    }
    
});

document.querySelector('.btn-new').addEventListener('click', () => {
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    game.init();
});





