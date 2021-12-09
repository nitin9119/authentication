const express = require("express");

const app = express();

const {register,login} = require("./controller/auth.controller");
const postController = require("./controller/post.controller");


app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/posts",postController);



module.exports = app;