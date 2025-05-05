const express = require("express");
// Fix: Make sure this path matches your project structure
const authController = require("../controller/authController");

const router = express.Router();

//landing
router.get("/welcome", (req, res) => res.render("index"));
//login form page
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
//signup form page
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/logout", authController.logout);

module.exports = router;