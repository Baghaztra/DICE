import { boardContainer } from "./js/dom/board.dom.js";
import { Board } from "./js/lib/Board.js";
import { Infantri } from './js/lib/Infantri.js';

const board = new Board(boardContainer);

document.addEventListener('DOMContentLoaded', function () {
    // Kode di dalam blok ini akan dijalankan setelah dokumen HTML terbentuk

    const boardContainer = document.getElementById("board-container");
    const board = new Board(boardContainer);

    const infantriList = [
        new Infantri('inf1', 'blue', { row: 'c', col: 1 }),
        new Infantri('inf2', 'red', { row: 'c', col: 12 }),
    ];

    board.block(infantriList);
    board.checkInfantriInCell('c', 1, infantriList);
    board.checkInfantriInCell('c', 12, infantriList);
});