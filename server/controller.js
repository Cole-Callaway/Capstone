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
  res.status(200).send(board);
}

module.exports = {
  getBoard,
  postBoard,
};
