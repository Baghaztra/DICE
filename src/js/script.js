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

  // Bikin objek infantri
  const infantri = document.createElement('div');
  grid.appendChild(infantri); // Pindahkan ini ke luar dari kondisi if

  if (i === 0) {
    infantri.classList.add('infantri');
  }

  const baris = Math.floor(i / panjang);
  const kolom = i % panjang;
  board[baris][kolom] = {
    gridElement: grid,
    infantriElement: infantri,
    isInfantriPresent: i === 0,
  };

  // Nambahin hitam/putih silang   
  if ((baris + kolom) % 2 === 1) {
    grid.classList.add('white');
  } else {
    grid.classList.add('black');
  }
}

let waitingForMove = false;
let currentInfantriPosition = { row: 0, col: 0 };

container.addEventListener('click', function(event) {
  const clickedElement = event.target;
  const clickedGrid = clickedElement.closest('.grid');

  if (clickedGrid) {
    const clickedRow = board.findIndex(row => row.some(cell => cell.gridElement === clickedGrid));
    const clickedCol = board[clickedRow].findIndex(cell => cell.gridElement === clickedGrid);

    if (waitingForMove) {
      // Jika menunggu pemain untuk memilih grid berikutnya
      moveInfantri(currentInfantriPosition.row, currentInfantriPosition.col, clickedRow, clickedCol);
      waitingForMove = false; // Setelah pemindahan, setel status kembali menjadi false
    } else if (board[clickedRow][clickedCol].isInfantriPresent) {
      // Jika ada infantri di grid yang diklik
      waitingForMove = true; // Setel status menjadi true karena kita akan menunggu pemain untuk memilih grid berikutnya
      currentInfantriPosition = { row: clickedRow, col: clickedCol };
    }
  }
});

function moveInfantri(fromRow, fromCol, toRow, toCol) {
  // Hanya lanjutkan jika infantri ada di grid yang diklik
  if (board[fromRow][fromCol].isInfantriPresent) {
    // Hapus infantri dari grid saat ini
    board[fromRow][fromCol].isInfantriPresent = false;
    board[fromRow][fromCol].infantriElement.classList.remove('infantri');

    // Tambahkan infantri ke grid yang diklik berikutnya
    board[toRow][toCol].isInfantriPresent = true;
    board[toRow][toCol].infantriElement.classList.add('infantri');

    console.log(`Memindahkan infantri dari grid (${fromRow}, ${fromCol}) ke grid (${toRow}, ${toCol})`);
  }
}