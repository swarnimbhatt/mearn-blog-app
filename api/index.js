const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());


app.get( "/", (req, resp) => {
    resp.json("test ok");
});

app.post( "/login", (req, resp) => {
    const {username, password} = req.body;
    resp.json({requestData: {username, password} });
});

app.post( "/register", (req, resp) => {
    const {username, password} = req.body;
    resp.json({requestData: {username, password} });
})

app.listen(4000);

