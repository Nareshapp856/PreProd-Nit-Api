const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
// dotenv.config();
require("dotenv").config();

const app = express();
const router = require("./server_V10.js"); // Importing the router from server_V10
const { userAuthRouter } = require("./userauth.js"); // Importing from userauth.js
const serverV9router = require("./server_V9.js"); // Importing from server_V9.js

// Configure CORS
const corsOptions = {
  origin: "http://example.com", // Adjust the allowed origin if needed
  methods: ["GET", "POST"],
};

// Use middleware
app.use(cors()); // Enable CORS with the options defined
app.use(express.json()); // Parse incoming JSON requests
// const someMiddleware = undefined; // This will cause the error
// app.use(someMiddleware);
// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", "./views"); // Optional, default views directory

// Use routers from different modules
app.use("/", router); // Use routes from server_V10.js under /api
app.use("/", userAuthRouter); // Use routes from userauth.js under /userauth
app.use("/", serverV9router); // Use routes from server_V9.js under /v9

// Start the server
const PORT = process.env.PORT || 3000; // Use the PORT from .env or fallback to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
