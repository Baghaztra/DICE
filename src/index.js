const mainContainer = document.getElementById("main");

const gameList = [
    "mediechess",
    "flickbox",
    "kocokgame",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

for (let i = 0; i <= gameList.length; i++) {
    let gameName = gameList[i];
    const gameListItem = document.createElement("div");
    gameListItem.id = gameName;
    gameListItem.className = `game game-${i + 1}`;
    gameListItem.style.backgroundImage = `url(img/${gameName}.png)`;

    // Buat agar atas bawah gitu
    if (i % 2 !== 1) {
        gameListItem.style.marginTop = "100px";
    }

    mainContainer.appendChild(gameListItem);
}
