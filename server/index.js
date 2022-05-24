require("dotenv").config();
const express = require("express");
const app = express();

let Rollbar = require("rollbar");
const { SERVER_PORT } = process.env;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/script.js"));
});

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/styles.css"));
});

const handler = (req, res) => {
  console.log("hit the end point");
};

app.get("/api/test", handler);

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
