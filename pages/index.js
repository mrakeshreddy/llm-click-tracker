export default function Home() {
  return <div><h1>LLM Click Tracker Home</h1></div>;
}

import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../firebase';

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
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

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
