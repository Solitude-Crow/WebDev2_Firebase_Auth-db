const express = require("express");
// Fix: Make sure these paths match your project structure
const dashboardController = require("../controller/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.verifyToken, dashboardController.getDashboard);

module.exports = router;