const mongoose = require("mongoose");

const mongoConfig = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.tmygvvr.mongodb.net/?retryWrites=true&w=majority",
    (error) => {
      if (error) {
        console.log(`Cannot connect to db. error ${error}`);
      }
      console.log("db conected");
    }
  );
};

module.exports = mongoConfig;
