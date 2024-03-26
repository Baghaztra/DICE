var item = document.querySelectorAll('.item');

item.forEach(function (e) {
    const piece = document.createElement('div');
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    piece.classList.add('color' + randomNumber);
    e.appendChild(piece);
    e.addEventListener('click', function () {
        e.classList.contains('flipped') ? e.classList.remove('flipped') : e.classList.add('flipped');
        var colorElement = e.querySelector(`.${diceColor}`);
        setTimeout(function () {
            var _score = true;
            if (!(colorElement && colorElement.classList.contains(`${diceColor}`))) {
                e.classList.remove('flipped');
                _score = false;
            }
            nextTurn(_score);
        }, 500)
    });
});