const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product"); // Assuming you have a product model

// Route to add a new listing
router.post("/add-listing", async (req, res) => {
  try {
    const { userId, productName, description, image, category, price } = req.body;

    // Ensure userId is a valid ObjectId before proceeding
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const newProduct = new Product({
      userId: mongoose.Types.ObjectId(userId), // Convert to ObjectId
      productName,
      description,
      image,
      category,
      price,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving new product:", err);
    return res.status(500).json({ message: "Error creating listing" });
  }
});

module.exports = router;
