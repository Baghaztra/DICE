const container = document.getElementById('container');
const panjang = 12;
const size = panjang * panjang;

// Menyimpan grid jadi array 2 dimensi bernama board
const board = new Array(panjang);
for (let i = 0; i < panjang; i++) {
  board[i] = new Array(panjang);
}

// Membuat papan catur
for (let i = 0; i < size; i++) {
  const grid = document.createElement('div');
  grid.classList.add('grid');
  container.appendChild(grid);

  // Bikin div untuk suad
  const squad = document.createElement('div');
  grid.appendChild(squad);

  const baris = Math.floor(i / panjang);
  const kolom = i % panjang;

  // Default
  if ((kolom === 1 && baris >= 3 && baris <= 8) || 
      (kolom === 10 && baris >= 3 && baris <= 8) ||
      (kolom === 0 ) || (kolom === 11) ||
      (kolom === 1 && (baris === 1 || baris === 10)) || 
      (kolom === 10 && (baris === 1 || baris === 10))) 
  {
    if ((kolom == 0 && (baris < 3 || baris > 8)) ||
        (kolom == 1 && (baris == 1 || baris == 10))) 
    {
      squad.classList.add('cavalryB');
    }else if  ((kolom == 11 && (baris < 3 || baris > 8)) ||
    (kolom == 10 && (baris == 1 || baris == 10))) 
    {
      squad.classList.add('cavalryR');
    }else if (kolom === 1) {
      squad.classList.add('infantriB');
    } else if (kolom === 10) {
      squad.classList.add('infantriR');
    } else if (kolom === 0) {
      squad.classList.add('archerB');
    } else if (kolom === 11) {
      squad.classList.add('archerR');
    }
    board[baris][kolom] = {
      gridElement: grid,
      infantriElement: squad,
      adaSquad: true,
    };
  } else {
    // Grid kosong
    board[baris][kolom] = {
      gridElement: grid,
      infantriElement: squad,
      adaSquad: false,
    };
  }

  // Nambahin hitam/putih silang   
  if ((baris + kolom) % 2 === 1) {
    grid.classList.add('white');
  } else {
    grid.classList.add('black');
  }
} //selesai membuat papan

let waitingForMove = false;
let currentPosition = { row: 0, col: 0 };
let selectedUnitElement;

container.addEventListener('click', function(event) {
  const clickedElement = event.target;
  const clickedGrid = clickedElement.closest('.grid');

  if (clickedGrid) {
    const clickedRow = board.findIndex(row => row.some(cell => cell.gridElement === clickedGrid));
    const clickedCol = board[clickedRow].findIndex(cell => cell.gridElement === clickedGrid);

    if (waitingForMove) {
      if (clickedGrid.classList.contains('moveable')) {
        move(currentPosition.row, currentPosition.col, clickedRow, clickedCol);
      }
      waitingForMove = false;
      removeMoveableClass(); 
      removeAttackRange();
    } else if (board[clickedRow][clickedCol].adaSquad) {
      waitingForMove = true; 
      currentPosition = { row: clickedRow, col: clickedCol };
      selectedUnitElement = board[clickedRow][clickedCol].infantriElement;
      addMoveableClass();
      addAttackRange(); 
    }
  }
});

function addMoveableClass() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      const distance = Math.abs(currentPosition.row - i) + Math.abs(currentPosition.col - j);
      if (distance <= squadMoveDistance() && !board[i][j].adaSquad) {
        board[i][j].gridElement.classList.add('moveable');
        board[i][j].gridElement.addEventListener('click', handleMoveClick);
      }
    }
  }
}

function removeMoveableClass() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      board[i][j].gridElement.classList.remove('moveable');
      board[i][j].gridElement.removeEventListener('click', handleMoveClick);
    }
  }
}

function handleMoveClick(event) {
  event.stopPropagation(); 
  const clickedElement = event.target;
  const clickedGrid = clickedElement.closest('.grid');
  const clickedRow = board.findIndex(row => row.some(cell => cell.gridElement === clickedGrid));
  const clickedCol = board[clickedRow].findIndex(cell => cell.gridElement === clickedGrid);
  move(currentPosition.row, currentPosition.col, clickedRow, clickedCol);
  waitingForMove = false;
  removeMoveableClass();
}

function squadMoveDistance() {
  const selectedUnitElement = board[currentPosition.row][currentPosition.col].infantriElement;

  if (selectedUnitElement.classList.contains('infantriB') || selectedUnitElement.classList.contains('infantriR')) {
    return 1;
  } else if (selectedUnitElement.classList.contains('cavalryB') || selectedUnitElement.classList.contains('cavalryR')) {
    return 3;
  } else {
    return 1;
  }
}

function move(fromRow, fromCol, toRow, toCol) {
  if (board[fromRow][fromCol].adaSquad) {
    const fromElement = board[fromRow][fromCol].infantriElement;

    // Tambahkan unit ke grid yang diklik berikutnya
    board[toRow][toCol].adaSquad = true;
    const toElement = board[toRow][toCol].infantriElement;

    if (fromElement.classList.contains('infantriB')) {
      toElement.classList.add('infantriB');
    } else if (fromElement.classList.contains('infantriR')) {
      toElement.classList.add('infantriR');
    } else if (fromElement.classList.contains('archerB')) {
      toElement.classList.add('archerB');
    } else if (fromElement.classList.contains('archerR')) {
      toElement.classList.add('archerR');
    } else if (fromElement.classList.contains('cavalryB')) {
      toElement.classList.add('cavalryB');
    } else if (fromElement.classList.contains('cavalryR')) {
      toElement.classList.add('cavalryR');
    }  

    // Hapus unit dari grid sebelumnya
    fromElement.classList.remove('cavalryB', 'cavalryR', 'infantriB', 'infantriR', 'archerB', 'archerR');
    board[fromRow][fromCol].adaSquad = false;
    removeAttackRange();

    console.log(`Memindahkan unit dari grid (${fromRow}, ${fromCol}) ke grid (${toRow}, ${toCol})`);
  }
}

function addAttackRange() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      const distance = Math.abs(currentPosition.row - i) + Math.abs(currentPosition.col - j);
      // khusus archer
      if (selectedUnitElement && (selectedUnitElement.classList.contains('archerB') || selectedUnitElement.classList.contains('archerR'))) {
        if (distance <= 4 && board[i][j].adaSquad) {
          board[i][j].gridElement.classList.add('attack-range');
          board[i][j].gridElement.addEventListener('click', () => attack(i, j));
        }
      } else if (distance <= 1 && board[i][j].adaSquad) {
        board[i][j].gridElement.classList.add('attack-range');
        board[i][j].gridElement.addEventListener('click', () => attack(i, j));
      }
    }
  }
}

function removeAttackRange() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      board[i][j].gridElement.classList.remove('attack-range');
      board[i][j].gridElement.removeEventListener('click', () => attack(i, j));
    }
  }
}

function attack(clickedRow, clickedCol) {
  console.log(`Serang unit dari grid (${currentPosition.row}, ${currentPosition.col}) ke grid (${clickedRow}, ${clickedCol})`);
  // serrang
  removeAttackRange();
}