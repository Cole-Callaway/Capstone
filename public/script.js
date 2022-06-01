let board;
let score = 0;
let rows = 4;
let columns = 4;

let newGameBtn = document.getElementById("new-game");

async function getBoard() {
  await axios
    .get("/board")
    .then((res) => {
      board = res.data;
    })
    .catch((err) => {
      alert("server is down");
    });
}
getBoard();

async function setGame() {
  document.getElementById("board").innerHTML = "";
  // board = [
  //   [2, 4, 2, 4],
  //   [4, 16, 32, 2048],
  //   [2, 4, 2, 64],
  //   [128, 16, 8, 4],
  // ];

  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // console.log(board);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  newGameBtn.remove();
  setTwo();
  setTwo();
}

newGameBtn.addEventListener("click", setGame);

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
  let initialBoardState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  if (board !== initialBoardState) {
    axios.post("/board", { board });
  }
}

function canMoveVertical() {
  let canMove = true;
  let rowsWithNums = board.filter((row) => {
    let zero = 0;
    for (let r = 0; r < row.length; r++) {
      if (row[r] == 0) {
        zero = zero + 1;
      }
    }

    if (zero != 4) {
      return row;
    }
  });

  if (rowsWithNums.length === 1) {
    return true;
  }

  for (let r = 0; r < rows.length - 1; r++) {
    let rowOne = rowsWithNums[r];
    let rowTwo = rowsWithNums[r + 1];

    for (let i = 0; i < rowOne.length - 1; i++) {
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

document.addEventListener("keyup", (e) => {
  let gameOver = checkForGameOver();

  if (gameOver) {
    document.getElementById("board").innerHTML =
      '<div class="gameOver"><h1  title="Game Over">Game Over</h1></div>';

    let newGameBtnReturn = document.createElement("button");
    newGameBtnReturn.id = "new-game";
    newGameBtnReturn.innerText = "New Game";
    document.querySelector("body").append(newGameBtnReturn);
    newGameBtnReturn.addEventListener("click", setGame);

    return;
  }

  if (e.code == "ArrowLeft") {
    slideLeft();

    let canMoveLeft = canMoveHorizontally();
    console.log(canMoveLeft, "canMoveHorizontally");
    if (canMoveLeft) {
      setTwo();
    }
  } else if (e.code == "ArrowRight") {
    slideRight();

    let canMoveRight = canMoveHorizontally();
    console.log(canMoveRight, "canMoveHorizontally");
    if (canMoveRight) {
      setTwo();
    }
    checkForGameOver();
  } else if (e.code == "ArrowUp") {
    slideUp();

    let canMoveUp = canMoveVertical();
    console.log(canMoveUp, "canMoveVertical");
    if (canMoveUp) {
      setTwo();
    }
    checkForGameOver();
  } else if (e.code == "ArrowDown") {
    slideDown();

    let canMoveDown = canMoveVertical();
    if (canMoveDown) {
      setTwo();
    }
    checkForGameOver();
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

function canMoveHorizontally() {
  let canMove = true;
  let columnsWithNums = board.filter((column) => {
    let zero = 0;
    for (let c = 0; c < column.length; c++) {
      if (column[c] == 0) {
        zero = zero + 1;
      }

      if (zero != 4) {
        return column;
      }
    }
  });

  if (columnsWithNums.length === 1) {
    return true;
  }

  for (let c = 0; c < 3 - 1; c++) {
    let columnOne = columnsWithNums[c];
    let columnTwo = columnsWithNums[c + 1];
    let columnThree = columnsWithNums[c + 2];
    let columnFour = columnsWithNums[c + 3];
    console.log(
      columnOne,
      "columnOne",
      columnTwo,
      "columnTwo",
      columnThree,
      "columnThree",
      columnFour,
      "columnFour"
    );
    for (let i = 0; i < columnOne.length - 1; i++) {
      if (
        columnOne[i] == columnTwo[i] ||
        columnOne[i] == columnThree[i] ||
        columnOne[i] == columnFour[i] ||
        columnTwo[i] == columnThree[i] ||
        columnTwo[i] == columnFour[i] ||
        columnThree[i] == columnFour[i]
      ) {
        if (
          columnOne[i] == 0 ||
          columnTwo[i] == 0 ||
          columnThree[i] == 0 ||
          columnFour[i] == 0
        ) {
          return true;
        }
        return false;
      }
    }
  }
  return false;
}

function checkForGameOver() {
  let count = 0;
  let rowsWithNums = board.filter((row) => {
    let zero = 0;
    for (let r = 0; r < row.length; r++) {
      if (row[r] == 0) {
        zero = zero + 1;
      }
    }
    if (zero != 4) {
      return row;
    }
  });

  let canMoveHorizontally;
  canMoveHorizontally = this.canMoveHorizontally();
  let canMoveVertical;
  canMoveVertical = this.canMoveVertical();
  let hasEmptyTile;
  hasEmptyTile = this.hasEmptyTile();

  if (!canMoveVertical && !canMoveHorizontally && !hasEmptyTile) {
    return true;
  }

  return false;
}
