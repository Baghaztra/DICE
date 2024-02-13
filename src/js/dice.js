function rollTheDice() {
    let dice = document.querySelector(".dice");

    dice.querySelector('img').setAttribute("src", "diceroll.gif");

    setTimeout(() => {
        let rand = Math.floor(Math.random() * 6) + 1;

        dice.querySelector('img').setAttribute('src', 'img/dice' + rand + '.png');
    }, 2000);
}