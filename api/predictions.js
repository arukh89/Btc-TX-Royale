import { guesses } from './leaderboard.js';
import { userFromSig } from './farcaster-user.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'POST') {
    const { signedMessage, guess, blockHeight } = await req.json();
    const user = await userFromSig(signedMessage) || { fid: Date.now(), username: `Guest${Math.floor(Math.random() * 1000)}` };
    const key = `${user.fid}-${blockHeight}`;

    if (guesses.has(key)) {
      return res.status(400).json({ error: 'already guessed' });
    }

    guesses.set(key, { ...user, guess, diff: null, blockHeight });
    return res.status(200).json({ success: true, user });
  }

  if (req.method === 'GET') {
    const { type } = req.query;

    if (type === 'leaderboard') {
      const allGuesses = Array.from(guesses.values()).filter(g => g.blockHeight === tgtBlock);
      return res.status(200).json({ success: true, predictions: allGuesses });
    }

    if (type === 'recent') {
      // For recent predictions, you might want to sort by timestamp if available
      const recentPredictions = Array.from(guesses.values()).filter(g => g.blockHeight === tgtBlock);
      return res.status(200).json({ success: true, predictions: recentPredictions });
    }

    return res.status(400).json({ error: 'Invalid request type' });
  }

  return res.status(405).end();
};
