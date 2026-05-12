import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpHMqGokMGn7U4VVFJZe62DRNVooPOGjU",
    authDomain: "phuong-anh-dang.firebaseapp.com",
    projectId: "phuong-anh-dang",
    storageBucket: "phuong-anh-dang.firebasestorage.app",
    messagingSenderId: "378603727972",
    appId: "1:378603727972:web:8021c56c50acbee9620371"
};

// init
const app = initializeApp(firebaseConfig);

// 👉 QUAN TRỌNG
const db = getFirestore(app);

// 👉 EXPORT RA NGOÀI
export { db };