// pages/dashboard.js
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const fetchRepos = async () => {
        const res = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        });
        const data = await res.json();
        setRepos(data);
      };
      fetchRepos();
    }
  }, [session]);

  if (!session) {
    return <p>Please log in to see the dashboard</p>;
  }

  const stars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const forks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
  const openIssues = repos.reduce((acc, repo) => acc + repo.open_issues_count, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard" className="text-gray-400 hover:text-white">Home</Link>
          </li>
          <li>
            <Link href="/profile" className="text-gray-400 hover:text-white">Profile</Link>
          </li>
          <li>
            <Link href="/settings" className="text-gray-400 hover:text-white">Settings</Link>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">Welcome, {session.user.name}</h1>
            <p className="text-gray-600">Here’s an overview of your GitHub repositories</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Repositories</h3>
            <p className="text-3xl font-bold text-gray-800">{repos.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Stars</h3>
            <p className="text-3xl font-bold text-gray-800">{stars}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Forks</h3>
            <p className="text-3xl font-bold text-gray-800">{forks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Open Issues</h3>
            <p className="text-3xl font-bold text-gray-800">{openIssues}</p>
          </div>
        </div>
        {/* Button to View Other Users */}
        <div className="mt-6">
          <Link href="/view-users">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">View Other Users' Repositories</button>
          </Link>
        </div>
        {/* User Repositories Table */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Repositories</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Repo Name</th>
                <th className="px-4 py-2 text-left">Stars</th>
                <th className="px-4 py-2 text-left">Forks</th>
                <th className="px-4 py-2 text-left">Open Issues</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td className="border-t px-4 py-2">
                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {repo.name}
                    </Link>
                  </td>
                  <td className="border-t px-4 py-2">{repo.stargazers_count}</td>
                  <td className="border-t px-4 py-2">{repo.forks_count}</td>
                  <td className="border-t px-4 py-2">{repo.open_issues_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}