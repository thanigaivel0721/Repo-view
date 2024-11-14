
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RepoDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/repos?id=${id}`)
        .then((res) => res.json())
        .then((data) => setRepoData(data));
    }
  }, [id]);

  if (!repoData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{repoData.name}</h1>
      <p>{repoData.description}</p>
      <div className="mt-4">
        <h2 className="font-semibold">Pull Requests: {repoData.pullRequests}</h2>
        <h2 className="font-semibold">Push Requests: {repoData.pushRequests}</h2>
        <h2 className="font-semibold">Commits: {repoData.commits}</h2>
        <h2 className="font-semibold">Forks: {repoData.forks}</h2>
        <h2 className="font-semibold">Stars: {repoData.stars}</h2>
      </div>
    </div>
  );
}
        