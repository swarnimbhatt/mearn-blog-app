const mongoose = require("mongoose");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

const User = require("./models/User");

const username = "XXXXXXXXXXXXXXX";
const password = "XXXXXXXXXXXXXXX";
const cluster = "XXXXXXXXXXXXXXX";
const mongoConnString = `mongodb+srv://${username}:${password}@cluster0.68qmd.mongodb.net/?retryWrites=true&w=majority&appName=${cluster}`;
mongoose.connect(mongoConnString);

app.get("/", (req, resp) => {
    resp.json("test ok");
});

app.post("/login", (req, resp) => {
    const { username, password } = req.body;
    resp.json({ requestData: { username, password } });
});

app.post("/register", async (req, resp) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({ username, password });
        resp.json(userDoc);
    }
    catch (e) {
        resp.status(400).json(e);
    }
});

app.listen(4000);

