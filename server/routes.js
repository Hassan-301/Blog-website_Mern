const express = require("express");
const { register, login, getPosts, createPost, updatePost, deletePost } = require("./controller");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/posts", getPosts);
router.post("/api/posts", auth, createPost);
router.put("/api/posts/:id", auth, updatePost);
router.delete("/api/posts/:id", auth, deletePost);

module.exports = router;
