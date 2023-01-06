const mongoose = require("mongoose");
const PostModel = require("./models/PostModel")

mongoose.set("strictQuery", false);

// let post = new PostModel({
//   title: "Too Bad",
//   mood: "😔",
//   date: new Date().toLocaleDateString(),
//   body: "asdasdasdas",
// });
// post
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
const uri =
  "mongodb+srv://brenomaini:Xuxuroxo2@cluster0.0hrlhrn.mongodb.net/postNetlifyDB?retryWrites=true&w=majority";
mongoose.connect(uri);


