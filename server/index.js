require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

const { SERVER_PORT } = process.env;

const boardController = require("./controller");

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/script.js"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/styles.css"));
});

const handler = (req, res) => {
  res.status(200).send("hit the end point");
};

app.get("/board", boardController.getBoard);

app.post("/board", boardController.postBoard);

app.get("/api/test", handler);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
