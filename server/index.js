const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

const users = require("./users.json");

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
