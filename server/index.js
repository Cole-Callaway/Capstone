require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { SERVER_PORT } = process.env;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/script.js"));
});

app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/styles.css"));
});

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
