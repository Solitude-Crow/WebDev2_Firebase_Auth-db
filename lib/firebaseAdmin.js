const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// Initialize using environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const auth = admin.auth();
const db = admin.firestore();

// Add connection check
async function checkFirestoreConnection() {
  try {
    // Try to get a document from Firestore to verify connection
    const testDoc = await db.collection('_connection_test').doc('test').get();
    console.log('Firestore connection successful');
    return true;
  } catch (error) {
    console.error('Firestore connection failed:', error);
    return false;
  }
}

// Call this when server starts
checkFirestoreConnection()
  .then(connected => {
    if (!connected) {
      console.warn('⚠️ Application started but Firestore connection failed');
    }
  });

module.exports = { auth, db, checkFirestoreConnection};