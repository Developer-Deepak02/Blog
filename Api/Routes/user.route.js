const express = require("express");
const router = express.Router();
const { test } = require("../controllers/user.controllers.js");

router.get("/test",test)

module.exports = router;
