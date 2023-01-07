

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
};
