import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>LLM Click Tracker Home</h1>

      {!session ? (
        <div>
          <p>You are not signed in.</p>
          <button onClick={() => signIn('google')} style={{ padding: '10px 20px' }}>
            Login with Google
          </button>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user.name}</p>
          <p>Email: {session.user.email}</p>
          <button onClick={() => signOut()} style={{ padding: '10px 20px', marginTop: '1rem' }}>
            Sign out
          </button>

          <div style={{ marginTop: '2rem' }}>
            <button style={{ padding: '12px 24px', background: '#4285F4', color: '#fff', border: 'none' }}>
              Connect with Google Search Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
