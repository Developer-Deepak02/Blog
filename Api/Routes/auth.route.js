const express = require("express");
const router = express.Router();
const { SignUp , SignIn , Google } = require("../controllers/auth.controller.js");

router.post("/signup", SignUp);
router.post("/signin", SignIn)
router.post("/google", Google);
module.exports = router;
