// pages/api/get-repos.js
export default async function handler(req, res) {
  const { username } = req.query; // Get username from the query params

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    // Fetch data from GitHub API
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Error fetching repositories' });
    }
    
    const repos = await response.json();
    return res.status(200).json(repos); // Return the repositories data
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching data' });
  }
}
