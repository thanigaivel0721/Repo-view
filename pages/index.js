import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to dashboard if the user is already authenticated
  if (session) {
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to Your GitHub Dashboard!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Start managing your GitHub repositories and feedback in one place. Log in to continue.
        </p>

        {/* Updated Login Button */}
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={() => router.push("/login")}
          >
            Sign in with GitHub
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 w-full text-center">
        <p>© 2024 GitHub Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
