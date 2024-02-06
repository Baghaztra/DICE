import { boardContainer } from "./js/dom/board.dom.js";
import { Board } from "./js/lib/Board.js";

const board = new Board(boardContainer);
board.block();
