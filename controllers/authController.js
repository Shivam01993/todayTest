const express = require('express');
const userServices = require('../services/userServices');
const { verifyToken } = require("../auth/verifyToken");
const router = express.Router();
const validator = require("./../validators/userValidator");
router.use(validator);
router.use(verifyToken);

router.post("/register", userServices.signUp)
router.post("/user-login", userServices.userLogin)
module.exports = router;
