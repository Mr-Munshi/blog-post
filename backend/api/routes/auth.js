const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const checkUser = await User.find({ username: username }, { email: email });
  if (checkUser == "") {
    console.log("Registered Successfully");
  } else {
    console.log(checkUser);
  }
  if (checkUser !== username && email) {
    // Encrypt
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SEC_KEY
    ).toString();

    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.json("Username or Email Already Taken");
      // res.json("Email Already in Use");
    }
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const userCheck = await User.findOne({ username: req.body.username });
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(userCheck.password, process.env.SEC_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText !== req.body.password) {
      res.json("Incorrect Username or Password");
    } else {
      const { password, ...others } = userCheck._doc;
      res.status(200).json(others);
    }
  } catch (error) {
    res.json("Incorrect Username or Password");
  }
});

module.exports = router;
