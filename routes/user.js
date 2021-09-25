const express = require("express");
const router = express.Router();
// const UserAuth = require("../middlewares/UserAuth");

const { SignUp, SignIn, tokenValid } = require("../controllers/user");

router.post("/user/SignUp", SignUp);
router.post("/user/SignIn", SignIn);
router.post("/user/tokenIsValied", tokenValid);

module.exports = router;
