const mongoose = require("mongoose");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

const User = require("./models/User");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const secret = "br937frg9i3ug9fu3b9urgf7gh04fgh93grf97928456726gc9ervube";

const mongoUsername = "XXXXXXXXXXXXXXX";
const mongoPassword = "XXXXXXXXXXXXXXX";
const mongoCluster = "XXXXXXXXXXXXXXX";
const mongoConnString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.68qmd.mongodb.net/?retryWrites=true&w=majority&appName=${mongoCluster}`;
mongoose.connect(mongoConnString);

const jwt = require("jsonwebtoken");

app.get("/", (req, resp) => {
    resp.json("test ok");
});

app.post("/login", async (req, resp) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({username});
    const isPasswordVerified = bcrypt.compareSync(password, userDoc.password);
    if(isPasswordVerified){
        jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            resp.cookie("token", token).json("ok");
        });
        
    }
    else{
        resp.status(400).json("Wrong credentials.")
    }
});

app.post("/register", async (req, resp) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt)
        });
        resp.json(userDoc);
    }
    catch (e) {
        resp.status(400).json(e);
    }
});

app.listen(4000);

