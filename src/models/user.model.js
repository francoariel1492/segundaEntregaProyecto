const mongoose = require("mongoose");

const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
    index: true,
  },
  last_name: String,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  age: Number,
  role: {
    type: String,
    require: true,
    default: 'user'
  },
  password: {
    type: String,
    require: true,
  },
});


const User = mongoose.model(userCollection, userSchema);

module.exports = User;