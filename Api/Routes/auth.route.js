const express = require("express");
const router = express.Router();
const { SignUp , SignIn} = require("../controllers/auth.controller.js");

router.post("/signup", SignUp);
router.post("/signin", SignIn)

module.exports = router;
