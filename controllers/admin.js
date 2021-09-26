const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

exports.SignUp = async (req, res) => {
  try {
    let { name, email, password, passwordCheck, displayName } = req.body;
    //validate
    if (!name || !email || !password || !passwordCheck)
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

    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: passwordHash,
      displayName,
    });
    const saveAdmin = await newAdmin.save();
    res.json(saveAdmin);
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

    const admin = await Admin.findOne({ email: email });
    if (!admin)
      return res.status(400).json({
        msg: "No account with this email has been registered!",
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid credentials!",
      });
    const token = jwt.sign({ id: admin._id }, process.env.jwtSecret);
    res.json({
      token,
      admin: {
        id: admin._id,
        displayName: admin.displayName,
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

    const admin = await Admin.findById(verified.id);
    if (!admin) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

exports.userDelete = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove(id).exec();
  res.send({ msg: "User deleted" });
};
