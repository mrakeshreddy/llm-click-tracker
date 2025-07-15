import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBAQZ8mQeZX3MYqFEfHyAKxuQInzT7YLOI",
  authDomain: "llm-click-tracker.firebaseapp.com",
  projectId: "llm-click-tracker",
  storageBucket: "llm-click-tracker.appspot.com",
  messagingSenderId: "423154640212",
  appId: "1:423154640212:web:e2e19006f0d9dce452d040"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
