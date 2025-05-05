const { db } = require("../lib/firebaseAdmin");

exports.getDashboard = async (req, res) => {
  try {
    // Using the correct Firestore syntax for admin SDK
    const userRef = db.collection("users").doc(req.user.uid);
    const docSnap = await userRef.get();

    if (!docSnap.exists) {
      return res.redirect("/login");
    }

    const user = docSnap.data();
    res.render("dashboard", { user });
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
};