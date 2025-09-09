import { setRealTxCount } from './leaderboard.js';

// Vercel cron hits this every 10 min
export default async (_req, res) => {
  try {
    // 1. latest mined block
    const height = await fetch('https://mempool.space/api/blocks/tip/height').then(r => r.json());
    // 2. full block → tx_count
    const block  = await fetch(`https://mempool.space/api/block/${height}`).then(r => r.json());
    // 3. store diffs
    setRealTxCount(height, block.tx_count);
    return res.json({ success: true, height, txCount: block.tx_count });
  } catch (e) {
    console.error('resolve-block', e);
    return res.status(500).json({ error: 'failed' });
  }
};
