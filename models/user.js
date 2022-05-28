const mongoose = require("mongoose");
const { USER_TYPES } = require("./../constants")
const User = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    user_status: {
        type: String
    },
    user_type: {
        type: String,
        default: USER_TYPES.USER
    },
}, {
    minimize: false,
    timestamps: true,
});
mongoose.model("User", User);
module.exports = mongoose.model("User");

