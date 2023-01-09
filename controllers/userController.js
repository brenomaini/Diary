const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
module.exports = {
  async register(req, res) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    try {
      await user.save();

      res.redirect("login");
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send("Email already exists");
      } else {
        res.status(400).send(error);
        console.log(error);
      }
    }
  },

  async login(req, res) {
    const oneDay = 1000 * 60 * 60 * 24;
    const momentUser = await User.findOne({ email: req.body.email });
    if (!momentUser) return res.status(400).send("Email or Password incorrect");

    const passwordAndUserMatch = bcrypt.compareSync(
      req.body.password,
      momentUser.password
    );
    if (!passwordAndUserMatch)
      return res.status(400).send("Email or Password incorrect");

    const token = jwt.sign(
      { email: momentUser.email, name: momentUser.name },
      process.env.TOKEN_SECRET
      // { expiresIn: "60" }
    );
    res.cookie("authorization", `${token}`, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
      maxAge: oneDay,
    });
    res.render("write");
  },

  async signOut(req, res) {
    try {
      res.clearCookie("authorization");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
