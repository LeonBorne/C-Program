// --- Firebase ---
const firebaseConfig = {
    apiKey: "AIzaSyDWiyPHRyxFMcGZIU9lue5L05rVzEbcoWs",
    authDomain: "report-backend-247a3.firebaseapp.com",
    databaseURL: "https://report-backend-247a3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "report-backend-247a3",
    storageBucket: "report-backend-247a3.firebasestorage.app",
    messagingSenderId: "836612179514",
    appId: "1:836612179514:web:3bf4a8fb4d34a069881703",
    measurementId: "G-VSC14ELXL5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const messagesRef = db.ref("messages");

firebase.auth().signInAnonymously()
    .then(() => console.log("Signed in anonymously"))
    .catch(err => console.error("Auth error:", err));