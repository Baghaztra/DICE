function rollTheDice() {
    let dice = document.querySelector(".dice");
    let rand = Math.floor(Math.random() * 6) + 1;
    dice.querySelector('img').setAttribute('src', 'img/dice' + rand + '.png');
    return rand;
}