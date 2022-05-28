const { Types } = require("mongoose");
const validator = require("./validator");

const userApiPathModels = {
    "/register": {
        email: { type: String },
        password: { type: String }
    },
    "/user-login": {
        email: { type: String },
        password: { type: String }
    },
};

module.exports = function handler(req, res, next) {
    if (!userApiPathModels[req.path]) {
        console.error(req.path, ": Missing Parameters");
        return res.status(400).json({ message: "No validator for this path" });
    }

    validator(req, res, next, userApiPathModels[req.path]);
};