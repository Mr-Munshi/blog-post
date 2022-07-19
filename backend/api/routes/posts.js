const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const post = await Post.findById(_id);
    if (post.author === req.body.author) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          _id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatePost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can not update me!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletePost = await Post.findById(_id);
    if (deletePost.author === req.body.author) {
      try {
        await deletePost.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const getPost = await Post.findById(_id);
    res.status(200).json(getPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
