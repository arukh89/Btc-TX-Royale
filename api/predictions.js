import { userFromSig } from './farcaster-user.js';
import { guesses, setRealTxCount } from './leaderboard.js';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'POST') {
    const { signedMessage, guess, blockHeight } = await req.json();
    const user = await userFromSig(signedMessage) || {
      fid: 999, username: 'Guest', displayName: 'Guest', avatar: ''
    };
    const key = `${user.fid}-${blockHeight}`;
    if (guesses.has(key)) return res.status(400).json({ error: 'already guessed' });
    guesses.set(key, { ...user, guess, diff: null });
    return res.json({ success: true, user });
  }

  if (req.method === 'GET' && req.query.type === 'leaderboard') {
    const arr = [...guesses.values()].filter(g => g.blockHeight === +req.query.blockHeight);
    const real = Math.floor(2000 + Math.random() * 3000);   // TODO: replace with real tx count
    arr.forEach(g => g.diff = Math.abs(g.guess - real));
    const sorted = arr.sort((a, b) => (a.diff ?? Infinity) - (b.diff ?? Infinity));
    return res.json({ all: sorted, top2: sorted.slice(0, 2) });
  }

  res.status(405).end();
};
