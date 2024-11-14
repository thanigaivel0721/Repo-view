import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    console.log("Login result:", result); // Debugging line

    if (!result.error) {
      router.replace("/dashboard");
    } else {
      alert("Login failed: " + result.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* GitHub OAuth Login */}
        <button
          onClick={() => signIn("github")}
          className="bg-black text-white w-full py-3 rounded-lg hover:bg-gray-800 transition mb-4"
        >
          <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.81 1.305 3.495.997.108-.775.418-1.305.76-1.606-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.007-.322 3.301 1.23a11.514 11.514 0 013.007-.404c1.02.005 2.042.137 3.007.404 2.293-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.119 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.824 1.102.824 2.222 0 1.606-.015 2.902-.015 3.293 0 .322.218.694.824.577C20.565 22.092 24 17.594 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          Sign in with GitHub
        </button>

        <div className="text-center my-4 text-gray-500">or</div>

        {/* Username/Password Login */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="GitHub Username"
            className="mb-3 w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="GitHub Password"
            className="mb-4 w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
