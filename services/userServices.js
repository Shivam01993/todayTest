const { encryptString } = require('../commonFunctions');
const { RESPONSE_MESSAGES, RESPONSE_STATUS, USER_STATUS, USER_TYPES } = require('../constants');
const commonFunctions = require('../commonFunctions');
const { generateToken, verifyPassword } = require("../auth/verifyToken");
const bcrypt = require("bcryptjs");
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require("mongoose");


const signUp = async (req, res) => {
    try {
        const { name,  email } = req.body;
        const alreadyPresent = await User.exists({ email: email });
        if (alreadyPresent) {
            return res
                .status(RESPONSE_STATUS.CONFLICT)
                .json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_REGISTERED });
        }
        const userObject = {
            "user_status": USER_STATUS.ACTIVE,
            "name": name,
            "email": email,
            "password": encryptString(req.body.password)
        }
        const user = await User.create(userObject)
        return res
            .status(RESPONSE_STATUS.SUCCESS)
            .json({ message: RESPONSE_MESSAGES.SUCCESS, user });

    } catch (error) {
        console.log(error)
        const error_body = {
            error_message: "Error while register user",
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path
        }
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }
}

const userLogin = async (req, res) => {
    try {
        const activeUser = await User.findOne({ email: req.body.email, user_type: USER_TYPES.USER })
        if (!activeUser) {
            return res
                .status(RESPONSE_STATUS.NOT_FOUND)
                .json({ message: RESPONSE_MESSAGES.NOT_FOUND });
        }
        let password_verify = bcrypt.compareSync(req.body.password, activeUser.password);
        if (!password_verify) {
            return res
                .status(RESPONSE_STATUS.UNAUTHORIZED)
                .json({ message: RESPONSE_MESSAGES.INVALID_CRED });
        }
        const token = generateToken({ request: req.body, user_id: activeUser._id });
        return res
            .status(RESPONSE_STATUS.SUCCESS)
            .json({ code: RESPONSE_STATUS.SUCCESS, message: RESPONSE_MESSAGES.SUCCESS, token: token });
    } catch (error) {
        console.log(error)
        const error_body = {
            error_message: "Error while login user",
            error_detail: (typeof error == 'object') ? JSON.stringify(error) : error,
            error_data: req.body,
            api_path: req.path
        }
        console.error(error_body);
        return res
            .status(RESPONSE_STATUS.SERVER_ERROR)
            .json({ message: RESPONSE_MESSAGES.SERVER_ERROR });
    }

}

module.exports = {
    signUp: signUp,
    userLogin: userLogin
}


