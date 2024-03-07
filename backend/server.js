// // backend/server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const postRoutes = require("./routes/postRoutes");
// const errorHandler = require("./middleware/errorHandler");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect("mongodb://localhost:27017/melodyverse", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/api/posts", postRoutes);

// // Error Handler Middleware
// app.use(errorHandler);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// backend/server.js

require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", postRoutes); // Assuming posts are served under /api/posts

// Error Handler Middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
