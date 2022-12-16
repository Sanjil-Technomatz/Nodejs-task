const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/UserAdmin";
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Running"))
  .catch(() => console.log("error"));
