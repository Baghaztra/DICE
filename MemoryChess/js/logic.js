// variable
const boardElement = document.querySelector('.board');
const board = createRandomBoard();
const dice = document.querySelector('.dice');
const player1 = {
    playerElemet: document.getElementById('player1'),
    score: 0
}
const player2 = {
    playerElemet: document.getElementById('player2'),
    score: 0
}
var diceColorElement;
var started = false;
var firstTime = true;
var newDiceColor = "";
var diceColor = "";
var turn = "";
var openened = 0;

function start(){
    if (started) {
        started = false;
        location.reload();
    }else{
        document.getElementById('player').style.display = 'block';
        started = true;
        player1.playerElemet.classList.add('active');
        turn = 'player1';
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const piece = document.createElement('div');
                piece.classList.add('item',board[i][j].colorClass);
                boardElement.appendChild(piece);
            }
        }
        spawnTheDice();
    }
}

function createRandomBoard() {
    const board = Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () => {
            const colors = ['red', 'yellow', 'blue'];
            const randomIndex = Math.floor(Math.random() * colors.length);
            const color = colors[randomIndex];
            const colorClass = `color${colors.indexOf(color) + 1}`;
            const flipper = false;
            return { color, colorClass, flipper };
        })
    );
    return board;
};

function spawnTheDice() {
    diceColorElement = document.createElement('div');
    diceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
    diceColorElement.classList.add(diceColor);
    if (dice.hasChildNodes()) {
        dice.removeChild(dice.firstChild);
    }
    dice.appendChild(diceColorElement);

    dice.classList.toggle('flipped');
    dice.addEventListener('click', function () {
        dice.classList.toggle('flipped');
        newDiceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
        
        setTimeout(() => {
            dice.classList.toggle('flipped');
        }, 200);
        diceColorElement.classList.remove(diceColor);  
        diceColorElement.classList.add(newDiceColor);
        diceColor = newDiceColor;
    });
}

function nextTurn(_score){
    if (turn == 'player1') {
        player1.playerElemet.classList.remove('active');
        player2.playerElemet.classList.add('active');
        turn = 'player2';
        if(_score){
            player1.score++;
            player1.playerElemet.textContent = "Player 1: " + player1.score;
            openened++;
            if (openened >= 25) {
                gameOver();
            }
            rollTheDice();
        }
    }else{
        player2.playerElemet.classList.remove('active');
        player1.playerElemet.classList.add('active');
        turn = 'player1';
        if(_score){
            player2.score++;
            player2.playerElemet.textContent = "Player 2: " + player2.score;
            openened++;
            if (openened >= 25) {
                gameOver();
            }
            rollTheDice();
        }
    }
}

function rollTheDice(){
    diceColorElement = document.createElement('div');
    diceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
    diceColorElement.classList.add(diceColor);
    if (dice.hasChildNodes()) {
        dice.removeChild(dice.firstChild);
    }
    dice.appendChild(diceColorElement);
    dice.classList.toggle('flipped');
    newDiceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
    setTimeout(() => {
        dice.classList.toggle('flipped');
        diceColorElement.classList.remove(diceColor);  
        diceColorElement.classList.add(newDiceColor);
        diceColor = newDiceColor;
    }, 200);
}

function gameOver(){
    let winner = "";
    if (player1.score > player2.score) {
        winner = "Player 1 WIN";
    }else if (player1.score < player2.score) {        
        winner = "Player 2 WIN";
    }else{
        winner = "DRAW";
    }
    document.getElementById('gameover').innerText = winner;
    // document.getElementById('winner').aria('show')
    $('#winner').modal('show');
}