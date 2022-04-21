const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

const uri = process.env.CONNECTION_STRING;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  console.log("MongoDB connected successfully.");
  const collection = client.db("test_db").collection("users");

  let user = { name: "Mak1", email: "mak1@yahoo.com" };

  let userExists = collection.find({ email: user.email });

  console.log(userExists);

  if (userExists) {
    console.log("This email already used.");
    client.close();
    return;
  }

  try {
    collection.insertOne(user);
    console.log("User added successfully.");
  } catch (error) {
    console.log(error);
  }

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
