const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./model").User;
const Post = require("./model").Post;

// Register User
exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user: { id: user._id, username: user.username }, token });
  } catch (error) {
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ user: { id: user._id, username: user.username }, token });
  } catch (error) {
    next(error);
  }
};

// Get Posts
exports.getPosts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query = {};
    if (category) query.category = category;
    if (search) query.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
    
    const posts = await Post.find(query).sort({ createdAt: -1 }).limit(20);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Create Post
exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({ ...req.body, authorId: req.user._id, author: req.user.username });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Update Post
exports.updatePost = async (req, res, next) => {
  try {
    const updates = { ...req.body, updatedAt: Date.now() };
    const post = await Post.findOneAndUpdate({ _id: req.params.id, authorId: req.user._id }, updates, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ error: "Post not found or unauthorized" });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, authorId: req.user._id });
    if (!post) return res.status(404).json({ error: "Post not found or unauthorized" });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
