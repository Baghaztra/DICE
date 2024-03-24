const boardElement = document.querySelector('.board');
const board = createRandomBoard();

var player1;
var player2;
var started = false;

console.log(board);

function start(){
    if (!started) {
        started = true;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const piece = document.createElement('div');
                piece.classList.add('item',board[i][j].colorClass);
                boardElement.appendChild(piece);
            }
        }
    }else{
        alert("the game already started");
function start() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const piece = document.createElement('div');
            piece.classList.add('item', board[i][j].colorClass);
            boardElement.appendChild(piece);
        }
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
