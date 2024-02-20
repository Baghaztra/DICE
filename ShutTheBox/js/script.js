const box = document.getElementById('box');
const playerCount = document.getElementById('player');
const playButton = document.getElementById('play');
let player;

function start() {
    // console.log(typeof(parseInt(playerCount.value)));
    player = new Array(parseInt(playerCount.value));

    for (let i = 0; i < playerCount.value; i++) {
        player[i] = document.getElementById(`player${i + 1}`);
        for (let j = 1; j <= 12; j++) {
            const number = document.createElement('button');
            number.classList.add(`number-${j}`);
            number.innerText = j;
            player[i].appendChild(number);
        }
        const number = document.createElement('button');
        number.classList.add(`pass`);
        number.innerText = "pass";
        player[i].appendChild(number);

        console.log(`Player ${i + 1} `, player[i]);
        player[i].style.display = 'flex';
    }
    // console.log(playButton);
    playButton.style.display = 'none';
}
