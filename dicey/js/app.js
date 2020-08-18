var player1Name = prompt('Enter player 1 (max. 8 characters):');
var player2Name = prompt('Enter player 2 (max. 8 characters):');
player1Name = player1Name && player1Name.length < 9 ? player1Name : 'Player 1';
player2Name = player2Name && player2Name.length < 9 ? player2Name : 'Player 2';

var scoreboard = [0,0];

var player0, player1, currentPlayer, playerArr, isMatchPlaying, scoreCeiling, previousDiceRoll = [0, 0];
var firstDieDOM = document.getElementById('dice-0');
var secondDieDOM = document.getElementById('dice-1');
var scoreboardDOM = document.getElementById('scoreboard');
var scoreCeilingDOM = document.getElementById('score-ceiling-input');

var scoreCeilingDefaultValue = 100;

var game = {
    
    rollDice: () => {
        return Math.floor( Math.random() * 6 + 1 );
    },

    liftDice: () => {
        firstDieDOM.style.display = 'none';
        secondDieDOM.style.display = 'none';
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
        for (let index = 0; index < playerArr.length; index++) {
            document.getElementById('name-' + index).textContent = playerArr[index].name;
            document.getElementById('score-' + index).textContent = 0;
            document.getElementById('current-' + index).textContent = 0;
        }
        isMatchPlaying = true;
        game.liftDice();

        currentPlayer = 0;
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('active');
        
        if (!scoreCeilingDOM.value) {
            scoreCeilingDOM.value = scoreCeilingDefaultValue;
        }
       
    },

    changeCurrentPlayer: () => {
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    },

    updateScoreboard: () => {
        scoreboardDOM.textContent = `${scoreboard[0]} - ${scoreboard[1]}`;
    }

}


game.init();

document.querySelector('.btn-roll').addEventListener('click', () => {
    if ( isMatchPlaying ) {
        var firstDieValue = game.rollDice();
        var secondDieValue = game.rollDice();
       
        previousDiceRoll = [firstDieValue, secondDieValue];

        firstDieDOM.style.display = 'block';
        secondDieDOM.style.display = 'block';
        firstDieDOM.src = 'resources/dice-' + firstDieValue + '.png';
        secondDieDOM.src = 'resources/dice-' + secondDieValue + '.png';

        if (previousDiceRoll[0] === 6 &&
            previousDiceRoll[1] === 6 &&
            firstDieValue       === 6 &&
            secondDieValue      === 6) {
            playerArr[currentPlayer].totalScore = playerArr[currentPlayer].currentScore = 0;
            document.getElementById('current-' + currentPlayer).textContent = 0;
            document.getElementById('score-' + currentPlayer).textContent = 0;
            
            game.changeCurrentPlayer();
            setTimeout(game.liftDice, 1500);

            previousDiceRoll = [0, 0];

        } else if (firstDieValue === 1 || secondDieValue === 1) {
            playerArr[currentPlayer].currentScore = 0;
            document.getElementById('current-' + currentPlayer).textContent = playerArr[currentPlayer].currentScore;

            game.changeCurrentPlayer();
            setTimeout(game.liftDice, 1500);

            previousDiceRoll = [0, 0];

        } else {
            playerArr[currentPlayer].currentScore += firstDieValue + secondDieValue;
            document.getElementById('current-' + currentPlayer).textContent = playerArr[currentPlayer].currentScore;

            previousDiceRoll = [firstDieValue, secondDieValue];
        }
    }  
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if ( isMatchPlaying ) {
        playerArr[currentPlayer].totalScore += playerArr[currentPlayer].currentScore;
        playerArr[currentPlayer].currentScore = 0;

        document.getElementById('current-' + currentPlayer).textContent = 0;
        document.getElementById('score-' + currentPlayer).textContent = playerArr[currentPlayer].totalScore;

        if (scoreCeilingDOM.value) {
            scoreCeilingValue = scoreCeilingDOM.value;

        } else {
            scoreCeilingDOM.value = scoreCeilingDefaultValue;
            scoreCeilingValue = scoreCeilingDefaultValue
        }

        if (playerArr[currentPlayer].totalScore >= scoreCeilingValue) {
            isMatchPlaying = false;
            scoreboard[currentPlayer] += 1;
            game.updateScoreboard();
            game.liftDice();
            document.getElementById('name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');

        } else {
            console.log('Next player!');
            game.liftDice();
            game.changeCurrentPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', () => {
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
    game.init();
});

function onlyDigit ( event ) {
    return scoreCeilingDOM.value.length >= 1 ? /[0-9]/.test(event.key) : /[1-9]/.test(event.key); 
}





