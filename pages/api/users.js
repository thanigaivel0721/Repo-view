// pages/api/users.js
export default function handler(req, res) {
    // Simulated user data
    const users = [
      { id: 1, name: "User  One", githubUsername: "userone" },
      { id: 2, name: "User  Two", githubUsername: "usertwo" },
      { id: 3, name: "User  Three", githubUsername: "userthree" },
    ];
  
    res.status(200).json(users);
  }