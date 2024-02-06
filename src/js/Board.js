export class Board {
    constructor(
        container,
        blockRow = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]
    ) {
        this.container = container;
        this.blockRow = blockRow;
    }

    block() {
        const col = document.createElement("div");
        this.blockRow.forEach((element) => {
            const rowElement = document.createElement("section");
            rowElement.id = element;
            rowElement.setAttribute("block", `${element}`);

            this.container.appendChild(rowElement);
        });
    }
}
