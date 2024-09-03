const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync();
const secret = "br937frg9i3ug9fu3b9urgf7gh04fgh93grf97928456726gc9ervube";


const { mongoUsername, mongoPassword, mongoCluster } = require("./config");
const mongoConnString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.68qmd.mongodb.net/?retryWrites=true&w=majority&appName=${mongoCluster}`;
mongoose.connect(mongoConnString);

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const User = require("./models/User");
const Post = require("./models/Post");

app.get("/", (req, resp) => {
    resp.json("test ok");
});

app.post("/login", async (req, resp) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    if (userDoc) {
        const isPasswordVerified = bcrypt.compareSync(password, userDoc.password ? userDoc.password : null);
        if (isPasswordVerified) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                resp.cookie("token", token).json({
                    id: userDoc._id,
                    username,
                });
            });

        }
        else {
            resp.status(400).json("Wrong credentials.")
        }
    }
    else {
        resp.status(400).json("User does not exist.")
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

app.get("/profile", (req, resp) => {
    const { token } = req.cookies;
    if (token)
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            resp.json(info);
        });
    else
        resp.json("ok");
});

app.post("/logout", (req, resp) => {
    // invalidate token
    resp.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single('file'), (req, resp) => {
    const { token } = req.cookies;
    if (token)
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;         
            //storing file in uploads
            const { originalname, path } = req.file;
            const fileExtension = originalname.split(".")[1];
            const newPath = path + "." + fileExtension;
            fs.renameSync(path, newPath);

            //create post entry
            const { title, summary, content } = req.body;
            const PostDoc = await Post.create({
                title,
                summary,
                content,
                cover: newPath,
                author: info.id,
            });

            resp.json(PostDoc);
        });
    else
        resp.json("Unauthorized access denied");
});

app.put("/post", uploadMiddleware.single('file'), (req, resp) => {
    // const { token } = req.cookies;
    // if (token)
    //     jwt.verify(token, secret, {}, async (err, info) => {
    //         if (err) throw err;         
    //         //storing file in uploads
    //         const { originalname, path } = req.file;
    //         const fileExtension = originalname.split(".")[1];
    //         const newPath = path + "." + fileExtension;
    //         fs.renameSync(path, newPath);

    //         //create post entry
    //         const { title, summary, content } = req.body;
    //         const PostDoc = await Post.create({
    //             title,
    //             summary,
    //             content,
    //             cover: newPath,
    //             author: info.id,
    //         });

    //         resp.json(PostDoc);
    //     });
    // else
    //     resp.json("Unauthorized access denied");
});

app.get("/posts", async (req, resp) => {
    resp.json(await Post.find().populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20)
    );
});

app.get("/post/:id", async (req, resp) => {
    const { id } = req.params;
    resp.json(await Post.findById(id).populate("author", ["username"]));
});

app.listen(4000);

