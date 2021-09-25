const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getService,
  postService,
  deleteService,
  updateServiceImg,
  updateServiceText,
} = require("../controllers/service");

router.post("/post", upload, postService);

router.get("/get", getService);

router.delete("/delete/:id", deleteService);

router.put("/update/img/:id", upload, updateServiceImg);

router.put("/update/text/:id", updateServiceText);

module.exports = router;
