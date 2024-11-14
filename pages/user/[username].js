// pages/user/[username].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function User Repositories() {
  const router = useRouter();
  const { username } = router.query;
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (username) {
      const fetchRepos = async () => {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await res.json();
        setRepos(data);
      };
      fetchRepos();
    }
  }, [username]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Repositories of {username}</h1>
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
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {repo.name}
                </a>
              </td>
              <td className="border-t px-4 py-2">{repo.stargazers_count}</td>
              <td className="border-t px-4 py-2">{repo.forks_count}</td>
              <td className="border-t px-4 py-2">{repo.open_issues_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}