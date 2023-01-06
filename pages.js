const Post = require("./models/PostModel");
module.exports = {
  index(req, res) {
    res.render("home");
  },
  create(req, res) {
    res.render("createProfile");
  },
  login(req, res) {
    res.render("login");
  },

  /* ------------------------------ After Login ---------------------*/

  write(req, res) {
    return res.render("write");
  },
  profile(req, res) {
    return res.render("profile");
  },
  async posts(req, res) {
    let posts = await Post.find().sort({ date: -1 });

    return res.render("posts", { posts });
  },
  async savePost(req, res) {
    const date = new Date().toLocaleDateString();
    const post = new Post({ ...req.body, date });
    try {
      console.log(post);
      post.save();
      return res.render("write");
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

// app.get("/write", (req, res) => {
//   res.render("write", { variavel: "teste" });
// });
// app.get("/myProfile", (req, res) => {
//   res.render("profile", { variavel: "teste" });
// });
// app.get("/posts", async (req, res) => {
//   let posts = await PostModel.find();

//   res.render("posts", { posts });
// });
