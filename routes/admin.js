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
router.get("/admin/getUser", getUser);
router.delete("/admin/userDelete/:id", userDelete);

module.exports = router;
