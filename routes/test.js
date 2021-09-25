const express = require("express");
const router = express.Router();

const { test } = require("../controllers/test.js");

router.post("/test", test);

module.exports = router;
