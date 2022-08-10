const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  img: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
