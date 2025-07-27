// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-53aa4.firebaseapp.com",
	projectId: "mern-blog-53aa4",
	storageBucket: "mern-blog-53aa4.firebasestorage.app",
	messagingSenderId: "649888234630",
	appId: "1:649888234630:web:274fba478a7a5584ace507",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider }; 
