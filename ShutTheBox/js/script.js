const box = document.getElementById('box');
const playerCount = parseInt(document.getElementById('player').value);
console.log(playerCount);
const player = new Array[playerCount];

for (let i = 0; i < playerCount; i++) {
    player[i]=  document.getElementById(`player${i+1}`);
    for (let j = 1; j < 12; j++) {
        const number = document.createElement('div');
        number.classList.add(`number-${j}`);
        player[i].appendChild(number);
        console.log(player[i]);
    }
}
