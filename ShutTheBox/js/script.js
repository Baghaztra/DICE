const box = document.getElementById('box');
const playerCount = document.getElementById('player');
const playButton = document.getElementById('play');
const dice = document.querySelector(".dice");
let player;
let nowDice = 0;

function start() {
    player = new Array(parseInt(playerCount.value));
    if (playerCount.value > 0 && playerCount.value <= 4) {
        for (let i = 0; i < playerCount.value; i++) {
            player[i]=  {
                playerElement: document.getElementById(`player${i+1}`),
                numberPick: 0,
                active: true,
            }
            for (let j = 1; j <= 12; j++) {
                const number = document.createElement('button');
                number.classList.add(`number-${j}`);
                number.innerText = j;
        
                number.addEventListener('click', function() {
                    choose(j, i);
                });
        
                player[i].playerElement.appendChild(number);
            }
        
            const passButton = document.createElement('button');
            passButton.classList.add(`pass`);
            passButton.innerText = "pass";
        
            passButton.addEventListener('click', function() {
                pass(i);
            });
        
            player[i].playerElement.appendChild(passButton);
        
            console.log(`Player ${i + 1} `, player[i]);
            player[i].playerElement.style.display = 'flex';
        }
        
        // console.log(playButton);
        playButton.style.display = 'none';
        dice.style.display = 'block';
    }else{
        const notifikasi = document.createElement('p');
        notifikasi.classList.add("text-danger");
        notifikasi.innerText = `Masukkan jumlah pleyer 1 - 4`;
        playButton.appendChild(notifikasi);
    }
}

function rollTheDice() {
    let rand = Math.floor(Math.random() * 6) + 1;
    dice.innerHTML = `<i class="dice bi bi-dice-${rand}"></i></i>`;
    nowDice = rand;
    console.log("Pilih nomor berjumlah ", nowDice);
}


function choose(buttonNum, playerNum){
    player[playerNum].numberPick += buttonNum;
    console.log(`Player${playerNum+1} picked ${buttonNum}`);
}

function pass(playerNum){
    player[playerNum].numberPick = 0;
    console.log(`Player${playerNum+1} pass`);
}