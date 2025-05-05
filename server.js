const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

// Import Firebase admin with connection check
const { checkFirestoreConnection } = require("./lib/firebaseAdmin");

// Try importing routes and starting the server
try {
  const authRoutes = require("./routes/authRoutes");
  const dashboardRoutes = require("./routes/dashboardRoutes");

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.static(path.join(__dirname, "public")));

  // Routes
  app.use("/", authRoutes);
  app.use("/dashboard", dashboardRoutes);

  // Check DB connection
  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    const isConnected = await checkFirestoreConnection();
    if (isConnected) {
      console.log("Database connection verified");
    } else {
      console.error("WARNING: Could not connect to database");
      console.error("Check your Firebase credentials and internet connection");
    }
  });

} catch (error) {
  console.error("Error starting server:", error);

  // Start minimal emergency server
  const app = express();
  app.get("/", (req, res) =>
    res.send("Error starting server. Check console for details.")
  );
  app.listen(3000, () =>
    console.log("Emergency server started on port 3000")
  );
}
