const express = require("express");
const router = express.Router();
const AdminAuth = require("../middlewares/Admin");

const {
  SignUp,
  SignIn,
  tokenValid,
  getUser,
  userDelete,
} = require("../controllers/admin");

router.post("/admin/SignUp", SignUp);
router.post("/admin/SignIn", SignIn);
router.post("/admin/tokenIsValied", tokenValid);
router.get("/admin/getUser", AdminAuth, getUser);
router.delete("/admin/userDelete", AdminAuth, userDelete);

module.exports = router;
