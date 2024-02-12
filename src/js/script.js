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

  const baris = Math.floor(i / panjang);    // dl perulangan biasa, anggap ini i
  const kolom = i % panjang;                // dl perulangan biasa, anggap ini j
  board[baris][kolom] = grid;

  // Nambahin hitam/putih silang   
  if ((baris + kolom) % 2 === 1) {
    grid.classList.add('white');
  } else {
    grid.classList.add('black');
  }
}

console.log(board);