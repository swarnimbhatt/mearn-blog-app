const express = require("express");
const app = express();

app.get( "/", (req, resp) => {
    resp.json("test ok");
})

app.listen(4000);

