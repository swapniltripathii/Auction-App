const mongoose = require("mongoose");

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] // Array to hold references to products
}, { timestamps: true });

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
