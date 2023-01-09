const express = require("express");
const path = require("path");
const db = require("./database");
const cookieparser = require("cookie-parser");
const helmet = require("helmet");
const authOkPages = require("./controllers/loggedUserPages");
const freePages = require("./controllers/freePagesRoute");
const auth = require("./controllers/authCheck");
const server = express();
const userRouter = require("./controllers/userController");
const userController = require("./controllers/userController");

server.use(helmet());
server.use(cookieparser());
server.set("views", path.join(__dirname, "src/views"));
server.set("view engine", "ejs");
server
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static("public"));

server.listen(3000, () => {
  console.log("Ativo na porta 3000");
});

server.get("/", freePages.index);
server.get("/createProfile", freePages.create);
server.post("/createProfile", userRouter.register);
server.get("/login", freePages.login);
server.post("/login", userRouter.login);
server.post("/login", userController.login);
server.get("/write", auth, authOkPages.write);
server.post("/write", auth, authOkPages.savePost);
server.get("/posts", auth, authOkPages.posts);
server.delete("/posts/:id", auth, authOkPages.deletePost);
server.get("/myProfile", auth, authOkPages.profile);
server.get("/edit", auth, authOkPages.editLoad);
server.post("/edit", auth, authOkPages.editSave);
server.get("/signOut", auth, userController.signOut);
