const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const CryptoJS = require("crypto-js");

//UPDATE USER
router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  if (req.body.userId === _id) {
    if (req.body.password) {
      // Encrypt
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SEC_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can not update me!");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  if (req.body.userId === _id) {
    try {
      const user = await User.findById(_id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(_id);
        res.status(200).json("User has been deleted");
      } catch (err) {
        res.status(500).json("User not found!");
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can not delete me!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
