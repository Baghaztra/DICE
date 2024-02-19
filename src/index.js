const mainContainer = document.getElementById("main");

const gameList = [
    "Mediechess",
    "ShutTheBox",
    "KocokGame",
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
    const gameListItem = document.createElement("a");
    gameListItem.href = `${gameName}/index.html`;
    gameListItem.id = gameName;
    gameListItem.className = `game game-${i + 1}`;
    gameListItem.style.backgroundImage = `url(img/${gameName}.png)`;

    // Buat agar atas bawah gitu
    if (i % 2 !== 1) {
        gameListItem.style.marginTop = "100px";
        gameListItem.style.paddingBottom = "1rem";
        gameListItem.style.animation =
            "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
        gameListItem.style.webkitAnimation =
            "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    } else {
        gameListItem.style.animation =
            "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
        gameListItem.style.webkitAnimation =
            "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both";
    }

    mainContainer.appendChild(gameListItem);
}
