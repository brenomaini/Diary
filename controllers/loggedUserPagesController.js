const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = {
  write(req, res) {
    return res.render("write");
  },
  profile(req, res) {
    return res.render("profile");
  },
  async posts(req, res) {
    const userToken = req.cookies.authorization;
    const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET).email;

    let posts = await Post.find({ userEmail: decoded }).sort({
      date: -1,
    });

    return res.render("posts", { posts });
  },
  async savePost(req, res) {
    const userToken = req.cookies.authorization;
    const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET);
    const userEmail = decoded.email;

    const date = new Date().toLocaleDateString();
    const post = new Post({ ...req.body, date, userEmail });
    try {
      await post.save();
      return res.redirect("posts");
    } catch (error) {
      console.log(error);
    }
  },
  async deletePost(req, res) {
    let id = req.params.id;

    try {
      await Post.findByIdAndDelete(id);

      res.send(id);
    } catch (error) {
      console.log(error);
    }
  },

  async editLoad(req, res) {
    let id = req.query.id;

    let post = await Post.findById(id);

    res.render("edit", { post });
  },
  async editSave(req, res) {
    const date = new Date().toLocaleDateString();
    let post = { ...req.body, date };
    await Post.findOneAndUpdate(post.id, post);

    res.redirect("posts");
  },
};
