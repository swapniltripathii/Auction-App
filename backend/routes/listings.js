const express = require('express');
const router = express.Router();
const Listing = require("../models/Productlisting");
const User = require('../models/User'); // Make sure to import User model
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Save files to "uploads" directory

// @route   POST api/auth/add-listing
// @desc    Add a new product listing and associate it with a user

router.post("/add-listing", upload.single("image"), async (req, res) => {
  const { userId, productName, description, category, price } = req.body;
  const image = req.file ? req.file.path : null; // Get file path

  try {
    const newListing = new Listing({
      userId,
      productName,
      description,
      image, // Store image path in the database
      category,
      price,
    });

    const savedListing = await newListing.save();

    await User.findByIdAndUpdate(userId, {
      $push: { listings: savedListing._id },
    });

    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET api/auth/listings
// @desc    Get all product listings with user details
router.get('/listings', async (req, res) => {
    try {
      // Fetch all listings and optionally populate the user's details
      const listings = await Listing.find().populate('userId', 'firstName lastName email');
      res.status(200).json(listings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  