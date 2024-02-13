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
let currentInfantriPosition = { row: 0, col: 0 };

container.addEventListener('click', function(event) {
  const clickedElement = event.target;
  const clickedGrid = clickedElement.closest('.grid');

  if (clickedGrid) {
    const clickedRow = board.findIndex(row => row.some(cell => cell.gridElement === clickedGrid));
    const clickedCol = board[clickedRow].findIndex(cell => cell.gridElement === clickedGrid);

    if (waitingForMove) {
      // Tampilkan gerakan yang diizinkan
      if (clickedGrid.classList.contains('moveable')) {
        move(currentInfantriPosition.row, currentInfantriPosition.col, clickedRow, clickedCol);
        waitingForMove = false;
        removeMoveableClass(); // Hapus kelas 'moveable' dari semua grid setelah pemain memilih
      }
    }else if (board[clickedRow][clickedCol].adaSquad) {
      // Jika ada unit di grid yang diklik
      waitingForMove = true; // Setel status menjadi true karena kita akan menunggu pemain untuk memilih grid berikutnya
      currentInfantriPosition = { row: clickedRow, col: clickedCol };
      addMoveableClass(); // Tambahkan kelas 'moveable' ke semua grid yang dapat dijangkau oleh unit yang dipilih
    }
  }
});

function addMoveableClass() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      const distance = Math.abs(currentInfantriPosition.row - i) + Math.abs(currentInfantriPosition.col - j);
      if (distance <= squadMoveDistance() && !board[i][j].adaSquad) {
        board[i][j].gridElement.classList.add('moveable');
      }
    }
  }
}

function removeMoveableClass() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      board[i][j].gridElement.classList.remove('moveable');
    }
  }
}

function squadMoveDistance() {
  const selectedUnitElement = board[currentInfantriPosition.row][currentInfantriPosition.col].infantriElement;

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

    console.log(`Memindahkan unit dari grid (${fromRow}, ${fromCol}) ke grid (${toRow}, ${toCol})`);
  }
}