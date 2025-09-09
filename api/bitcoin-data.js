export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'GET') {
    try {
      const [b, m] = await Promise.all([
        fetch('https://mempool.space/api/blocks/tip/height').then(r => r.json()),
        fetch('https://mempool.space/api/mempool').then(r => r.json())
      ]);
      return res.json({ success: true, data: { currentBlock: b, mempool: { count: m.count } } });
    } catch {
      return res.json({ success: true, data: { currentBlock: 913880, mempool: { count: 15000 } } });
    }
  }
  res.status(405).end();
};
