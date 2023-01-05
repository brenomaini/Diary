const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("home", { variavel: "teste" });
});
app.get("/create", (req, res) => {
  res.render("createProfile", { variavel: "teste" });
});
app.get("/login", (req, res) => {
  res.render("login", { variavel: "teste" });
});

/* ------------------------------ After Login ---------------------*/
app.get("/write", (req, res) => {
  res.render("write", { variavel: "teste" });
});

app.listen(3000, () => {
  console.log("Ativo na porta 3000");
});
