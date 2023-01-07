const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const token = req.cookies.authorization;

  if (!token) return res.status(401).send("Acess Denied");

  try {
    const validUser = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = validUser;
    next();
  } catch (error) {
    res.status(401).send("Acess Denied");
  }
  return next;
};
