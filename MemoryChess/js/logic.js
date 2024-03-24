// variable
const boardElement = document.querySelector('.board');
const board = createRandomBoard();
const dice = document.querySelector('.dice');

var player1;
var player2;
var started = false;

var firstTime = true;
var diceColor = "";

console.log(board);

function start(){
    if (started) {
        started = false;
        location.reload();
    }
    started = true;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const piece = document.createElement('div');
            piece.classList.add('item',board[i][j].colorClass);
            boardElement.appendChild(piece);
        }
    }
    rollTheDice();
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

function rollTheDice() {
    const diceColorElement = document.createElement('div');
    diceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
    diceColorElement.classList.add(diceColor);

    if (dice.hasChildNodes()) {
        dice.removeChild(dice.firstChild);
    }
    dice.appendChild(diceColorElement);

    // Menambahkan event listener untuk mengubah kelas 'flipped' ketika dadu diklik
    dice.addEventListener('click', function () {
        // Menghapus kelas 'flipped' jika sudah ada, atau menambahkannya jika belum ada
        dice.classList.toggle('flipped');
        
        // Menghasilkan warna dadu baru setiap kali diklik
        const newDiceColor = 'color' + (Math.floor(Math.random() * 3) + 1);
        
        if (firstTime) {
            firstTime = false;
        }else{
            setTimeout(() => {
                dice.classList.toggle('flipped');
            }, 200);
        }
        // Menghapus kelas warna yang lama
        diceColorElement.classList.remove(diceColor);
        
        // Menambahkan kelas warna yang baru
        diceColorElement.classList.add(newDiceColor);

        // Mengupdate variabel diceColor dengan warna yang baru
        diceColor = newDiceColor;
    });
}