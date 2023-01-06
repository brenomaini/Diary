const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mood: { type: String, required: true },
  date: { type: String, required: true },
  body: { type: String, required: true },
});
module.exports = mongoose.model("Post", postSchema);
