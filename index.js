const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index", { variavel: "teste" });
});

app.listen(3000, () => {
  console.log("Ativo na porta 3000");
});
