const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL or file path of the image
      required: true,
    },
    category: {
      type: String,
      enum: ['shoes', 'apparels', 'collectibles'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['new', 'current'],
      default: 'new', // Use this to differentiate between new listings and current listings
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
