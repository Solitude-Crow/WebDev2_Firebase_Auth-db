🔧 Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- A Firebase project with Authentication and Firestore enabled

📥 Step 1: Clone the Repository

(Be sure to fork this repository before cloning)
Open your terminal or command prompt and execute:

git clone https://github.com/Solitude-Crow/WebDev2_Firebase_Auth-db.git
cd WebDev2_Firebase_Auth-db

📦 Step 2: Install Dependencies
Install the required Node.js packages:
npm install
This command reads the package.json file and installs dependencies such as express, firebase, ejs, bcryptjs, cookie-parser, and body-parser.

🔐 Step 3: Configure Firebase
1.) Create a Firebase Project: If you haven't already, go to the Firebase Console and create a new project.

2.) Enable Authentication:
- Navigate to Authentication > Sign-in method.
- Enable the desired sign-in providers (e.g., Email/Password).
- 
3.)Enable Firestore:
- Go to Firestore Database and create a database in test mode or production mode, depending on your needs.

4.)Obtain Firebase Config:
- In the Firebase Console, go to Project Settings > General.
- Under Your apps, select or add a web app to obtain the Firebase SDK configuration.

5.)Set Up Environment Variables:
- Create a .env file in the root directory of the project.
- Add your Firebase configuration details:
    API_KEY=your_api_key
    AUTH_DOMAIN=your_project_id.firebaseapp.com
    PROJECT_ID=your_project_id
    STORAGE_BUCKET=your_project_id.appspot.com
    MESSAGING_SENDER_ID=your_sender_id
    APP_ID=your_app_id
    MEASUREMENT_ID=your_measurement_id

  If you're using firebase-admin and jwtwebtoken as well add these configurations:
   FIREBASE_CLIENT_EMAIL=your_client_email
   FIREBASE_PRIVATE_KEY=your_private_key  (You can obtain this in your project overview settings>service accounts>firebase admin sdk>generate new private key)
   JWT_SECRET=your_jwt_secret_password

🚀 Step 4: Start the Server
Run the application in your terminal using: npm run dev || npm start || nodemon server.js (pick what you prefer)

📁 Project Structure Overview

- server.js: Entry point of the application.
- routes/: Contains route definitions for handling HTTP requests.
- controller/: Houses the logic for processing requests and interacting with Firebase.
- middleware/: Includes middleware functions for tasks like authentication.
- views/: Contains EJS templates for rendering HTML pages.
- public/: Holds static assets like CSS, JavaScript, and images.

🛠️ Additional Notes
- Authentication Flow: The application uses Firebase Authentication for user login and signup processes.
- Data Storage: User data and other relevant information are stored in Firebase Firestore.
- Templating Engine: EJS is used for rendering dynamic HTML pages on the server side.
- Styling: Tailwind CSS is lused for styling and CSS for animations due to preference.
- Haven't setup a for XXS and CSRF preventative method [ lazy me :) ].
