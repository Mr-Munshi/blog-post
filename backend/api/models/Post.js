const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desciption: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
