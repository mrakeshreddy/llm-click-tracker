import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyAiMi-gMhXatSUQd-HcD8SO2eG4nsATu4Y",
    authDomain: "llm-click-tracker.firebaseapp.com",
    projectId: "llm-click-tracker",
    storageBucket: "llm-click-tracker.firebasestorage.app",
    messagingSenderId: "764668315789",
    appId: "1:764668315789:web:716073d8a1cb66aa09bac4",
    measurementId: "G-MXQEJLYZ6P"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
