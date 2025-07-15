import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>LLM Click Tracker Home</h1>

      {!session ? (
        <>
          <p>Please log in to continue.</p>
          <button onClick={() => signIn("google")}>
            Login with Google
          </button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>
            Logout
          </button>
          <br /><br />
          <button onClick={() => alert("GSC connect coming soon")}>
            Connect with Google Search Console
          </button>
        </>
      )}
    </div>
  );
}
