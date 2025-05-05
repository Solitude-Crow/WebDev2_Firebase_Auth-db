const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { auth, db } = require("../lib/firebaseAdmin");

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (uid) => jwt.sign({ uid }, JWT_SECRET, { expiresIn: "1h" });

exports.getLogin = (req, res) => res.render("login");
exports.getSignup = (req, res) => res.render("signup");

exports.postSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate password length
    if (!password || password.length < 6) {
      return res.render("signup", { 
        error: "Password must be at least 6 characters long"
      });
    }
    
    // Create Firebase Auth User
    const userRecord = await auth.createUser({
      email,
      password,
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user info to Firestore with UID as the document ID
    // Fixed: Using db.collection().doc() instead of doc()
    const userRef = db.collection("users").doc(userRecord.uid);
    await userRef.set({
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    const token = createToken(userRecord.uid);
    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    
    // Handle specific Firebase errors
    if (err.errorInfo && err.errorInfo.code === 'auth/email-already-exists') {
      return res.render("signup", { error: "Email is already in use" });
    } else if (err.errorInfo && err.errorInfo.code === 'auth/invalid-email') {
      return res.render("signup", { error: "Invalid email format" });
    } else if (err.errorInfo && err.errorInfo.code === 'auth/invalid-password') {
      return res.render("signup", { error: "Password must be at least 6 characters long" });
    }
    
    res.render("signup", { error: "Signup failed" });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const userList = await auth.getUserByEmail(email);
    const uid = userList.uid;

    // Fetch user doc from Firestore using UID
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const user = userDoc.data();

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const token = createToken(uid);
    res.cookie("jwt", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Login failed" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/welcome");
};