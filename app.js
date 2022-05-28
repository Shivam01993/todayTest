let express = require("express");
let logger = require("morgan");
const cors = require("cors");

const session = require('express-session');
let app = express();
global.__root = __dirname + "/";
const db = require("./db");
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'any secret', cookie: { secure: false }, key: 'id' }));
const AuthController = require("./controllers/authController");
app.use("/api/auth", AuthController);


module.exports = app;