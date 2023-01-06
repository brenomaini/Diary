const express = require("express");
const path = require("path");
const pages = require("./pages");
const db = require("./database");
const server = express();

server.set("views", path.join(__dirname, "src/views"));
server.set("view engine", "ejs");
server
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"));

server.listen(3000, () => {
  console.log("Ativo na porta 3000");
});

server.get("/", pages.index);
server.get("/createProfile", pages.create);
server.get("/login", pages.login);
server.get("/write", pages.write);
server.post("/write", pages.savePost);
server.get("/posts", pages.posts);
server.delete("/posts/:id", pages.deletePost);
server.get("/edit", pages.editLoad);
server.post("/edit:id", pages.editSave);
