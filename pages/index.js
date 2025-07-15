import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDLW-g6eQaAHDZk3y8D96YjgtCeh0LPZBA",
  authDomain: "llm-click-tracker.firebaseapp.com",
  projectId: "llm-click-tracker",
  storageBucket: "llm-click-tracker.appspot.com",
  messagingSenderId: "981007181700",
  appId: "1:981007181700:web:e0c933ad7ad1dbffbe94d1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGSCConnect = () => {
    const clientId = "981007181700-m0c7pkdh6eg5fob2p7ct36kfgsffh01i.apps.googleusercontent.com";
    const redirectUri = "https://llm-click-tracker.vercel.app/api/auth/callback";

    const scope = encodeURIComponent('https://www.googleapis.com/auth/webmasters.readonly');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;

    window.location.href = authUrl;
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>LLM Click Tracker Home</h1>

      {!user ? (
        <button onClick={handleLogin} style={{ padding: '0.6rem 1.2rem', marginTop: '1rem' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={handleGSCConnect} style={{ padding: '0.6rem 1.2rem', marginTop: '1rem' }}>
            Connect with Google Search Console
          </button>
        </div>
      )}
    </div>
  );
}
