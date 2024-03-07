// backend/routes/postRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../models/Post");

// GET posts route (Paginated)
router.get("/posts", authMiddleware, async (req, res) => {
  try {
    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    // Count total number of documents
    const totalDocuments = await Post.countDocuments().exec();
    results.totalDocuments = totalDocuments;

    // Pagination metadata
    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Fetch posts
    results.posts = await Post.find().limit(limit).skip(startIndex).exec();

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
