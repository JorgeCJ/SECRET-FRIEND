const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const secretFriendSchema = new mongoose.Schema({
  name: String,
  gift: String,
});

const SecretFriend = mongoose.model("SecretFriend", secretFriendSchema);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/secretfriend", async (req, res) => {
  try {
    const secretFriends = await SecretFriend.find();
    res.json(secretFriends);
  } catch (error) {
    console.error("Error fetching secret friends:", error);
    res.status(500).json({ message: "Error fetching secret friends" });
  }
});

app.post("/secretfriend", async (req, res) => {
  const newSecretFriend = req.body;

  try {
    const createdSecretFriend = await SecretFriend.create(newSecretFriend);
    res.status(201).json(createdSecretFriend);
  } catch (error) {
    console.error("Error inserting secret friend:", error);
    res.status(500).json({ message: "Error inserting secret friend" });
  }
});

app.delete("/secretfriend/:id", async (req, res) => {
  const secretFriendId = req.params.id;

  try {
    const deletedSecretFriend = await SecretFriend.findByIdAndRemove(
      secretFriendId
    );

    if (!deletedSecretFriend) {
      res.status(404).json({ message: "Secret friend not found" });
    } else {
      res.status(200).json({ message: "Secret friend deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting secret friend:", error);
    res.status(500).json({ message: "Error deleting secret friend" });
  }
});

app.listen();
