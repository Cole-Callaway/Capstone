let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function getBoard(req, res) {
  res.status(200).send(board);
}

function postBoard(req, res) {
  let boardData = req.body.board;
  board = boardData;
  res.status(200).send(board);
}

let dummyBoard = {
  board: [
    [2, 4, 2, 4],
    [4, 2, 4, 2],
    [8, 4, 8, 16],
    [4, 8, 16, 32],
  ],
};

module.exports = {
  getBoard,
  postBoard,
};
