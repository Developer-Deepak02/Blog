const express = require("express");
const router = express.Router();
const { SignUp } = require("../controllers/auth.controller.js");

router.post("/signup", SignUp);

module.exports = router;
