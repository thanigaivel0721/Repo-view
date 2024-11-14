import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [repos, setRepos] = useState([]);

  // Fetch authenticated users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/get-users');
        if (!res.ok) {
          throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setUsers(data); // Set the list of authenticated users
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchRepos = async () => {
        try {
          const res = await fetch(`/api/get-repos?username=${selectedUser}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch repositories: ${res.status} ${res.statusText}`);
          }
          const data = await res.json();
          setRepos(data); // Set the list of repos for the selected user
        } catch (error) {
          console.error(`Error fetching repositories for ${selectedUser}:`, error.message);
        }
      };

      fetchRepos();
    }
  }, [selectedUser]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">View Other Users' Repositories</h1>

      {/* Back to Dashboard Button */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Back to Dashboard
        </Link>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select a User:</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user._id}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => setSelectedUser(user.username)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Repositories of Selected User */}
      {selectedUser && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Repositories of {selectedUser}</h2>
          <table className="w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Repo Name</th>
                <th className="px-4 py-2 text-left">Stars</th>
                <th className="px-4 py-2 text-left">Forks</th>
                <th className="px-4 py-2 text-left">Open Issues</th>
                <th className="px-4 py-2 text-left">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td className="border-t px-4 py-2">{repo.name}</td>
                  <td className="border-t px-4 py-2">{repo.stargazers_count}</td>
                  <td className="border-t px-4 py-2">{repo.forks_count}</td>
                  <td className="border-t px-4 py-2">{repo.open_issues_count}</td>
                  <td className="border-t px-4 py-2">
                    <Link href={`/repository/${repo.id}`} className="text-blue-600">Give Feedback</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
