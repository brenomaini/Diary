const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { off } = require("../models/PostModel");

module.exports = {
  write(req, res) {
    return res.render("write");
  },
  async profile(req, res) {
    const userToken = req.cookies.authorization;
    const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET);
    let numberOfPost = await Post.count({ userEmail: decoded.email });
    let veryHappy = await Post.count({ userEmail: decoded.email, mood: "😁" });
    let Happy = await Post.count({ userEmail: decoded.email, mood: "😊" });

    let countPositive = veryHappy + Happy;
    const userInfos = {
      name: decoded.name,
      posts: numberOfPost,
      countPositive: countPositive,
    };

    return res.render("profile", { userInfos });
  },
  async posts(req, res) {
    const userToken = req.cookies.authorization;
    const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET).email;
    let totalPosts = await Post.countDocuments({ userEmail: decoded });
    let { limit, offset } = req.query;
    let currentUrl = req.baseUrl;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 6;
    }
    if (!offset) {
      offset = 0;
    }
    const next = offset + limit;
    const nextURL =
      next < totalPosts ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousURL =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    let posts = await Post.find({ userEmail: decoded })
      .sort({
        date: -1,
      })
      .skip(offset)
      .limit(limit);

    return res.render("posts", { posts, previousURL, nextURL });
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
    let id = req.query.id;
    const date = new Date().toLocaleDateString();
    let post = { ...req.body, date };
    try {
      await Post.findByIdAndUpdate(id, post);
    } catch (error) {
      console.log(error);
    }
    res.redirect("posts");
  },
};
