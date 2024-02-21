const box = document.getElementById('box');
const playerCount = document.getElementById('player');
const playButton = document.getElementById('play');
const dice = document.querySelector(".dice");
let number;
let player;
let nowDice = 0;
let turn = 0;

function start() {
    player = new Array(parseInt(playerCount.value));
    number = new Array(parseInt(playerCount.value));
    if (playerCount.value > 0 && playerCount.value <= 4) {
        for (let i = 0; i < playerCount.value; i++) {
            player[i] = {
                playerElement: document.getElementById(`player${i + 1}`),
                numberPick: 0,
                pass: true,
                active: true,
                pickedNumbers: Array(10).fill(false),
                passButton: null,
            }
            number[i] = new Array(10);
            for (let j = 1; j <= 10; j++) {
                const n = document.createElement('button');
                number[i][j - 1] = n
                number[i][j - 1].classList.add(`number-${j}`);
                number[i][j - 1].innerText = j;

                number[i][j - 1].addEventListener('click', function () {
                    choose(j, i, number[i][j - 1]);
                });

                player[i].playerElement.appendChild(number[i][j - 1]);
            }

            const passButton = document.createElement('button');
            passButton.classList.add(`pass`);
            passButton.innerText = "pass";
            player[i].passButton = passButton;

            passButton.addEventListener('click', function () {
                pass(i, passButton);
            });

            player[i].playerElement.appendChild(passButton);

            console.log(`Player ${i + 1} `, player[i]);
            player[i].playerElement.style.display = 'flex';
        }

        // console.log(playButton);
        playButton.style.display = 'none';
        dice.style.display = 'block';
    } else {
        const notifikasi = document.createElement('p');
        notifikasi.classList.add("notif");
        notifikasi.innerText = `Masukkan jumlah player 1 - 4`;
        playButton.appendChild(notifikasi);
    }
}

function rollTheDice() {
    if (someoneWon() === true) {
        const winner = document.getElementById('whoWon');
        winner.innerHTML = `<h1>${whoWon()}</h1>`;
        $('#winner').modal('show');

    } else if (done()) {
        for (let i = 0; i < playerCount.value; i++) {
            player[i].numberPick = 0;
            console.log(`[Holding] Player ${i + 1}: ${player[i].numberPick}`);
            player[i].passButton.classList.remove('picked-hold');
        }
        for (let i = 0; i < parseInt(playerCount.value); i++) {
            for (let j = 0; j < 10; j++) {
                if (number[i][j].classList.contains('picked')) {
                    number[i][j].classList.add('picked-hold');
                    number[i][j].classList.remove('picked');
                    number[i][j].removeEventListener('click', function () {
                        choose(j, i, number[i][j - 1]);
                    });
                }
            }
        }
        let rand1 = Math.floor(Math.random() * 6) + 1;
        let rand2 = Math.floor(Math.random() * 6) + 1;
        dice.innerHTML = `<i class="dice dice1 bi bi-dice-${rand1}"></i> <i class="dice dice2 bi bi-dice-${rand2}"></i>`;
        nowDice = rand1 + rand2;
        console.log("[Rolling the dice] Pilih nomor berjumlah ", nowDice);
        turn++;
    } else {
        console.log("[Rolling the dice] Belum semua player siap ", player);
    }
}

function done() {
    for (let i = 0; i < playerCount.value; i++) {
        if (player[i].numberPick != nowDice) {
            console.log(`[Belum memenuhi] Player ${i + 1} belum siap`);
            // console.log(player[i].numberPick,' != ', nowDice);
            return false;
        }
    }
    return true;
}

function someoneWon() {
    for (let i = 0; i < playerCount.value; i++) {
        const pickedNumbers = player[i].pickedNumbers;
        if (pickedNumbers.every(num => num === true)) {
            // Jika ada pemain yang belum memilih semua nomor
            return true;
        }
    }
    // Jika semua pemain sudah memilih semua nomor
    return false;
}

function whoWon() {
    for (let i = 0; i < playerCount.value; i++) {
        const pickedNumbers = player[i].pickedNumbers;
        if (pickedNumbers.every(num => num === true)) {
            if (playerCount.value == 1) {
                return `Turn needed: ${turn}!`;
            }
            let _winner= '';
            switch (i) {
                case 0:
                    _winner = 'Down';
                    break;
                case 1:
                    _winner = 'Up';
                    break;
                case 2:
                    _winner = 'Left';
                    break;
                case 3:
                    _winner = 'Right';
                    break;
            
                default:
                    break;
            }
            return `${_winner} Won The Game!`;
        }
    }
    // Jika semua pemain sudah memilih semua nomor
    return 'Semua pemain telah memilih semua nomor!';
}

function choose(buttonNum, playerNum, numberElement) {
    if (!numberElement.classList.contains('picked-hold')) {
        if (!player[playerNum].pickedNumbers[buttonNum - 1]) {
            player[playerNum].numberPick += buttonNum;
            console.log(`[Choosing] Player${playerNum + 1} picked ${buttonNum}`);
            console.log(`[Holding] Player${playerNum + 1} number holded: ${player[playerNum].numberPick}`);
            player[playerNum].pickedNumbers[buttonNum - 1] = true;
            numberElement.classList.add('picked');
        } else {
            player[playerNum].numberPick -= buttonNum;
            console.log(`[Choosing] Player${playerNum + 1} unpicked ${buttonNum}`);
            console.log(`[Holding] Player${playerNum + 1} number holded: ${player[playerNum].numberPick}`);
            player[playerNum].pickedNumbers[buttonNum - 1] = false;
            numberElement.classList.remove('picked');
        }
    }
}

function pass(playerNum, passButton) {
    player[playerNum].numberPick = nowDice;
    player[playerNum].pass = true;
    console.log(`[Choosing] Player${playerNum + 1} pass`);
    for (let i = 0; i < 10; i++) {
        if (number[playerNum][i].classList.contains('picked')) {
            number[playerNum][i].classList.remove('picked');
            player[playerNum].pickedNumbers[i] = false;
        }
    }
    passButton.classList.add('picked-hold');
}