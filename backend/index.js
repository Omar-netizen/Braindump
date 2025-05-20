// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");

// Initialize environment variables from .env file
dotenv.config();

// Create an Express app instance
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for frontend access
app.use(cors());

// Connect to MongoDB using the connection URI from .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Setup API route for notes
app.use("/api/notes", noteRoutes);

// Start server on PORT from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
