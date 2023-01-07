const mongoose = require("mongoose");
require("dotenv").config();


mongoose.set("strictQuery", false);

const uri = process.env.MONGO_CONNECTION_URI;
  
mongoose.connect(uri);


