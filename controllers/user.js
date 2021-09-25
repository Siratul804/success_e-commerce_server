const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.SignUp = async (req, res) => {
  try {
    let { name, number, email, password, passwordCheck, displayName } =
      req.body;
    //validate
    if (!name || !number || !email || !password || !passwordCheck)
      return res
        .status(400)
        .json({ msg: "Not all Fields Have Benn Entered!!!" });
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be at least 5 characters long!!!",
      });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    const existingUserNum = await User.findOne({ number: number });
    if (existingUserNum)
      return res
        .status(400)
        .json({ msg: "An account with this Number already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      number,
      email,
      password: passwordHash,
      displayName,
    });
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        msg: "Not all fileds have been entered!",
      });

    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        msg: "No account with this email has been registered!",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid credentials!",
      });
    const token = jwt.sign({ id: user._id }, process.env.jwtSecret);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.tokenValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.jwtSecret);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getUser = async (req, res) => {
//   const user = await User.findById(req.user);
//   res.json({
//     displayName: user.displayName,
//     id: user._id,
//   });
// };

// exports.userDelete = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
