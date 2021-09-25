const express = require("express");
const router = express.Router();

//Controller
const { createOder, getOder, deleteOder } = require("../controllers/oder.js");

router.post("/create/oder", createOder);
router.get("/get/oder", getOder);
router.delete("/delete/oder/:id", deleteOder);

module.exports = router;
