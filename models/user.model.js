const mongoose = require("mongoose");

//. create a schema for User collection
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  ],
  emailId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

//4. create a model for User collection
const User = mongoose.model("User", UserSchema, "Users");

module.exports = User;
