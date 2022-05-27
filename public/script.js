let board;
let score = 0;
let rows = 4;
let columns = 4;
window.onload = function () {
  setGame();
};

function setGame() {
  // board = [
  //   [2, 4, 2, 4],
  //   [4, 2, 4, 2],
  //   [8, 4, 8, 16],
  //   [4, 8, 16, 32],
  // ];

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  console.log(board);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; //clear the classList
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    checkForGameOver();
    slideLeft();
    let canMove = canMoveHorizontally();
    console.log(canMove, "canMoveHorizontally");
    if (canMove) {
      setTwo();
    }
  } else if (e.code == "ArrowRight") {
    checkForGameOver();
    slideRight();
    let canMove = canMoveHorizontally();
    console.log(canMove, "canMoveHorizontally");
    if (canMove) {
      setTwo();
    }
  } else if (e.code == "ArrowUp") {
    checkForGameOver();
    slideUp();

    let canMove = canMoveVertical();
    console.log(canMove, "canMoveVertical");
    if (canMove) {
      setTwo();
    }
  } else if (e.code == "ArrowDown") {
    checkForGameOver();
    slideDown();

    let canMoveDown = canMoveVertical();
    if (canMoveDown) {
      setTwo();
    }
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0); //create new array of all nums != 0
}

function slide(row) {
  //[0, 2, 2, 2]
  row = filterZero(row); //[2, 2, 2]
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  } //[4, 0, 2]
  row = filterZero(row); //[4, 2]
  //add zeroes
  while (row.length < columns) {
    row.push(0);
  } //[4, 2, 0, 0]
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0, 2, 2, 2]
    row.reverse(); //[2, 2, 2, 0]
    row = slide(row); //[4, 2, 0, 0]
    board[r] = row.reverse(); //[0, 0, 2, 4];
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    //find random row and column to place a 2 in
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      // checkForGameOver();
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        //at least one zero in the board
        return true;
      }
    }
  }
  return false;
}

function canMoveVertical() {
  let canMove = true;
  let rowsWithNums = board.filter((row) => {
    console.log(row, "row");
    let zero = 0;
    for (let r = 0; r < row.length; r++) {
      if (row[r] == 0) {
        zero = zero + 1;
      }
    }
    console.log(zero, "canMoveVertical zero");
    if (zero != 4) {
      return row;
    }
  });
  //this could be whats is causing the bug
  if (rowsWithNums.length === 1) {
    return true;
  }
  console.log(rowsWithNums, "rowsWithNums");
  for (let r = 0; r < rows.length - 1; r++) {
    let rowOne = rowsWithNums[r];
    let rowTwo = rowsWithNums[r + 1];
    // console.log(rowOne, "rowOne");
    // console.log(rowTwo, "rowTwo");
    for (let i = 0; i < rowOne.length - 1; i++) {
      // console.log(rowOne[i], "rowOne");
      // console.log(rowTwo[i], "rowTwo");
      //this could be whats is causing the bug
      if (rowOne[i] == rowTwo[i]) {
        if (rowOne[i] == 0 && rowTwo[i] == 0) {
          return false;
        }
        return true;
      }
    }
  }
  return false;
}

function canMoveHorizontally() {
  let canMove = true;
  let columnsWithNums = board.filter((column) => {
    console.log(column, "column");
    let zero = 0;
    for (let c = 0; c < column.length; c++) {
      if (column[c] == 0) {
        zero = zero + 1;
      }

      if (zero !== 4) {
        return column;
      }
    }
    console.log(zero, "canMoveHorizontally zero");
  });
  if (columnsWithNums.length === 1) {
    return true;
  }
  console.log(columnsWithNums, "columnsWithNums");
  for (let c = 0; c < columns.length - 1; c++) {
    let columnOne = columnsWithNums[c];

    let columnTwo = columnsWithNums[c + 1];

    for (let i = 0; i < columnOne.length - 1; i++) {
      console.log(columnOne[i], "columnOne");
      console.log(columnTwo[i], "columnTwo");
      if (columnOne[i] == columnTwo[i]) {
        if (columnOne[i] == 0 && columnTwo[i] == 0) {
          return false;
        }
        return true;
      }
    }
  }
  return false;
}

function checkForGameOver() {
  let count = 0;
  for (let r = 0; r < rows.length - 1; r++) {
    for (let c = 0; c < columns.length; c++) {
      if (board[r][c] == 0 && row[i] == row[i + 1]) {
        return true;
      }
    }
  }
  return false;
}
