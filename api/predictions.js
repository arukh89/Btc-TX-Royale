import { userFromSig } from './farcaster-user.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'POST') {
    const { signedMessage, guess, username, fid } = await req.json();
    const user = await userFromSig(signedMessage) || { fid, username };
    const key = `${user.fid}-${tgtBlock}`;
    if (guesses.has(key)) return res.status(400).json({ error: 'already guessed' });
    guesses.set(key, { ...user, guess, diff: null });
    return res.json({ success: true, user });
  }

  if (req.method === 'GET') {
    try {
      const predictions = await fetchAllPredictions();
      return res.json({ success: true, predictions });
    } catch (error) {
      console.error('Error fetching predictions:', error);
      return res.status(500).json({ error: 'Failed to fetch predictions' });
    }
  }

  res.status(405).end();
};

// Function to fetch all predictions from your database
async function fetchAllPredictions() {
  // Implement this function based on your database setup
  // Example using an in-memory array (replace with your actual data storage):
  return [
    { fid: 12345, username: 'Player1', displayName: 'Player One', avatar: 'avatar-url-1', guess: 2500 },
    { fid: 67890, username: 'Player2', displayName: 'Player Two', avatar: 'avatar-url-2', guess: 3000 },
    // Add more predictions as needed
  ];
}
