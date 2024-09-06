require("dotenv").config();
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

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER;
const mongoConnString = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.68qmd.mongodb.net/?retryWrites=true&w=majority&appName=${mongoCluster}`;
mongoose.connect(mongoConnString);

const multer = require("multer");
const uploadMiddlewarePosts = multer({ dest: "uploads/posts/" });
const uploadMiddlewareUsers = multer({ dest: "uploads/users/" });

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
            jwt.sign(
                { username, id: userDoc._id },
                accessTokenSecret,
                // { expiresIn: "30s" },
                {},
                (err, token) => {
                    if (err) throw err;
                    resp.cookie("token", token).json({
                        id: userDoc._id,
                        username,
                    });
                }
            );
        }
        else {
            resp.status(400).json("Wrong credentials.")
        }
    }
    else {
        resp.status(400).json("User does not exist.")
    }
});


app.post("/register", uploadMiddlewareUsers.single("file") ,async (req, resp) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        //storing file in uploads
        const { originalname, path } = req.file;
        const fileExtension = originalname.split(".")[1];
        const newPath = path + "." + fileExtension;
        fs.renameSync(path, newPath);

        const userDoc = await User.create({
            firstName,
            lastName,
            username,
            password: bcrypt.hashSync(password, salt),
            profilePic: newPath
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
        jwt.verify(token, accessTokenSecret, {}, (err, info) => {
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

app.post("/post", uploadMiddlewarePosts.single('file'), (req, resp) => {
    const { token } = req.cookies;
    if (token)
        jwt.verify(token, accessTokenSecret, {}, async (err, info) => {
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

app.put("/post/:id", uploadMiddlewarePosts.single('file'), (req, resp) => {
    const { token } = req.cookies;
    const { id } = req.params;

    if (token)
        jwt.verify(token, accessTokenSecret, {}, async (err, info) => {
            if (err) throw err;
            //storing file in uploads
            const { originalname, path } = req.file;
            const fileExtension = originalname.split(".")[1];
            const newPath = path + "." + fileExtension;
            fs.renameSync(path, newPath);

            //update post entry
            const { title, summary, content } = req.body;
            const postDoc = await Post.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) == JSON.stringify(info.id);
            if (!isAuthor)
                return resp.status(400).json("You are not the author.");

            fs.unlinkSync(postDoc.cover);
            await postDoc.updateOne({
                title,
                summary,
                content,
                cover: newPath,
            });
            resp.json(postDoc);
        });
    else
        resp.json("Unauthorized access denied");
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

app.delete("/post/:id", async (req, resp) => {
    const { token } = req.cookies;
    const { id } = req.params;

    if (token)
        jwt.verify(token, accessTokenSecret, {}, async (err, info) => {
            if (err) throw err;

            const postDoc = await Post.findById(id);
            const isAuthor = JSON.stringify(postDoc.author) == JSON.stringify(info.id);
            if (!isAuthor)
                return resp.status(400).json("You are not the author.");

            fs.unlinkSync(postDoc.cover);
            await postDoc.deleteOne();

            resp.json("Post deleted");
        });
    else
        resp.json("Unauthorized access denied");
});

app.listen(4000);

