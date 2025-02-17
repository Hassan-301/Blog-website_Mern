const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  content: { type: String, required: true, minlength: 10 },
  category: { type: String, required: true, enum: ["Technology", "Programming", "Design", "Career", "Other"] },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
