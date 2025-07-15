import { useEffect, useState } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>LLM Click Tracker Home</h1>

      {!user ? (
        <button onClick={handleLogin} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Login with Google
        </button>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <p>Welcome, {user.displayName}</p>
          <button style={{ marginRight: '10px' }}>
            Connect with Google Search Console
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
