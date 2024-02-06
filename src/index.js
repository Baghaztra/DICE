import { boardContainer } from "./js/board.dom.js";
import { Board } from "./js/board.js";

const board = new Board(boardContainer);
board.block();
