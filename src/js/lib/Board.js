export class Board {
    constructor(
        container,
        blockRow = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"]
    ) {
        this.container = container;
        this.blockRow = blockRow;
    }

    block() {
        this.blockRow.forEach((element) => {
            const rowElement = document.createElement("section");
            rowElement.id = element;
            rowElement.setAttribute("block", `${element}`);
            for (let i = 0; i <= this.blockRow.length - 1; i++) {
                const col = document.createElement("input");
                col.type = "button";
                col.id = `${element}-${i + 1}`;
                col.value = `${element}-${i + 1}`;
                rowElement.appendChild(col);
            }
            this.container.appendChild(rowElement);
        });
    }
}
