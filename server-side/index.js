const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

const mongo_user = process.env.MONGO_USER;
const mongo_pass = process.env.MONGO_PASS;

const uri = `mongodb+srv://${mongo_user}:${mongo_pass}@cluster0.kdfnv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object

  console.log("MongoDB connected.");

  client.close();
});

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
