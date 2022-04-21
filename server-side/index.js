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

async function run() {
  try {
    await client.connect();

    const collection = client.db("test_db").collection("users");

    let user = { name: "Mak7", email: "mak7@yahoo.com" };

    let userExists = await collection.findOne({ email: user.email });

    if (userExists) {
      console.log("This email already used.");
      return;
    }

    await collection.insertOne(user);
    console.log("User added successfully.");
  } catch (error) {
    console.log(error);
  } finally {
  }
}

run().catch(console.dir);

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
