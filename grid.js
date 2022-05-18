const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid {
  constructor(gridElement) {
    gridElement.styLe.setProperty("--grid-size", GRID_SIZE);
    gridElement.styLe.setProperty("--cell-size", `${CELL_SIZE}vmin`);
    gridElement.styLe.setProperty("--cell-gap", `${CELL_GAP}vmin`);
    createCellElement(gridElement);
  }
}

function createCellElement(gridElement) {
  const cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
console.log("hello");
