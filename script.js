let board;
const score = 0;
const rows = 4;
const columns = 4;

window.onload = function () {
  setGame();
};

const setGame = () => {
  (board = [0, 0, 4, 0]), [8, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
};

const updateTile = (tile, num) => {
  tile.innerHTML = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerHTML = num;
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
};
console.log(board);
