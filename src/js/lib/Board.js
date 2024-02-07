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

    block(infantriList) {
        this.blockRow.forEach((rowElement) => {
            const row = document.createElement("section");
            row.id = rowElement;
            row.setAttribute("block", `${rowElement}`);

            for (let i = 0; i < this.blockRow.length; i++) {
                const col = document.createElement("input");
                col.type = "button";
                col.id = `${rowElement}-${i + 1}`;
                col.value = `${rowElement}-${i + 1}`;
                row.appendChild(col);

                // Cek apakah ada infantri yang harus ditempatkan di sel ini
                const infantri = infantriList.find(
                    (inf) => inf.pos.row === rowElement && inf.pos.col === i + 1
                );

                if (infantri) {
                    this.placeInfantri(infantri, rowElement, i + 1);
                }
            }

            this.container.appendChild(row);
        });
        console.log("Board elements created:", this.container.innerHTML);
    }

    placeInfantri(infantri, row, col) {
        const cellId = `${row}-${col}`;
        const cell = document.getElementById(cellId);

        if (cell) {
            // Bersihkan sel sebelum menempatkan infantri
            cell.innerHTML = '';

            // Tambahkan gambar infantri ke dalam sel
            const infantriElement = document.createElement('img');
            infantriElement.src = `../img/${infantri.icon}`;
            infantriElement.className = `infantri ${infantri.team}`;
            cell.appendChild(infantriElement);
        } else {
            console.error(`Cell with id ${cellId} not found.`);
        }
    }

    checkInfantriInCell(row, col, infantriList) {
        const infantri = infantriList.find(
            (inf) => inf.pos.row === row && inf.pos.col === col
        );
    
        if (infantri) {
            // Infantri ditemukan di sel tersebut
            console.log(`Infantri found in cell ${row}-${col}`);
            console.log('Infantri Icon:', infantri.icon);
        } else {
            // Tidak ada infantri di sel tersebut
            console.log(`No infantri found in cell ${row}-${col}`);
        }
    }
    
    
}
