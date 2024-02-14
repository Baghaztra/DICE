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

  const healthBar = document.createElement('div');
  healthBar.classList.add('health-bar');

  const baris = Math.floor(i / panjang);
  const kolom = i % panjang;

  // Default
  if ((kolom === 1 && baris >= 3 && baris <= 8) || 
    (kolom === 10 && baris >= 3 && baris <= 8) ||
    (kolom === 0 ) || (kolom === 11) ||
    (kolom === 1 && (baris === 1 || baris === 10)) || 
    (kolom === 10 && (baris === 1 || baris === 10))) 
  {
    let team = '';
    let healthPoints = 6;

    if ((kolom == 0 && (baris < 3 || baris > 8)) ||
        (kolom == 1 && (baris == 1 || baris == 10))){
      squad.classList.add('cavalryB');
      squad.appendChild(healthBar);
      team = 'blue';
    } else if  ((kolom == 11 && (baris < 3 || baris > 8)) ||
               (kolom == 10 && (baris == 1 || baris == 10))){
      squad.classList.add('cavalryR');
      squad.appendChild(healthBar);
      team = 'red';
    } else if (kolom === 1) {
      squad.classList.add('infantriB');
      squad.appendChild(healthBar);
      team = 'blue';
    } else if (kolom === 10) {
      squad.classList.add('infantriR');
      squad.appendChild(healthBar);
      team = 'red';
    } else if (kolom === 0) {
      squad.classList.add('archerB');
      squad.appendChild(healthBar);
      team = 'blue';
    } else if (kolom === 11) {
      squad.classList.add('archerR');
      squad.appendChild(healthBar);
      team = 'red';
    }
    // Grid berisi
    board[baris][kolom] = {
      gridElement: grid,
      unitElement: squad,
      adaSquad: true,
      team: team,
      healthPoints: healthPoints,
      healthBar: healthBar,
    };
  } else {
    // Grid kosong
    board[baris][kolom] = {
      gridElement: grid,
      unitElement: squad,
      adaSquad: false,
      team: '',
      healthPoints: 0,
      healthBar: healthBar,
    };
  }

  // Nambahin hitam/putih silang   
  if ((baris + kolom) % 2 === 1) {
    grid.classList.add('white');
  } else {
    grid.classList.add('black');
  }
} //selesai membuat papan

// Memastikan map diload dengan benar
for (let i = 0; i < 12; i++) {
  for (let j = 0; j < 12; j++) {
    if (board[i][j].adaSquad) {
      console.log("[Debug] cek "+i+", "+j+": ", board[i][j]);
    }
  }
}

let waitingForMove = false;
let currentPosition = { row: 0, col: 0 };
let selectedUnitElement;

container.addEventListener('click', function(event) {
  const clickedElement = event.target;
  const clickedGrid = clickedElement.closest('.grid');

  if (clickedGrid) {
    const clickedRow = board.findIndex(row => row.some(cell => cell.gridElement === clickedGrid));
    const clickedCol = board[clickedRow].findIndex(cell => cell.gridElement === clickedGrid);
    
    currentPosition = { row: clickedRow, col: clickedCol };
    if (waitingForMove) {
      console.log('a');
      if (clickedGrid.classList.contains('moveable') || clickedGrid.classList.contains('attack-range')) {
        action(currentPosition.row, currentPosition.col, clickedRow, clickedCol);
      }
      console.log('b');
      removeMoveableClass(); 
      removeAttackRange();
      waitingForMove = false;
    } else if (board[clickedRow][clickedCol].adaSquad) {
      waitingForMove = true; 
      selectedUnitElement = board[clickedRow][clickedCol];
      console.log("Selected: "+clickedRow+", "+clickedCol+": ", selectedUnitElement);
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
  action(currentPosition.row, currentPosition.col, clickedRow, clickedCol);
  waitingForMove = false;
  removeMoveableClass();
}

function squadMoveDistance() {
  const selectedUnitElement = board[currentPosition.row][currentPosition.col].unitElement;

  if (selectedUnitElement.classList.contains('cavalryB') || selectedUnitElement.classList.contains('cavalryR')) {
    return 4;
  } else {
    return 1;
  }
}

function action(fromRow, fromCol, toRow, toCol) {
  if (board[fromRow][fromCol].adaSquad) {
    // berarti nyerang :v
    if (board[toRow][toCol].adaSquad) {
      // Logika serangan
      console.log(`Serang unit dari grid (${fromRow}, ${fromCol}) ke grid (${toRow}, ${toCol})`);
      const kocok = Math.floor(Math.random() * 6) + 1;
      const diceElement = document.getElementById('dice');
      diceElement.innerHTML = `<i class="dice bi bi-dice-${kocok}-fill"></i>`;
      
      console.log("[Debug] hp target awal : ", board[toRow][toCol].healthPoints);
      console.log("[Debug] kocok : ", kocok);
      board[toRow][toCol].healthPoints -= kocok;
      console.log("[Debug] hp target setelah diserang : ", board[toRow][toCol].healthPoints);

      const target = board[toRow][toCol];
      console.log("Target: ", target);

      // Update health bar
      const remainingHealthPercentage = (board[toRow][toCol].healthPoints / 6) * 100;
      board[toRow][toCol].healthBar.style.width = `${remainingHealthPercentage}%`;

      // apakah target mati?
      if(board[toRow][toCol].healthPoints <= 0){
        board[fromRow][fromCol].adaSquad = false;
        board[fromRow][fromCol].healthBar.classList.remove('health-bar');
        board[fromRow][fromCol].unitElement.classList.remove('cavalryB', 'cavalryR', 'infantriB', 'infantriR', 'archerB', 'archerR');
      }
    }
    
    // Kalau ini pindah :v
    else{
      const fromElement = board[fromRow][fromCol].unitElement;
      const fromHealthBar = board[fromRow][fromCol].healthBar;
  
      // Tambahkan unit ke grid yang diklik berikutnya
      board[toRow][toCol] = {
        gridElement: board[toRow][toCol].gridElement,
        unitElement: board[toRow][toCol].unitElement,
        adaSquad: true,
        team: board[fromRow][fromCol].team,
        healthPoints: board[fromRow][fromCol].healthPoints,
        healthBar: fromHealthBar,
        row: toRow,
        col: toCol,
      };
      const toElement = board[toRow][toCol].unitElement;
  
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
  
      // Pindahkan health bar ke elemen unit yang baru
      toElement.appendChild(fromHealthBar);
  
      // Hapus unit dari grid sebelumnya
      fromElement.classList.remove('cavalryB', 'cavalryR', 'infantriB', 'infantriR', 'archerB', 'archerR');
      board[fromRow][fromCol].adaSquad = false;
      board[fromRow][fromCol].healthPoints = 0;
      removeAttackRange();
  
      console.log(`Memindahkan unit dari grid (${fromRow}, ${fromCol}) ke grid (${toRow}, ${toCol})`);
    }
  }
}

function addAttackRange() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      const distance = Math.abs(selectedUnitElement.row - i) + Math.abs(selectedUnitElement.col - j);
      if (selectedUnitElement.unitElement.classList.contains('archerB') || selectedUnitElement.unitElement.classList.contains('archerR')) {
        if (distance <= 4 && board[i][j].adaSquad && selectedUnitElement.team !== board[i][j].team) {
          board[i][j].gridElement.classList.add('attack-range');
        }
      } else if (distance <= 1 && board[i][j].adaSquad && selectedUnitElement.team !== board[i][j].team) {
        board[i][j].gridElement.classList.add('attack-range');
      }
    }
  }
}

function removeAttackRange() {
  for (let i = 0; i < panjang; i++) {
    for (let j = 0; j < panjang; j++) {
      board[i][j].gridElement.classList.remove('attack-range');
    }
  }
}