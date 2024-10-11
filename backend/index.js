const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // Import auth routes
require("dotenv").config();

app.use(cors()); // Add this line to enable CORS for all origins
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/AuctionApp")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB", err);
  });

// Use the auth routes for managing listings
app.use("/api/auth", authRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log("App is running on port " + port);
});
